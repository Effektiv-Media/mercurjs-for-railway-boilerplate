import { model } from "@medusajs/framework/utils"

const ListingFeeRule = model.define("listing_fee_rule", {
  id: model.id({ prefix: "lfr" }).primaryKey(),
  duration_hours: model.number(),
  fee_bps: model.number(),
  is_active: model.boolean().default(true),
})

export default ListingFeeRule