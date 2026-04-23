"use client"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { CollapseIcon } from "@/icons"
import { useTranslations } from "next-intl"
import { getCategoryTranslationKey } from "@/lib/helpers/category-translation"

export const CategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  const { category } = useParams()
  const isMenuOverlay = Boolean(onClose)
  const t = useTranslations("categories")

  const getCategoryLabel = (handle: string, fallbackName: string) => {
    const translationKey = getCategoryTranslationKey(handle)
    return translationKey ? t(translationKey) : fallbackName
  }

  return (
    <nav
      className={cn(
        "max-w-full",
        isMenuOverlay
          ? "flex flex-col gap-1"
          : "flex flex-wrap items-center justify-center gap-x-8 gap-y-2"
      )}
    >
      <LocalizedClientLink
        href="/kategorier"
        onClick={() => (onClose ? onClose(false) : null)}
        className={cn(
          isMenuOverlay
            ? "label-md flex w-full items-center justify-between rounded-lg px-3 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border-b border-slate-100"
            : "label-lg inline-flex items-center justify-center text-slate-700 hover:text-purple-700 transition-colors"
        )}
      >
        {t("allProducts")}
      </LocalizedClientLink>
      {categories?.map(({ id, handle, name }) => (
        <LocalizedClientLink
          key={id}
          href={`/kategorier/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            isMenuOverlay
              ? "label-md flex w-full items-center justify-between rounded-lg px-3 py-3 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors border-b border-slate-100"
              : "label-lg inline-flex items-center justify-center text-slate-700 hover:text-purple-700 transition-colors",
            handle === category &&
              (isMenuOverlay
                ? "text-slate-900 font-semibold"
                : "text-slate-900 underline decoration-2 underline-offset-8")
          )}
        >
          <span className={cn(!isMenuOverlay && "max-w-[220px] truncate")}>
            {getCategoryLabel(handle, name)}
          </span>
          {isMenuOverlay ? (
            <CollapseIcon size={18} className="-rotate-90 shrink-0 text-slate-500" />
          ) : null}
        </LocalizedClientLink>
      ))}
    </nav>
  )
}