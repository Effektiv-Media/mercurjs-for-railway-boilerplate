import { HttpTypes } from "@medusajs/types"
import { Hit } from "instantsearch.js"

const SIZE_ORDER = [
  "xxxs",
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
  "4xl",
  "5xl",
]

const normalizeSizeValue = (value?: string) => {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
}

const isSizeOption = (title?: string) => {
  const normalizedTitle = (title || "").trim().toLowerCase()

  return ["size", "storlek"].includes(normalizedTitle)
}

const isNumericValue = (value?: string) => {
  if (!value) return false
  return !Number.isNaN(Number(value))
}

export const sortProductOptionValues = (
  title: string,
  values: Partial<Hit<HttpTypes.StoreProductOptionValue>>[]
) => {
  const safeValues = [...values]

  // 1. Size sorting
  if (isSizeOption(title)) {
    return safeValues.sort((a, b) => {
      const aValue = normalizeSizeValue(a.value)
      const bValue = normalizeSizeValue(b.value)

      const aIndex = SIZE_ORDER.indexOf(aValue)
      const bIndex = SIZE_ORDER.indexOf(bValue)

      const aKnown = aIndex !== -1
      const bKnown = bIndex !== -1

      if (aKnown && bKnown) return aIndex - bIndex
      if (aKnown) return -1
      if (bKnown) return 1

      return (a.value || "").localeCompare(b.value || "", undefined, {
        numeric: true,
        sensitivity: "base",
      })
    })
  }

  // 2. Numeric sorting
  const allNumeric =
    safeValues.length > 0 && safeValues.every((item) => isNumericValue(item.value))

  if (allNumeric) {
    return safeValues.sort((a, b) => Number(a.value) - Number(b.value))
  }

  // 3. Fallback (keep original order)
  return safeValues
}