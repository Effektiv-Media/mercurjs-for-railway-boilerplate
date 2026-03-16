import { Module } from "@medusajs/framework/utils"
import ListingFeeModuleService from "./service"

export const LISTING_FEE_MODULE = "listing_fee"

export default Module(LISTING_FEE_MODULE, {
  service: ListingFeeModuleService,
})
