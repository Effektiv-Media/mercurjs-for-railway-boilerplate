"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { getCategoryTranslationKey } from "@/lib/helpers/category-translation"

export const HeaderCategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  const t = useTranslations("categories")

  const getCategoryLabel = (handle: string, fallbackName: string) => {
    const translationKey = getCategoryTranslationKey(handle)
    return translationKey ? t(translationKey) : fallbackName
  }

  return (
    <nav className="flex items-center flex-col gap-1">
      {categories?.map(({ id, handle, name }) => (
        <LocalizedClientLink
          key={id}
          href={`/kategorier/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            "label-md w-full rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
          )}
        >
          {getCategoryLabel(handle, name)}
        </LocalizedClientLink>
      ))}
    </nav>
  )
}