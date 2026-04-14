import { model } from "@medusajs/framework/utils"

const ProductSale = model.define("product_sale", {
  id: model.id({ prefix: "psl" }).primaryKey(),
  product_id: model.text(),
  order_id: model.text(),
  line_item_id: model.text(),
  quantity: model.number(),
})

export default ProductSale