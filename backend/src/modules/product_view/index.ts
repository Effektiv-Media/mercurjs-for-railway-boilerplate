import { Module } from "@medusajs/framework/utils"
import ProductViewModuleService from "./service"

export const PRODUCT_VIEW_MODULE = "product_view"

export default Module(PRODUCT_VIEW_MODULE, {
  service: ProductViewModuleService,
})