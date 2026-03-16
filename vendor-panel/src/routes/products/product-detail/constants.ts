import { getLinkedFields } from "../../../extensions"

export const PRODUCT_DETAIL_FIELDS = getLinkedFields(
  "product",
  "id,title,status,handle,description,subtitle,discountable,metadata,*variants.inventory_items,*categories,attribute_values.*,attribute_values.attribute.*"
)
