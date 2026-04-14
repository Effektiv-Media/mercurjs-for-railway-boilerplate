import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import { LISTING_FEE_MODULE } from "../../../modules/listing-fee"
import {
  bpsToPercentage,
  percentageToBps,
} from "../../../modules/listing-fee/utils"

type UpsertBody = {
  duration_hours: number
  fee_percentage: number
  is_active?: boolean
}

type ListingFeeModuleService = {
  listListingFeeRules: (filters?: Record<string, unknown>) => Promise<any[]>
  createListingFeeRules: (data: Record<string, unknown>) => Promise<any>
  updateListingFeeRules: (data: Record<string, unknown>) => Promise<any>
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data } = await query.graph({
    entity: "listing_fee_rule",
    fields: ["id", "duration_hours", "fee_bps", "is_active"],
  })

  const listing_fee_rules = (data as any[])
    .sort((a, b) => a.duration_hours - b.duration_hours)
    .map((rule) => ({
      id: rule.id,
      duration_hours: rule.duration_hours,
      fee_bps: rule.fee_bps,
      fee_percentage: bpsToPercentage(rule.fee_bps),
      is_active: rule.is_active,
    }))

  res.json({ listing_fee_rules })
}

export const POST = async (req: MedusaRequest<UpsertBody>, res: MedusaResponse) => {
  const service = req.scope.resolve(
    LISTING_FEE_MODULE
  ) as unknown as ListingFeeModuleService

  const body = (req.body || {}) as Partial<UpsertBody>
  const durationHours = Number(body.duration_hours)
  const feePercentage = Number(body.fee_percentage)

  if (!Number.isInteger(durationHours) || durationHours <= 0) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "duration_hours måste vara ett positivt heltal"
    )
  }

  if (!Number.isFinite(feePercentage) || feePercentage < 0 || feePercentage > 100) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "fee_percentage måste vara mellan 0 och 100"
    )
  }

    const existing = await service.listListingFeeRules({
    duration_hours: durationHours,
    deleted_at: null,
  })

  if (existing.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Det finns redan en regel för denna duration"
    )
  }

  const payload = {
    duration_hours: durationHours,
    fee_bps: percentageToBps(feePercentage),
    is_active: body.is_active ?? true,
  }

  const listing_fee_rule = await service.createListingFeeRules(payload)

  res.status(201).json({
    listing_fee_rule: {
      ...listing_fee_rule,
      fee_percentage: bpsToPercentage(listing_fee_rule.fee_bps),
    },
  })
}