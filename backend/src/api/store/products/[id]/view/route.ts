import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { PRODUCT_VIEW_MODULE } from "../../../../../modules/product_view"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const productViewService = req.scope.resolve(PRODUCT_VIEW_MODULE) as any

  const { id } = req.params
  const body = (req.body || {}) as { visitor_key?: string }

  const visitorKey = body.visitor_key?.trim()

  if (!visitorKey) {
    return res.status(400).json({
      message: "visitor_key is required.",
    })
  }

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "status"],
    filters: {
      id,
    },
  })

  const product = products?.[0] as { id: string; status?: string } | undefined

  if (!product) {
    return res.status(404).json({
      message: "Product not found.",
    })
  }

  const { data: existingViews } = await query.graph({
    entity: "product_view",
    fields: ["id", "created_at"],
    filters: {
      product_id: id,
      visitor_key: visitorKey,
    },
  })

  const now = Date.now()
  const within24Hours = (existingViews || []).some((view: any) => {
    if (!view.created_at) {
      return false
    }

    const createdAt = new Date(view.created_at).getTime()
    return Number.isFinite(createdAt) && now - createdAt < 24 * 60 * 60 * 1000
  })

  if (within24Hours) {
    return res.status(200).json({
      recorded: false,
      deduplicated: true,
    })
  }

  await productViewService.createProductViews({
    product_id: id,
    visitor_key: visitorKey,
  })

  return res.status(200).json({
    recorded: true,
    deduplicated: false,
  })
}