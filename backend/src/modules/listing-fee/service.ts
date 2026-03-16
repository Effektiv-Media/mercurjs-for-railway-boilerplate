import { MedusaService } from "@medusajs/framework/utils"
import ListingFeeRule from "./models/listing-fee-rule"

class ListingFeeModuleService extends MedusaService({
  ListingFeeRule,
}) {}

export default ListingFeeModuleService
