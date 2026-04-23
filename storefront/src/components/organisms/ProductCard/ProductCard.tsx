"use client"

import Image from "next/image"
import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { BaseHit, Hit } from "instantsearch.js"
import clsx from "clsx"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { useTranslations } from "next-intl"
import { ShoppingBag } from "lucide-react"

export const ProductCard = ({
  product,
  api_product,
  className,
}: {
  product: Hit<HttpTypes.StoreProduct> | Partial<Hit<BaseHit>>
  api_product?: HttpTypes.StoreProduct | null
  className?: string
}) => {
  const t = useTranslations("listing")

  if (!api_product) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: api_product! as HttpTypes.StoreProduct,
  })

  const productName = String(product.title || "Product")
  const isDiscount =
    Boolean(cheapestPrice?.percentage_diff) &&
    cheapestPrice?.calculated_price !== cheapestPrice?.original_price

  const metadata = (api_product.metadata || {}) as Record<string, unknown>
  const isTopSeller = metadata.top_seller === true
  const expiresAt =
    typeof metadata.listing_expires_at === "string"
      ? new Date(metadata.listing_expires_at)
      : null
  const hasValidExpiry = Boolean(expiresAt && !Number.isNaN(expiresAt.getTime()))
  const isExpired =
    metadata.listing_is_expired === true ||
    (hasValidExpiry ? expiresAt!.getTime() <= Date.now() : false)
  const msLeft = hasValidExpiry
    ? Math.max(0, expiresAt!.getTime() - Date.now())
    : null
  const hoursLeft = msLeft !== null ? Math.ceil(msLeft / (1000 * 60 * 60)) : null
  const showExpiryBadge = metadata.listing_is_expired === true || hasValidExpiry
  const isUrgent = !isExpired && hoursLeft !== null && hoursLeft <= 24
  const isCriticalUrgency = !isExpired && hoursLeft !== null && hoursLeft <= 6
  const expiryLabel = isExpired
    ? t("expired")
    : hoursLeft !== null
      ? t("hoursLeft", { hours: hoursLeft })
      : null

  return (
    <div
      className={clsx(
        "group relative border rounded-2xl flex flex-col h-full bg-white transition-all duration-300",
        "p-2.5 sm:p-3",
        !isUrgent &&
          "border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_30px_rgba(147,51,234,0.14)]",
        isUrgent &&
          "border-orange-200 shadow-[0_14px_34px_rgba(249,115,22,0.16)] hover:shadow-[0_18px_42px_rgba(244,63,94,0.18)] animate-urgent-glow",
        isCriticalUrgency &&
          "border-rose-300 shadow-[0_18px_44px_rgba(244,63,94,0.22)]",
        className
      )}
    >   
    {isUrgent ? (
      <div
        className={clsx(
          "pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 rounded-t-2xl bg-gradient-to-b to-transparent transition-all duration-300",
          isCriticalUrgency
            ? "from-rose-100/80 via-orange-50/50 group-hover:from-rose-200/90"
            : "from-orange-100/80 via-amber-50/50 group-hover:from-orange-200/60"
        )}
      />
    ) : null}
      {isUrgent ? (
        <div className="pointer-events-none absolute inset-0 z-[0] rounded-2xl overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="urgentBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="45%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>

              <linearGradient id="urgentBorderGradientCritical" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="45%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>

            <rect
              x="1.25"
              y="1.25"
              width="97.5"
              height="97.5"
              rx="8"
              ry="8"
              fill="none"
              className={clsx(
                "urgent-border-path",
                isCriticalUrgency && "urgent-border-path--critical"
              )}
              pathLength={100}
            />
          </svg>
        </div>
      ) : null}
      <div className="relative z-[1] aspect-square w-full overflow-hidden rounded-xl bg-white">
        <LocalizedClientLink
          href={`/produkter/${product.handle}`}
          aria-label={`View ${productName}`}
          title={`View ${productName}`}
        >          
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-sm bg-slate-50">
          
            {product.thumbnail ? (
              <Image
                priority
                fetchPriority="high"
                src={decodeURIComponent(product.thumbnail)}
                alt={`${productName} image`}
                width={400}
                height={400}
                sizes="(min-width: 1536px) 14vw, (min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="aspect-square h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <Image
                priority
                fetchPriority="high"
                src="/images/placeholder.svg"
                alt={`${productName} image placeholder`}
                width={400}
                height={400}
                sizes="(min-width: 1536px) 14vw, (min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              />
            )}
          </div>

          {isUrgent ? (
            <div
              className={clsx(
                "pointer-events-none absolute inset-0",
                isCriticalUrgency
                  ? "bg-gradient-to-t from-rose-950/18 via-orange-500/0 to-transparent"
                  : "bg-gradient-to-t from-orange-950/12 via-amber-500/0 to-transparent"
              )}
            />
          ) : null}

          {(isTopSeller || isDiscount) ? (
            <div className="absolute top-2 left-2 z-10 flex flex-col items-start gap-2">
              {isTopSeller ? (
                <span className="inline-flex items-center rounded-md bg-purple-700 text-white text-xs font-extrabold px-2.5 py-1 shadow-sm">
                  {t("topSeller")}
                </span>
              ) : null}

              {isDiscount ? (
                <span className="inline-flex items-center rounded-full bg-rose-500 text-white text-xs font-bold px-2.5 py-1 shadow-sm">
                  {t("save")} {cheapestPrice?.percentage_diff}%
                </span>
              ) : null}
            </div>
          ) : null}

          {showExpiryBadge && expiryLabel ? (
            <div className="absolute top-2 right-2 z-10">
              <span
                className={clsx(
                  "inline-flex items-center rounded-full text-white text-xs font-bold px-2.5 py-1 shadow-sm transition-all duration-300",
                  isExpired
                    ? "bg-rose-500"
                    : isUrgent
                      ? "bg-gradient-to-r from-orange-500 to-rose-500 animate-urgent-pill ring-2 ring-orange-300/50"
                      : "bg-slate-700"
                )}
              >
                {isUrgent ? (
                  <span className="mr-1 inline-block animate-flame-flicker">🔥</span>
                ) : null}
                {expiryLabel}
              </span>
            </div>
          ) : null}
        </LocalizedClientLink>
        <LocalizedClientLink
          href={`/produkter/${product.handle}`}
          aria-label={`See more about ${productName}`}
          title={`See more about ${productName}`}
        >
          <Button
            className={clsx(
              "absolute rounded-full h-auto lg:h-[40px] lg:group-hover:block hidden w-[calc(100%-12px)] uppercase bottom-2 left-1.5 z-10 text-sm text-white",
              !isUrgent && "bg-gradient-to-r from-purple-600 to-pink-500",
              isUrgent &&
                !isCriticalUrgency &&
                "bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_10px_24px_rgba(249,115,22,0.28)]",
              isCriticalUrgency &&
                "bg-gradient-to-r from-orange-500 to-rose-500 shadow-[0_12px_26px_rgba(244,63,94,0.28)]"
            )}
          >
            <span className="inline-flex items-center gap-2">
              <ShoppingBag size={16} strokeWidth={2.2} />
              <span>
                {isCriticalUrgency
                  ? t("buyBeforeItExpires")
                  : t("buyNow")}
              </span>
            </span>
          </Button>
        </LocalizedClientLink>
      </div>
      <LocalizedClientLink
        href={`/produkter/${product.handle}`}
        aria-label={`Go to ${productName} page`}
        title={`Go to ${productName} page`}
      >
        <div className="relative z-[1] flex justify-between pt-3">
          <div className="w-full">
            <h3 className="text-sm font-medium line-clamp-2 leading-5">
              {product.title}
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
              <p
                className={clsx(
                  "text-[21px] leading-5 font-extrabold",
                  !isUrgent && "text-slate-900",
                  isUrgent &&
                    "inline-flex w-fit items-center rounded-full border px-2.5 py-1 shadow-sm",
                  isUrgent &&
                    !isCriticalUrgency &&
                    "border-orange-200 bg-orange-50 text-orange-700",
                  isCriticalUrgency &&
                    "border-rose-200 bg-rose-50 text-rose-600 shadow-[0_0_14px_rgba(244,63,94,0.12)]"
                )}
              >
                {cheapestPrice?.calculated_price?.replace(/\.00\b/, "")}
              </p>
              {isDiscount ? (
                <p className="text-xs text-gray-500 line-through">
                  {cheapestPrice?.original_price}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}