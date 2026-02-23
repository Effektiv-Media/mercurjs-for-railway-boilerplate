import { HomeProductsGrid } from "@/components/organisms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { Product } from "@/types/product"

export const HomeProductSection = async ({
  heading,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
  products = [],
  home = false,
  badge = "Marketplace picks",
  minTiles = 10,
}: {
  heading: string
  locale?: string
  products?: Product[]
  home?: boolean
  badge?: string
  minTiles?: number
}) => {
  return (
    <section className="py-8 w-full rounded-3xl border border-slate-200 bg-white px-4 md:px-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
      <div className="mb-6 flex items-end justify-between gap-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          {heading}
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <span className="inline-flex rounded-full bg-fuchsia-100 text-fuchsia-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]">
            {badge}
          </span>
          <LocalizedClientLink
            href="/categories"
            className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 hover:bg-slate-100"
          >
            Se alla
          </LocalizedClientLink>
        </div>
      </div>
      {/* Deal-driven storefront: dense grid is default */}
      <HomeProductsGrid
        locale={locale}
        sellerProducts={products}
        limit={24}
        home={home}
        minTiles={home ? minTiles : 0}
      />
    </section>
  )
}
