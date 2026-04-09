import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import {
  getActiveListingFeeRules,
  resolveListingFeeBps,
  toFinitePositiveInt,
} from "../../../../../modules/listing-fee/utils"

type ProductEntity = {
  id: string
  status: string
  title: string
  metadata?: Record<string, unknown> | null
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { id } = req.params
  const body = (req.body || {}) as {
    title?: string
    handle?: string
    description?: string
    discountable?: boolean
    listing_duration_hours?: number | string
    sales_channel_id?: string
  }

  const durationHours = toFinitePositiveInt(body.listing_duration_hours)
  const salesChannelId =
    typeof body.sales_channel_id === "string" && body.sales_channel_id.length
      ? body.sales_channel_id
      : null

    if (!durationHours) {
      return res.status(400).json({
        message: "listing_duration_hours is required and must be a positive integer.",
      })
    }
    if (!salesChannelId) {
    return res.status(400).json({
      message: "sales_channel_id is required.",
    })
  }

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title", "status", "metadata"],
    filters: {
      id,
    },
  })

  const product = products?.[0] as ProductEntity | undefined

  if (!product) {
    return res.status(404).json({
      message: "Product not found.",
    })
  }

  const listingRules = await getActiveListingFeeRules(req.scope)
  const feeBps = resolveListingFeeBps(durationHours, listingRules)
  const publishedAt = new Date()
  const expiresAt = new Date(
    publishedAt.getTime() + durationHours * 60 * 60 * 1000
  )

  const metadata = {
    ...(product.metadata || {}),
    listing_duration_hours: durationHours,
    listing_fee_bps: feeBps,
    listing_published_at: publishedAt.toISOString(),
    listing_expires_at: expiresAt.toISOString(),
    listing_is_expired: false,
  }

  await updateProductsWorkflow(req.scope).run({
    input: {
      selector: {
        id: product.id,
      },
      update: {
        title: body.title,
        handle: body.handle,
        description: body.description,
        discountable: body.discountable,
        status: "published",
        metadata,
        sales_channels: [
          {
            id: salesChannelId,
          },
        ],
      },
    },
  })

  const { data: updatedProducts } = await query.graph({
    entity: "product",
    fields: ["id", "title", "status", "metadata"],
    filters: {
      id: product.id,
    },
  })

  return res.status(200).json({
    product: updatedProducts?.[0],
  })
}