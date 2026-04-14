import { HomeProductsGrid } from "@/components/organisms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { Product } from "@/types/product"
import { HttpTypes } from "@medusajs/types"

export const HomeProductSection = async ({
  heading,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "se",
  products = [],
  home = false,
  badge = "Marketplace picks",
  minTiles = 10,
  ambient = "none",
}: {
  heading: string
  locale?: string
  products?: Product[] | HttpTypes.StoreProduct[]
  home?: boolean
  badge?: string
  minTiles?: number
  ambient?: "none" | "bestsellers" | "popular" | "new"
}) => {
  return (
    <section
      className={`py-8 w-full rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-amber-50/40 px-4 md:px-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)] relative overflow-hidden ${
        ambient === "bestsellers" ? "bestsellers-ambient-stars" : ""
      }`}
    >
      {ambient === "bestsellers" ? (
        <>
          <div className="bestsellers-stars-layer bestsellers-stars-layer--near" />
          <div className="bestsellers-stars-layer bestsellers-stars-layer--near-2" />
          <div className="bestsellers-stars-layer bestsellers-stars-layer--mid" />
          <div className="bestsellers-stars-layer bestsellers-stars-layer--mid-2" />
          <div className="bestsellers-stars-layer bestsellers-stars-layer--far" />
          <div className="bestsellers-stars-layer bestsellers-stars-layer--far-2" />
        </>
      ) : null}

      {ambient === "popular" ? (
        <>
          <div className="popular-confetti-layer popular-confetti-layer--near" />
          <div className="popular-confetti-layer popular-confetti-layer--mid" />
          <div className="popular-confetti-layer popular-confetti-layer--far" />
        </>
      ) : null}

      {ambient === "new" ? (
        <>
          <div className="new-arrivals-layer new-arrivals-layer--one" />
          <div className="new-arrivals-layer new-arrivals-layer--two" />
          <div className="new-arrivals-layer new-arrivals-layer--three" />
        </>
      ) : null}
      
      <div className="relative z-[1] mb-6 flex items-end justify-between gap-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          {heading}
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <span className="inline-flex rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]">
            {badge}
          </span>
          <LocalizedClientLink
            href="/kategorier"
            className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-700 hover:bg-slate-100"
          >
            Se alla
          </LocalizedClientLink>
        </div>
      </div>
      {/* Deal-driven storefront: dense grid is default */}
      <div className="relative z-[1]">
        <HomeProductsGrid
          locale={locale}
          sellerProducts={products}
          limit={24}
          home={home}
          minTiles={home ? minTiles : 0}
        />
      </div>
    </section>
  )
}