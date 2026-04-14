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

  const sortedProducts = (products || [])
    .filter((product: any) => {
      const metadata = product?.metadata || {}
      return typeof metadata.listing_published_at === "string"
    })
    .sort((a: any, b: any) => {
      const aMs = toDateMs(a?.metadata?.listing_published_at)
      const bMs = toDateMs(b?.metadata?.listing_published_at)
      return bMs - aMs
    })
    .slice(0, limit)

  return res.status(200).json({
    products: sortedProducts,
  })
}