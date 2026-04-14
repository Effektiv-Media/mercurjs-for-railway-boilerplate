import { Module } from "@medusajs/framework/utils"
import ProductSaleModuleService from "./service"

export const PRODUCT_SALE_MODULE = "product_sale"

export default Module(PRODUCT_SALE_MODULE, {
  service: ProductSaleModuleService,
})