"use client"
import { SelectField } from "@/components/molecules"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

export const ProductListingHeader = ({ total }: { total: number }) => {
  const t = useTranslations("listing")
  const router = useRouter()
  const pathname = usePathname()

  const selectOptions = [
    { label: t("newest"), value: "created_at" },
    { label: t("priceLowToHigh"), value: "price_asc" },
    { label: t("priceHighToLow"), value: "price_desc" },
  ]

  const selectOptionHandler = (value: string) => {
    router.push(`${pathname}?sortBy=${value}`)
  }

  return (
    <div className="flex justify-between w-full items-center">
      <div>{t("listingsCount", { count: total })}</div>
      {/* <div className='hidden md:flex gap-2 items-center'>
        Sort by:{' '}
        <SelectField
          className='min-w-[200px]'
          options={selectOptions}
          selectOption={selectOptionHandler}
        />
      </div> */}
    </div>
  )
}
