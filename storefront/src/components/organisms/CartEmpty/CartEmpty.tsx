"use client"

import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { useTranslations } from "next-intl"

export function CartEmpty() {
  const t = useTranslations("cart")

  return (
    <div className="col-span-12 pt-4 py-6 flex justify-center">
      <div className="w-[466px] flex flex-col">
        <h2 className="text-primary heading-lg text-center">{t("shoppingCart")}</h2>
        <p className="mt-2 text-lg text-secondary text-center">
          {t("empty")}
        </p>
        <LocalizedClientLink href="/categories" className="mt-6">
          <Button className="w-full py-3 flex justify-center items-center">
            {t("explore")}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
