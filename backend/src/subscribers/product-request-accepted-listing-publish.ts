import {
  SubscriberArgs,
  SubscriberConfig,
  MedusaContainer,
} from "@medusajs/framework"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { ProductRequestUpdatedEvent } from "@mercurjs/framework"
import {
  getActiveListingFeeRules,
  resolveListingFeeBps,
  toFinitePositiveInt,
} from "../modules/listing-fee/utils"

type RequestEntity = {
  id: string
  type: string
  data: Record<string, unknown>
}

type ProductEntity = {
  id: string
  metadata?: Record<string, unknown> | null
}

const getProductIdFromRequestData = (data: Record<string, unknown>) => {
  const direct = data.product_id
  return typeof direct === "string" ? direct : null
}

const getDurationHours = (
  product: ProductEntity,
  requestData: Record<string, unknown>
) => {
  const fromMetadata = toFinitePositiveInt(product.metadata?.listing_duration_hours)
  if (fromMetadata) {
    return fromMetadata
  }

  const fromRequest = toFinitePositiveInt(requestData.listing_duration_hours)
  if (fromRequest) {
    return fromRequest
  }

  return null
}

export default async function productRequestAcceptedListingPublishHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  const { data: requests } = await query.graph({
    entity: "request",
    fields: ["id", "type", "data"],
    filters: {
      id: event.data.id,
    },
  })

  const request = requests?.[0] as RequestEntity | undefined

  if (!request || request.type !== "product") {
    return
  }

  const productId = getProductIdFromRequestData(request.data)

  if (!productId) {
    logger.warn(
      `[listing-fee] request ${request.id} saknar product_id i request.data`
    )
    return
  }

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "metadata"],
    filters: {
      id: productId,
    },
  })

  const product = products?.[0] as ProductEntity | undefined

  if (!product) {
    return
  }

  const durationHours = getDurationHours(product, request.data)
  if (!durationHours) {
    logger.warn(
      `[listing-fee] product ${product.id} saknar listing_duration_hours i metadata`
    )
    return
  }

  const listingRules = await getActiveListingFeeRules(container as MedusaContainer)
  const feeBps = resolveListingFeeBps(durationHours, listingRules)
  const publishedAt = new Date()
  const expiresAt = new Date(publishedAt.getTime() + durationHours * 60 * 60 * 1000)

  const metadata = {
    ...(product.metadata || {}),
    listing_duration_hours: durationHours,
    listing_fee_bps: feeBps,
    listing_published_at: publishedAt.toISOString(),
    listing_expires_at: expiresAt.toISOString(),
    listing_is_expired: false,
  }

  await updateProductsWorkflow(container).run({
    input: {
      selector: {
        id: product.id,
      },
      update: {
        metadata,
      },
    },
  })
}

export const config: SubscriberConfig = {
  event: ProductRequestUpdatedEvent.ACCEPTED,
  context: {
    subscriberId: "product-request-accepted-listing-publish-handler",
  },
}
