import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { MedusaContainer } from "@medusajs/framework/types"

export type ListingFeeRuleValue = {
  id?: string
  duration_hours: number
  fee_bps: number
  is_active?: boolean
}

export const DEFAULT_LISTING_FEE_RULES: ListingFeeRuleValue[] = [
  {
    duration_hours: 10,
    fee_bps: 400,
    is_active: true,
  },
  {
    duration_hours: 24,
    fee_bps: 600,
    is_active: true,
  },
  {
    duration_hours: 48,
    fee_bps: 800,
    is_active: true,
  },
]

export const bpsToPercentage = (bps: number) => {
  return Number((bps / 100).toFixed(2))
}

export const percentageToBps = (percentage: number) => {
  return Math.round(percentage * 100)
}

const normalizeRules = (rules: ListingFeeRuleValue[]) => {
  const deduped = new Map<number, ListingFeeRuleValue>()

  for (const rule of rules) {
    if (!rule.is_active) {
      continue
    }

    if (!Number.isFinite(rule.duration_hours) || rule.duration_hours <= 0) {
      continue
    }

    if (!Number.isFinite(rule.fee_bps) || rule.fee_bps < 0) {
      continue
    }

    deduped.set(rule.duration_hours, rule)
  }

  return Array.from(deduped.values()).sort(
    (a, b) => a.duration_hours - b.duration_hours
  )
}

export const resolveListingFeeBps = (
  durationHours: number,
  rules: ListingFeeRuleValue[]
) => {
  const normalized = normalizeRules(rules)

  if (!normalized.length) {
    return 0
  }

  const exact = normalized.find((rule) => rule.duration_hours === durationHours)
  if (exact) {
    return exact.fee_bps
  }

  const nextHigher = normalized.find(
    (rule) => rule.duration_hours >= durationHours
  )
  if (nextHigher) {
    return nextHigher.fee_bps
  }

  return normalized[normalized.length - 1].fee_bps
}

export const getActiveListingFeeRules = async (container: MedusaContainer) => {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  try {
    const { data } = await query.graph({
      entity: "listing_fee_rule",
      fields: ["id", "duration_hours", "fee_bps", "is_active"],
      filters: {
        is_active: true,
      },
    })

    const normalized = normalizeRules(data as ListingFeeRuleValue[])

    if (normalized.length) {
      return normalized
    }
  } catch {
    // Fallback to defaults when module table isn't available yet.
  }

  return normalizeRules(DEFAULT_LISTING_FEE_RULES)
}

export const toFinitePositiveInt = (value: unknown): number | null => {
  const numeric =
    typeof value === "number"
      ? value
      : typeof value === "string"
      ? Number(value)
      : Number.NaN

  if (!Number.isFinite(numeric) || numeric <= 0) {
    return null
  }

  return Math.round(numeric)
}
