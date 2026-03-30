import { MedusaService } from "@medusajs/framework/utils"
import ProductSale from "./models/product_sale"

class ProductSaleModuleService extends MedusaService({
  ProductSale,
}) {}

export default ProductSaleModuleService