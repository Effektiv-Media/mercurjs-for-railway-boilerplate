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
  minTiles = 0,
}: {
  locale: string
  sellerProducts?: Product[] | HttpTypes.StoreProduct[]
  limit?: number
  home?: boolean
  minTiles?: number
}) => {
    const productHandles = sellerProducts
    .map((product) => product.handle)
    .filter(Boolean) as string[]

  const {
    response: { products },
  } = await listProducts({
    countryCode: locale,
    queryParams: {
      limit: sellerProducts.length ? productHandles.length : home ? limit : undefined,
      order: "created_at",
      handle: sellerProducts.length ? productHandles : undefined,
    },
    forceCache: !home,
  })

  const items = sellerProducts.length ? sellerProducts : products

  if (!items.length) return null

  const repeatedItems =
    minTiles > 0 && items.length < minTiles
      ? Array.from({ length: minTiles }, (_, idx) => items[idx % items.length])
      : items

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3">
      {repeatedItems.map((product, index) => {
        const apiProduct = products.find((p) => {
          const { cheapestPrice } = getProductPrice({ product: p })

          return (
            cheapestPrice &&
            (p.id === product.id || p.handle === product.handle) &&
            Boolean(cheapestPrice)
          )
        })

        return (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            api_product={apiProduct}
          />
        )
      })}
    </div>
  )
}