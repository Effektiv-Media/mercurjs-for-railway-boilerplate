"use client"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { cn } from "@/lib/utils"
import { useParams } from "next/navigation"
import { CollapseIcon } from "@/icons"

export const CategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  const { category } = useParams()
  const isMenuOverlay = Boolean(onClose)

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
        href="/categories"
        onClick={() => (onClose ? onClose(false) : null)}
        className={cn(
          isMenuOverlay
            ? "label-md w-full rounded-lg px-1 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors border-b border-white/15"
            : "label-lg inline-flex items-center justify-center text-slate-700 hover:text-sky-700 transition-colors"
        )}
      >
        Alla produkter
      </LocalizedClientLink>
      {categories?.map(({ id, handle, name }) => (
        <LocalizedClientLink
          key={id}
          href={`/categories/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            isMenuOverlay
              ? "label-md w-full rounded-lg px-1 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors border-b border-white/15"
              : "label-lg inline-flex items-center justify-center text-slate-700 hover:text-sky-700 transition-colors",
            handle === category &&
              (isMenuOverlay
                ? "text-white font-semibold"
                : "text-slate-900 underline decoration-2 underline-offset-8")
          )}
        >
          <span className={cn(!isMenuOverlay && "max-w-[220px] truncate")}>
            {name}
          </span>
          {isMenuOverlay ? (
            <CollapseIcon size={18} className="-rotate-90 ml-auto" />
          ) : null}
        </LocalizedClientLink>
      ))}
    </nav>
  )
}
