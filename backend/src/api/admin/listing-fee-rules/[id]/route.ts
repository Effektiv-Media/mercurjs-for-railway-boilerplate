import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { LISTING_FEE_MODULE } from "../../../../modules/listing-fee"
import {
  bpsToPercentage,
  percentageToBps,
} from "../../../../modules/listing-fee/utils"

type ListingFeeModuleService = {
  listListingFeeRules: (filters?: Record<string, unknown>) => Promise<any[]>
  updateListingFeeRules: (data: Record<string, unknown>) => Promise<any>
  deleteListingFeeRules: (ids: string[]) => Promise<void>
}

type UpdateBody = {
  duration_hours: number
  fee_percentage: number
  is_active?: boolean
}

export const POST = async (
  req: MedusaRequest<UpdateBody>,
  res: MedusaResponse
) => {
  const service = req.scope.resolve(
    LISTING_FEE_MODULE
  ) as unknown as ListingFeeModuleService

  const body = (req.body || {}) as Partial<UpdateBody>
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

  const conflictingRule = existing.find((rule) => rule.id !== req.params.id)

  if (conflictingRule) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Det finns redan en regel för denna duration"
    )
  }

  const listing_fee_rule = await service.updateListingFeeRules({
    id: req.params.id,
    duration_hours: durationHours,
    fee_bps: percentageToBps(feePercentage),
    is_active: body.is_active ?? true,
  })

  res.status(200).json({
    listing_fee_rule: {
      ...listing_fee_rule,
      fee_percentage: bpsToPercentage(listing_fee_rule.fee_bps),
    },
  })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const service = req.scope.resolve(
    LISTING_FEE_MODULE
  ) as unknown as ListingFeeModuleService

  await service.deleteListingFeeRules([req.params.id])

  res.json({
    id: req.params.id,
    object: "listing_fee_rule",
    deleted: true,
  })
}
