import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const limitParam = req.query.limit
  const limit =
    typeof limitParam === "string" && Number.isFinite(Number(limitParam))
      ? Math.max(1, Math.min(24, Number(limitParam)))
      : 12

  const now = Date.now()
  const sinceMs = now - 7 * 24 * 60 * 60 * 1000

  const { data: views } = await query.graph({
    entity: "product_view",
    fields: ["product_id", "created_at"],
  })

  const counts = new Map<string, number>()

  for (const view of views || []) {
    const createdAt =
      view?.created_at ? new Date(view.created_at).getTime() : Number.NaN

    if (!Number.isFinite(createdAt) || createdAt < sinceMs) {
      continue
    }

    const productId = view?.product_id
    if (!productId || typeof productId !== "string") {
      continue
    }

    counts.set(productId, (counts.get(productId) || 0) + 1)
  }

  const sortedIds = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([productId]) => productId)

  if (!sortedIds.length) {
    return res.status(200).json({
      product_ids: [],
    })
  }

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
      id: sortedIds,
      status: "published",
    },
  })

  const productsById = new Map(
    (products || []).map((product: any) => [product.id, product])
  )

  const orderedProducts = sortedIds
    .map((id) => productsById.get(id))
    .filter(Boolean)

  return res.status(200).json({
    products: orderedProducts,
  })
}