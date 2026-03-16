import { MedusaContainer } from "@medusajs/framework/types"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, ProductStatus } from "@medusajs/framework/utils"

type ProductEntity = {
  id: string
  metadata?: Record<string, unknown> | null
}

const toDate = (value: unknown) => {
  if (typeof value !== "string") {
    return null
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export default async function expireListingsJob(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "metadata", "status"],
    filters: {
      status: ProductStatus.PUBLISHED,
    },
  })

  const now = new Date()

  const expiredProducts = (products as ProductEntity[]).filter((product) => {
    const metadata = product.metadata || {}
    if (metadata.listing_is_expired === true) {
      return false
    }

    const expiresAt = toDate(metadata.listing_expires_at)
    if (!expiresAt) {
      return false
    }

    return expiresAt.getTime() <= now.getTime()
  })

  for (const product of expiredProducts) {
    const metadata = product.metadata || {}

    await updateProductsWorkflow(container).run({
      input: {
        selector: { id: product.id },
        update: {
          status: ProductStatus.DRAFT,
          metadata: {
            ...metadata,
            listing_is_expired: true,
            listing_expired_at: now.toISOString(),
          },
        },
      },
    })
  }

  if (expiredProducts.length) {
    logger.info(`[listing-fee] markerade ${expiredProducts.length} annonser som utgångna`)
  }
}

export const config = {
  name: "expire-listings-hourly",
  schedule: "0 * * * *",
}
