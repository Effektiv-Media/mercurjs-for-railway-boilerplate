import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const toDateMs = (value: unknown) => {
  if (typeof value !== "string") {
    return Number.NaN
  }

  const ms = new Date(value).getTime()
  return Number.isFinite(ms) ? ms : Number.NaN
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const limitParam = req.query.limit
  const limit =
    typeof limitParam === "string" && Number.isFinite(Number(limitParam))
      ? Math.max(1, Math.min(24, Number(limitParam)))
      : 12

  const now = Date.now()
  const sinceMs = now - 7 * 24 * 60 * 60 * 1000

  const { data: sales } = await query.graph({
    entity: "product_sale",
    fields: ["product_id", "quantity", "created_at"],
  })

  const counts = new Map<string, number>()

  for (const sale of sales || []) {
    const createdAt =
      sale?.created_at ? new Date(sale.created_at).getTime() : Number.NaN

    if (!Number.isFinite(createdAt) || createdAt < sinceMs) {
      continue
    }

    const productId = sale?.product_id
    if (!productId || typeof productId !== "string") {
      continue
    }

    const quantity =
      typeof sale?.quantity === "number" && Number.isFinite(sale.quantity)
        ? sale.quantity
        : 0

    counts.set(productId, (counts.get(productId) || 0) + quantity)
  }

  const sortedIds = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([productId]) => productId)

  if (!sortedIds.length) {
    return res.status(200).json({
      products: [],
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