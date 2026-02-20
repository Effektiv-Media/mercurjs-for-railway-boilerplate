"use client"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { cn } from "@/lib/utils"

export const HeaderCategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  return (
    <nav className="flex items-center flex-col gap-1">
      {categories?.map(({ id, handle, name }) => (
        <LocalizedClientLink
          key={id}
          href={`/categories/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            "label-md w-full rounded-lg px-3 py-2 text-white/95 hover:bg-white/15 transition-colors"
          )}
        >
          {name}
        </LocalizedClientLink>
      ))}
    </nav>
  )
}
