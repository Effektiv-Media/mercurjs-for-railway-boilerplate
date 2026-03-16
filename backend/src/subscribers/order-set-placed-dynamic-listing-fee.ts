import {
  SubscriberArgs,
  SubscriberConfig,
  MedusaContainer,
} from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  MathBN,
  Modules,
} from "@medusajs/framework/utils"
import { OrderSetWorkflowEvents } from "@mercurjs/framework"
import { COMMISSION_MODULE } from "@mercurjs/commission/modules/commission"
import {
  getActiveListingFeeRules,
  resolveListingFeeBps,
  toFinitePositiveInt,
} from "../modules/listing-fee/utils"

type OrderEntity = {
  id: string
}

type OrderSetEntity = {
  orders: OrderEntity[]
}

type ProductEntity = {
  id: string
  metadata?: Record<string, unknown> | null
}

type CommissionLineEntity = {
  id: string
  item_line_id: string
  rule_id: string
  currency_code: string
  value: unknown
}

type DesiredCommissionLine = {
  item_line_id: string
  rule_id: string
  currency_code: string
  value: unknown
}

type CommissionModuleService = {
  createCommissionLines: (lines: DesiredCommissionLine[]) => Promise<void>
  deleteCommissionLines: (ids: string[]) => Promise<void>
}

const MAX_RECONCILIATION_ATTEMPTS = 8
const RECONCILIATION_SLEEP_MS = 350

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const stringifyValue = (value: unknown) => {
  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
}

const getFallbackRuleId = async (
  container: MedusaContainer,
  existingLines: CommissionLineEntity[]
) => {
  const existingRuleId = existingLines.find((line) => line.rule_id)?.rule_id
  if (existingRuleId) {
    return existingRuleId
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: commissionRules } = await query.graph({
    entity: "commission_rule",
    fields: ["id", "reference", "reference_id", "is_active"],
    filters: {
      is_active: true,
    },
  })

  const rules = commissionRules as Array<{
    id: string
    reference: string
    reference_id: string
  }>

  const siteRule = rules.find(
    (rule) => rule.reference === "site" && rule.reference_id === ""
  )

  return siteRule?.id || rules[0]?.id || null
}

const computeDesiredLines = async (
  orderId: string,
  existingLines: CommissionLineEntity[],
  container: MedusaContainer
) => {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const orderService = container.resolve(Modules.ORDER)
  const rules = await getActiveListingFeeRules(container)

  const order = await orderService.retrieveOrder(orderId, {
    relations: ["items"],
    select: ["*", "item_total"],
  })

  if (!order?.items?.length) {
    return {
      itemLineIds: [] as string[],
      desiredLines: [] as DesiredCommissionLine[],
    }
  }

  const itemLineIds = order.items.map((item: { id: string }) => item.id)
  const productIds = Array.from(
    new Set(
      order.items
        .map((item: { product_id?: string | null }) => item.product_id)
        .filter(Boolean)
    )
  ) as string[]

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "metadata"],
    filters: {
      id: productIds,
    },
  })

  const productById = new Map<string, ProductEntity>()
  ;(products as ProductEntity[]).forEach((product) => {
    productById.set(product.id, product)
  })

  const fallbackRuleId = await getFallbackRuleId(container, existingLines)

  const existingByItemLineId = new Map<string, CommissionLineEntity>()
  existingLines.forEach((line) => {
    existingByItemLineId.set(line.item_line_id, line)
  })

  const desiredLines: DesiredCommissionLine[] = []

  for (const item of order.items) {
    const product = item.product_id ? productById.get(item.product_id) : null
    if (!product) {
      continue
    }

    const metadata = product.metadata || {}
    const durationHours = toFinitePositiveInt(metadata.listing_duration_hours)
    const metadataFeeBps = toFinitePositiveInt(metadata.listing_fee_bps)

    const feeBps =
      metadataFeeBps ||
      (durationHours ? resolveListingFeeBps(durationHours, rules) : 0)

    if (!feeBps) {
      continue
    }

    const ruleId =
      existingByItemLineId.get(item.id)?.rule_id || fallbackRuleId || null
    if (!ruleId) {
      continue
    }

    const total = MathBN.convert(item.total || 0)
    const taxTotal = MathBN.convert(item.tax_total || 0)
    const calculationBase = total.minus(taxTotal)
    const commissionValue = MathBN.mult(calculationBase, MathBN.div(feeBps, 10000))

    desiredLines.push({
      item_line_id: item.id,
      currency_code: order.currency_code,
      rule_id: ruleId,
      value: commissionValue,
    })
  }

  return { itemLineIds, desiredLines }
}

const readOrderLines = async (orderId: string, container: MedusaContainer) => {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const orderService = container.resolve(Modules.ORDER)

  const order = await orderService.retrieveOrder(orderId, {
    relations: ["items"],
    select: ["id", "currency_code", "item_total"],
  })

  if (!order?.items?.length) {
    return [] as CommissionLineEntity[]
  }

  const itemLineIds = order.items.map((item: { id: string }) => item.id)
  if (!itemLineIds.length) {
    return [] as CommissionLineEntity[]
  }

  const { data: commissionLines } = await query.graph({
    entity: "commission_line",
    fields: ["id", "item_line_id", "rule_id", "currency_code", "value"],
    filters: {
      item_line_id: itemLineIds,
    },
  })

  return commissionLines as CommissionLineEntity[]
}

const verifyLines = (
  currentLines: CommissionLineEntity[],
  desiredLines: DesiredCommissionLine[]
) => {
  if (currentLines.length !== desiredLines.length) {
    return false
  }

  const currentByItem = new Map(currentLines.map((line) => [line.item_line_id, line]))

  for (const desired of desiredLines) {
    const current = currentByItem.get(desired.item_line_id)
    if (!current) {
      return false
    }

    if (current.rule_id !== desired.rule_id) {
      return false
    }

    if (current.currency_code !== desired.currency_code) {
      return false
    }

    if (stringifyValue(current.value) !== stringifyValue(desired.value)) {
      return false
    }
  }

  return true
}

const reconcileOrder = async (orderId: string, container: MedusaContainer) => {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const commissionService = container.resolve(
    COMMISSION_MODULE
  ) as unknown as CommissionModuleService

  for (let attempt = 1; attempt <= MAX_RECONCILIATION_ATTEMPTS; attempt++) {
    const existingLines = await readOrderLines(orderId, container)
    const { itemLineIds, desiredLines } = await computeDesiredLines(
      orderId,
      existingLines,
      container
    )

    if (!itemLineIds.length) {
      return
    }

    if (existingLines.length) {
      await commissionService.deleteCommissionLines(existingLines.map((line) => line.id))
    }

    if (desiredLines.length) {
      await commissionService.createCommissionLines(desiredLines)
    }

    await sleep(RECONCILIATION_SLEEP_MS)

    const currentLines = await readOrderLines(orderId, container)

    if (verifyLines(currentLines, desiredLines)) {
      return
    }
  }

  logger.warn(
    `[listing-fee] kunde inte säkra provisionssynk för order ${orderId} efter ${MAX_RECONCILIATION_ATTEMPTS} försök`
  )
}

export default async function orderSetPlacedDynamicListingFeeHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: sets } = await query.graph({
    entity: "order_set",
    fields: ["orders.id"],
    filters: {
      id: event.data.id,
    },
  })

  const set = sets?.[0] as OrderSetEntity | undefined
  if (!set?.orders?.length) {
    return
  }

  // Wait a short while so the default commission subscriber has likely finished.
  await sleep(RECONCILIATION_SLEEP_MS)

  for (const order of set.orders) {
    await reconcileOrder(order.id, container as MedusaContainer)
  }
}

export const config: SubscriberConfig = {
  event: OrderSetWorkflowEvents.PLACED,
  context: {
    subscriberId: "order-set-placed-dynamic-listing-fee-handler",
  },
}
