import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  bpsToPercentage,
  getActiveListingFeeRules,
} from "../../../modules/listing-fee/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const rules = await getActiveListingFeeRules(req.scope)

  const listing_fee_rules = rules.map((rule) => ({
    id: rule.id,
    duration_hours: rule.duration_hours,
    fee_percentage: bpsToPercentage(rule.fee_bps),
  }))

  res.json({ listing_fee_rules })
}
