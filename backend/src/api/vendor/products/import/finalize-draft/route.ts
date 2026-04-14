import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"

type FinalizeDraftRequest = {
  product_ids?: string[]
}

export async function POST(req: MedusaRequest<FinalizeDraftRequest>, res: MedusaResponse) {
  const body = req.body || {}
  const productIds = Array.isArray(body.product_ids)
    ? body.product_ids.filter((id): id is string => typeof id === "string" && id.length > 0)
    : []

  if (!productIds.length) {
    return res.status(400).json({
      message: "product_ids is required and must contain at least one product id.",
    })
  }

  for (const productId of productIds) {
    await updateProductsWorkflow(req.scope).run({
      input: {
        selector: {
          id: productId,
        },
        update: {
          status: "draft",
        },
      },
    })
  }

  return res.status(200).json({
    product_ids: productIds,
    count: productIds.length,
  })
}