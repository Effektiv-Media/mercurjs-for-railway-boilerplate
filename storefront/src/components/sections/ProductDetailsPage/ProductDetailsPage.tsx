import { ProductDetails, ProductGallery } from "@/components/organisms"
import { listProducts } from "@/lib/data/products"
import { HomeProductSection } from "../HomeProductSection/HomeProductSection"
import NotFound from "@/app/not-found"
import { getTranslations } from "next-intl/server"
import { ProductViewTracker } from "@/components/cells/ProductViewTracker/ProductViewTracker"

export const ProductDetailsPage = async ({
  handle,
  locale,
}: {
  handle: string
  locale: string
}) => {
  const t = await getTranslations("product")
  const prod = await listProducts({
    countryCode: locale,
    queryParams: { handle: [handle], limit: 1 },
    forceCache: true,
  }).then(({ response }) => response.products[0])

  if (!prod) return null

  if (prod.seller?.store_status === "SUSPENDED") {
    return NotFound()
  }

  const sellerProducts = prod?.seller?.id
    ? await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/sellers/${prod.seller.id}/products?exclude_product_id=${prod.id}&limit=12`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key":
              process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
          cache: "no-store",
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            return []
          }

          const data = await response.json()

          return data.products || []
        })
        .catch(() => [])
    : []

  return (
    <>
    <ProductViewTracker productId={prod.id} />
      <div className="flex flex-col md:flex-row lg:gap-12">
        <div className="md:w-1/2 md:px-2">
          <ProductGallery images={prod?.images || []} />
        </div>
        <div className="md:w-1/2 md:px-2">
          <ProductDetails product={prod} locale={locale} />
        </div>
      </div>
      <div className="my-8">
        <HomeProductSection
          heading={t("moreFromSeller")}
          products={sellerProducts}
          locale={locale}
        />
      </div>
    </>
  )
}