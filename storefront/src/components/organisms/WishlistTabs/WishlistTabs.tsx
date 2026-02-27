import { TabsContent, TabsList } from "@/components/molecules"
import { Suspense } from "react"
// import { ProductsList } from "../ProductsList/ProductsList"
import { ProductsPagination } from "../ProductsPagination/ProductsPagination"
import { getTranslations } from "next-intl/server"
// import { listProducts } from "@/lib/data/products"

export const WishlistTabs = async ({ tab }: { tab: string }) => {
  const t = await getTranslations("account")
  const tc = await getTranslations("common")
  const wishlistTabs = [
    { label: t("wishlistTabAll"), link: "/wishlist" },
    { label: t("wishlistTabProducts"), link: "/wishlist/products" },
    { label: t("wishlistTabCollections"), link: "/wishlist/collections" },
  ]
  // const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "gb"

  // const { response } = await listProducts({
  //   countryCode: DEFAULT_REGION,
  // })
  // const { products } = await response

  return (
    <div>
      <TabsList list={wishlistTabs} activeTab={tab} />
      <TabsContent value="all" activeTab={tab}>
        <Suspense fallback={<>{tc("loading")}</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            {/* <ProductsList products={products} /> */}
          </div>
          <ProductsPagination pages={2} />
        </Suspense>
      </TabsContent>
      <TabsContent value="products" activeTab={tab}>
        <Suspense fallback={<>{tc("loading")}</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            {/* <ProductsList products={products} /> */}
          </div>
          <ProductsPagination pages={2} />
        </Suspense>
      </TabsContent>
      <TabsContent value="collections" activeTab={tab}>
        <Suspense fallback={<>{tc("loading")}</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            {/* <ProductsList products={products} /> */}
          </div>
          <ProductsPagination pages={2} />
        </Suspense>
      </TabsContent>
    </div>
  )
}
