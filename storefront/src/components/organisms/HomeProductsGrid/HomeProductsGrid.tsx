import { listProducts } from "@/lib/data/products"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { HttpTypes } from "@medusajs/types"
import { Product } from "@/types/product"
import { ProductCard } from "../ProductCard/ProductCard"

export const HomeProductsGrid = async ({
  locale,
  sellerProducts = [],
  limit = 24,
  home = false,
}: {
  locale: string
  sellerProducts?: Product[]
  limit?: number
  home?: boolean
}) => {
  const {
    response: { products },
  } = await listProducts({
    countryCode: locale,
    queryParams: {
      limit: home ? limit : undefined,
      order: "created_at",
      handle: home
        ? undefined
        : sellerProducts.map((product) => product.handle),
    },
    forceCache: !home,
  })

  const items = sellerProducts.length ? sellerProducts : products

  if (!items.length) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3">
      {items.map((product) => {
        const apiProduct = home
          ? (product as HttpTypes.StoreProduct)
          : products.find((p) => {
              const { cheapestPrice } = getProductPrice({ product: p })
              return (
                cheapestPrice &&
                p.id === product.id &&
                Boolean(cheapestPrice)
              )
            })

        return (
          <ProductCard
            key={product.id}
            product={product}
            api_product={apiProduct}
          />
        )
      })}
    </div>
  )
}
