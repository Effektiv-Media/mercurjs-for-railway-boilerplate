"use client"

import { HttpTypes } from "@medusajs/types"

import { Chip } from "@/components/atoms"
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams"
import { BaseHit, Hit } from "instantsearch.js"
import { sortProductOptionValues } from "@/lib/helpers/sort-product-option-values"
import { useTranslations } from "next-intl"

export const ProductVariants = ({
  product,
  selectedVariant,
  availableOptionMap,
}: {
  product: HttpTypes.StoreProduct
  selectedVariant: Record<string, string>
  availableOptionMap: Record<string, Record<string, boolean>>
}) => {
  const updateSearchParams = useUpdateSearchParams()
  const t = useTranslations("product")

  const translateOptionLabel = (label?: string | null) => {
    if (!label) return t("defaultOptionLabel")

    const normalized = label.trim().toLowerCase()

    if (normalized === "default option") {
      return t("defaultOptionLabel")
    }

    if (normalized === "size") {
      return t("sizeLabel")
    }

    if (normalized === "color") {
      return t("colorLabel")
    }

    return label
  }

  const translateOptionValue = (value?: string | null) => {
    if (!value) return t("defaultOptionValue")
    if (value.trim().toLowerCase() === "default option value") {
      return t("defaultOptionValue")
    }
    return value
  }

  const setOptionValue = (optionId: string, value: string) => {
    if (value) updateSearchParams(optionId, value)
  }

  return (
    <div className="my-4 space-y-2">
      {(product.options || []).map(
        ({ id, title, values }: HttpTypes.StoreProductOption) => {
          const optionKey = title.toLowerCase()
          const selectedValue = selectedVariant[optionKey]

          return (
            <div key={id}>
              <span className="label-md text-secondary">
                {translateOptionLabel(title)}:{" "}
              </span>
              <span className="label-md text-primary">
                {translateOptionValue(selectedValue)}
              </span>

              <div className="mt-2 flex gap-2">
                {(sortProductOptionValues(title, values || [])).map(
                  ({
                    id,
                    value,
                  }: Partial<Hit<HttpTypes.StoreProductOptionValue>>) => {
                    const isAvailable = !!availableOptionMap?.[optionKey]?.[value || ""]

                    return (
                      <Chip
                        key={id}
                        selected={selectedVariant[optionKey] === value}
                        disabled={!isAvailable}
                        color={title === "Color"}
                        value={value}
                        onSelect={() => setOptionValue(optionKey, value || "")}
                      />
                    )
                  }
                )}
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}