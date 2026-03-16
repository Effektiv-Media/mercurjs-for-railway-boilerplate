"use client"

import Image from "next/image"
import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { BaseHit, Hit } from "instantsearch.js"
import clsx from "clsx"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { useTranslations } from "next-intl"

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
  const expiryLabel = isExpired
    ? t("expired")
    : hoursLeft !== null
      ? t("hoursLeft", { hours: hoursLeft })
      : null

  return (
    <div
      className={clsx(
        "relative group border border-slate-200 rounded-2xl flex flex-col h-full bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_30px_rgba(2,132,199,0.16)] transition-shadow duration-200",
        "p-2.5 sm:p-3",
        className
      )}
    >
      <div className="relative w-full bg-slate-100 aspect-square rounded-xl overflow-hidden">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          aria-label={`View ${productName}`}
          title={`View ${productName}`}
        >
          <div className="overflow-hidden rounded-sm w-full h-full flex justify-center align-center">
            {product.thumbnail ? (
              <Image
                priority
                fetchPriority="high"
                src={decodeURIComponent(product.thumbnail)}
                alt={`${productName} image`}
                width={400}
                height={400}
                sizes="(min-width: 1536px) 14vw, (min-width: 1280px) 16vw, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover aspect-square w-full object-center h-full transition-transform duration-300 group-hover:scale-[1.03]"
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

          {isDiscount ? (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center rounded-full bg-rose-500 text-white text-xs font-bold px-2.5 py-1 shadow-sm">
                SPARA {cheapestPrice?.percentage_diff}%
              </span>
            </div>
          ) : null}

          {showExpiryBadge && expiryLabel ? (
            <div className="absolute top-2 right-2 z-10">
              <span
                className={clsx(
                  "inline-flex items-center rounded-full text-white text-xs font-bold px-2.5 py-1 shadow-sm",
                  isExpired || isUrgent ? "bg-rose-500" : "bg-slate-700"
                )}
              >
                {isUrgent ? "🔥 " : ""}
                {expiryLabel}
              </span>
            </div>
          ) : null}
        </LocalizedClientLink>
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          aria-label={`See more about ${productName}`}
          title={`See more about ${productName}`}
        >
          <Button className="absolute rounded-full bg-cyan-600 text-white h-auto lg:h-[40px] lg:group-hover:block hidden w-[calc(100%-12px)] uppercase bottom-2 left-1.5 z-10 text-sm">
            Köp nu
          </Button>
        </LocalizedClientLink>
      </div>
      <LocalizedClientLink
        href={`/products/${product.handle}`}
        aria-label={`Go to ${productName} page`}
        title={`Go to ${productName} page`}
      >
        <div className="flex justify-between pt-3">
          <div className="w-full">
            <h3 className="text-sm font-medium line-clamp-2 leading-5">
              {product.title}
            </h3>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-[21px] leading-5 font-extrabold text-slate-900">
                {cheapestPrice?.calculated_price}
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
