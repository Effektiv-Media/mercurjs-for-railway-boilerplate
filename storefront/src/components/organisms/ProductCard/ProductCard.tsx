"use client"

import Image from "next/image"
import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { BaseHit, Hit } from "instantsearch.js"
import clsx from "clsx"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getProductPrice } from "@/lib/helpers/get-product-price"

export const ProductCard = ({
  product,
  api_product,
  className,
}: {
  product: Hit<HttpTypes.StoreProduct> | Partial<Hit<BaseHit>>
  api_product?: HttpTypes.StoreProduct | null
  className?: string
}) => {
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

  return (
    <div
      className={clsx(
        "relative group border rounded-sm flex flex-col h-full bg-white",
        "p-2 sm:p-3",
        className
      )}
    >
      <div className="relative w-full bg-primary aspect-square">
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
                className="object-cover aspect-square w-full object-center h-full transition-all duration-300"
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

          {/* Deal badge */}
          {isDiscount ? (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center rounded-full bg-red-600 text-white text-xs font-semibold px-2 py-0.5">
                -{cheapestPrice?.percentage_diff}%
              </span>
            </div>
          ) : null}
        </LocalizedClientLink>
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          aria-label={`See more about ${productName}`}
          title={`See more about ${productName}`}
        >
          <Button className="absolute rounded-sm bg-action text-action-on-primary h-auto lg:h-[48px] lg:group-hover:block hidden w-full uppercase bottom-1 z-10">
            See More
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
              <p className="text-[16px] leading-5 font-semibold">
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
