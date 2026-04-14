import { model } from "@medusajs/framework/utils"

const ProductView = model.define("product_view", {
  id: model.id({ prefix: "pvw" }).primaryKey(),
  product_id: model.text(),
  visitor_key: model.text(),
})

export default ProductView