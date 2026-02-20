import { HomeProductsGrid } from "@/components/organisms"
import { Product } from "@/types/product"

export const HomeProductSection = async ({
  heading,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
  products = [],
  home = false,
}: {
  heading: string
  locale?: string
  products?: Product[]
  home?: boolean
}) => {
  return (
    <section className="py-8 w-full">
      <h2 className="mb-6 text-3xl sm:text-4xl font-bold tracking-tight text-sky-900">
        {heading}
      </h2>
      {/* Deal-driven storefront: dense grid is default */}
      <HomeProductsGrid
        locale={locale}
        sellerProducts={products}
        limit={24}
        home={home}
      />
    </section>
  )
}
