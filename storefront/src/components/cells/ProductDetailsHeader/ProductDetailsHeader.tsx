"use client"

import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { ProductVariants } from "@/components/molecules"
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { useState } from "react"
import { addToCart } from "@/lib/data/cart"
import { Chat } from "@/components/organisms/Chat/Chat"
import { SellerProps } from "@/types/seller"
import { WishlistButton } from "../WishlistButton/WishlistButton"
import { Wishlist } from "@/types/wishlist"
import { toast } from "@/lib/helpers/toast"
import { useCartContext } from "@/components/providers"
import { useTranslations } from "next-intl"
import clsx from "clsx"

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (
      acc: Record<string, string>,
      varopt: HttpTypes.StoreProductOptionValue
    ) => {
      acc[varopt.option?.title.toLowerCase() || ""] = varopt.value

      return acc
    },
    {}
  )
}

const getAvailableVariantOptionMap = (
  product: HttpTypes.StoreProduct,
  selectedVariant: Record<string, string>
) => {
  const variants = product.variants || []

  return (product.options || []).reduce(
    (acc, option) => {
      const optionKey = option.title.toLowerCase()

      acc[optionKey] = (option.values || []).reduce(
        (valueAcc, optionValue) => {
          const isAvailable = variants.some((variant) => {
            const variantOptions = optionsAsKeymap(variant.options ?? null) || {}

            const matchesCurrentSelection = Object.entries(selectedVariant).every(
              ([selectedKey, selectedValue]) => {
                if (selectedKey === optionKey) {
                  return true
                }

                return variantOptions[selectedKey] === selectedValue
              }
            )

            const matchesCandidateValue =
              variantOptions[optionKey] === optionValue.value

            const hasStock = (variant.inventory_quantity || 0) > 0
            const hasPrice = !!variant.calculated_price

            return (
              matchesCurrentSelection &&
              matchesCandidateValue &&
              hasStock &&
              hasPrice
            )
          })

          valueAcc[optionValue.value || ""] = isAvailable
          return valueAcc
        },
        {} as Record<string, boolean>
      )

      return acc
    },
    {} as Record<string, Record<string, boolean>>
  )
}

export const ProductDetailsHeader = ({
  product,
  locale,
  user,
  wishlist,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps }
  locale: string
  user: HttpTypes.StoreCustomer | null
  wishlist?: Wishlist[]
}) => {
  const t = useTranslations("product")
  const { onAddToCart, cart } = useCartContext()
  const [isAdding, setIsAdding] = useState(false)
  const { allSearchParams } = useGetAllSearchParams()

  const { cheapestVariant, cheapestPrice } = getProductPrice({
    product,
  })

  const hasAnyPrice = cheapestPrice !== null && cheapestVariant !== null

  const selectedVariant = hasAnyPrice
    ? {
        ...optionsAsKeymap(cheapestVariant.options ?? null),
        ...allSearchParams,
      }
    : allSearchParams

  const availableVariantOptionMap = getAvailableVariantOptionMap(
    product,
    selectedVariant
  )

  const variantId =
    product.variants?.find(({ options }: { options: any }) =>
      options?.length
        ? options.every((option: any) =>
            selectedVariant[option.option?.title.toLowerCase() || ""]?.includes(
              option.value
            )
          )
        : true
    )?.id || cheapestVariant?.id || ""

  const { variantPrice } = getProductPrice({
    product,
    variantId,
  })

  const displayPrice = variantPrice || cheapestPrice
  const metadata = (product.metadata || {}) as Record<string, unknown>

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

  const hoursLeft =
    msLeft !== null ? Math.ceil(msLeft / (1000 * 60 * 60)) : null

  const isUrgent = !isExpired && hoursLeft !== null && hoursLeft <= 24
  const isCriticalUrgency = !isExpired && hoursLeft !== null && hoursLeft <= 6

  const urgencyLabel = isUrgent
    ? isCriticalUrgency
      ? t("urgency.finalHoursWithHours", { hours: hoursLeft })
      : t("urgency.endingSoonWithHours", { hours: hoursLeft })
    : null

  const variantStock =
    product.variants?.find(({ id }) => id === variantId)?.inventory_quantity ||
    0

  const variantHasPrice = !!product.variants?.find(({ id }) => id === variantId)
    ?.calculated_price

  const isVariantStockMaxLimitReached =
    (cart?.items?.find((item) => item.variant_id === variantId)?.quantity ?? 0) >=
    variantStock

  const addToCartLabel = !hasAnyPrice
    ? t("notAvailableInRegionUpper")
    : variantStock && variantHasPrice
      ? isCriticalUrgency
        ? t("urgency.buyBeforeItExpiresUpper")
        : isUrgent
          ? t("urgency.buyNowEndingSoonUpper")
          : t("addToCartUpper")
      : t("outOfStockUpper")

  const handleAddToCart = async () => {
    if (!variantId || !hasAnyPrice) return null

    setIsAdding(true)

    const subtotal = +(variantPrice?.calculated_price_without_tax_number || 0)
    const total = +(variantPrice?.calculated_price_number || 0)

    const storeCartLineItem = {
      thumbnail: product.thumbnail || "",
      product_title: product.title,
      quantity: 1,
      subtotal,
      total,
      tax_total: total - subtotal,
      variant_id: variantId,
      product_id: product.id,
      variant: product.variants?.find(({ id }) => id === variantId),
    }

    try {
      if (!isVariantStockMaxLimitReached) {
        onAddToCart(storeCartLineItem, variantPrice?.currency_code || "eur")
      }

      await addToCart({
        variantId,
        quantity: 1,
        countryCode: locale,
      })
    } catch (error) {
      toast.error({
        title: t("errorAddingToCart"),
        description: t("inventoryMissing"),
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div
      className={clsx(
        "relative overflow-hidden border rounded-sm p-5 transition-all duration-300",
        !isUrgent && "border-slate-200",
        isUrgent &&
          "border-orange-200 shadow-[0_18px_44px_rgba(249,115,22,0.12)]",
        isCriticalUrgency &&
          "border-rose-300 shadow-[0_22px_52px_rgba(244,63,94,0.18)]"
      )}
    >
      {isUrgent ? (
        <div
          className={clsx(
            "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent",
            isCriticalUrgency
              ? "from-rose-100/80 via-orange-50/50"
              : "from-orange-100/80 via-amber-50/50"
          )}
        />
      ) : null}

      <div className="relative z-[1] flex justify-between">
        <div>
          <h2 className="label-md text-secondary">
            {/* {product?.brand || "No brand"} */}
          </h2>

          <h1 className="heading-lg text-primary">{product.title}</h1>

          {urgencyLabel ? (
            <div className="mt-3">
              <span
                className={clsx(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.05em]",
                  isCriticalUrgency
                    ? "bg-rose-100 text-rose-700 ring-1 ring-rose-200"
                    : "bg-orange-100 text-orange-700 ring-1 ring-orange-200"
                )}
              >
                {urgencyLabel}
              </span>
            </div>
          ) : null}

          <div className="mt-3 flex items-center gap-2">
            {hasAnyPrice && displayPrice ? (
              <>
                <span
                  className={clsx(
                    "heading-md inline-flex items-center rounded-full px-3 py-1.5 transition-all duration-300",
                    !isUrgent && "text-primary",
                    isUrgent &&
                      !isCriticalUrgency &&
                      "border border-orange-200 bg-orange-50 text-orange-700 shadow-sm",
                    isCriticalUrgency &&
                      "border border-rose-200 bg-rose-50 text-rose-600 shadow-[0_0_14px_rgba(244,63,94,0.12)]"
                  )}
                >
                  {displayPrice.calculated_price}
                </span>

                {displayPrice.calculated_price_number !==
                  displayPrice.original_price_number && (
                  <span className="label-md text-secondary line-through">
                    {displayPrice.original_price}
                  </span>
                )}
              </>
            ) : (
              <span className="label-md pb-4 pt-2 text-secondary">
                {t("notAvailableInRegion")}
              </span>
            )}
          </div>
        </div>

        <div>
          <WishlistButton
            productId={product.id}
            wishlist={wishlist}
            user={user}
          />
        </div>
      </div>

      {hasAnyPrice && (
        <ProductVariants
          product={product}
          selectedVariant={selectedVariant}
          availableOptionMap={availableVariantOptionMap}
        />
      )}

      <Button
        onClick={handleAddToCart}
        disabled={!variantStock || !variantHasPrice || !hasAnyPrice}
        loading={isAdding}
        className={clsx(
          "mb-4 flex w-full justify-center py-3 uppercase transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.995]",
          !isUrgent &&
            "bg-black text-white shadow-[0_10px_22px_rgba(15,23,42,0.12)] hover:bg-slate-900 hover:shadow-[0_16px_32px_rgba(15,23,42,0.18)]",
          isUrgent &&
            !isCriticalUrgency &&
            "border-0 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_14px_30px_rgba(249,115,22,0.22)] hover:from-orange-400 hover:to-amber-400 hover:shadow-[0_18px_38px_rgba(249,115,22,0.30)]",
          isCriticalUrgency &&
            "border-0 bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-[0_16px_34px_rgba(244,63,94,0.24)] hover:from-orange-400 hover:to-rose-400 hover:shadow-[0_20px_42px_rgba(244,63,94,0.32)]"
        )}
        size="large"
      >
        {addToCartLabel}
      </Button>

      {isUrgent ? (
        <p
          className={clsx(
            "mb-4 text-sm font-semibold",
            isCriticalUrgency ? "text-rose-600" : "text-orange-600"
          )}
        >
          {isCriticalUrgency
            ? t("urgency.expiresVerySoon")
            : t("urgency.endsWithin24Hours")}
        </p>
      ) : null}

      {user && product.seller && (
        <Chat
          user={user}
          seller={product.seller}
          buttonClassNames="w-full uppercase"
          product={product}
        />
      )}
    </div>
  )
}