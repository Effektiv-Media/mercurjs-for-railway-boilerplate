"use client"

import { HttpTypes } from "@medusajs/types"

import { Chip } from "@/components/atoms"
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams"
import { BaseHit, Hit } from "instantsearch.js"
import { sortProductOptionValues } from "@/lib/helpers/sort-product-option-values"

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

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    if (value) updateSearchParams(optionId, value)
  }

  return (
    <div className="my-4 space-y-2">
      {(product.options || []).map(
        ({ id, title, values }: HttpTypes.StoreProductOption) => (
          <div key={id}>
            <span className="label-md text-secondary">{title}: </span>
            <span className="label-md text-primary">
              {selectedVariant[title.toLowerCase()]}
            </span>
            <div className="flex gap-2 mt-2">
              {(sortProductOptionValues(title, values || [])).map(
                ({
                  id,
                  value,
                }: Partial<Hit<HttpTypes.StoreProductOptionValue>>) => {
                  const optionKey = title.toLowerCase()
                  const isAvailable = !!availableOptionMap?.[optionKey]?.[value || ""]

                  return (
                    <Chip
                      key={id}
                      selected={selectedVariant[optionKey] === value}
                      disabled={!isAvailable}
                      color={title === "Color"}
                      value={value}
                      onSelect={() =>
                        setOptionValue(optionKey, value || "")
                      }
                    />
                  )
                }
              )}
            </div>
          </div>
        )
      )}
    </div>
  )
}