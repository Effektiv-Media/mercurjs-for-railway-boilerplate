import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { LISTING_FEE_MODULE } from "../../../../modules/listing-fee"

type ListingFeeModuleService = {
  deleteListingFeeRules: (ids: string[]) => Promise<void>
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
