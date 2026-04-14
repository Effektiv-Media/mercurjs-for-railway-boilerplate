import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { id } = req.params
  const excludeProductId =
    typeof req.query.exclude_product_id === "string"
      ? req.query.exclude_product_id
      : undefined

  const limitParam = req.query.limit
  const limit =
    typeof limitParam === "string" && Number.isFinite(Number(limitParam))
      ? Math.max(1, Math.min(24, Number(limitParam)))
      : 12

  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "handle",
      "status",
      "thumbnail",
      "images.*",
      "metadata",
      "variants.*",
      "seller.*",
    ],
    filters: {
      status: "published",
    },
  })

  console.log(
  "Seller products debug:",
  (products || []).map((product: any) => ({
    id: product.id,
    title: product.title,
    seller: product.seller,
    seller_id: product.seller_id,
    metadata: product.metadata,
    status: product.status,
  }))
)

  const sellerProducts = (products || [])
    .filter((product: any) => product?.seller?.id === id)
    .filter((product: any) => product.id !== excludeProductId)
    .slice(0, limit)

  return res.status(200).json({
    products: sellerProducts,
  })
}