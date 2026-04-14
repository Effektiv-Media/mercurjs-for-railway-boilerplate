import { MedusaService } from "@medusajs/framework/utils"
import ProductView from "./models/product_view"

class ProductViewModuleService extends MedusaService({
  ProductView,
}) {}

export default ProductViewModuleService