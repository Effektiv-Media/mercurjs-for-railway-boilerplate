"use client"

import { Button } from "@/components/atoms"
import Link from "next/link"
import { useTranslations } from "next-intl"

export const OrderReturn = ({ order }: { order: any }) => {
  const t = useTranslations("orders")

  return (
    <div className="md:flex justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h2 className="text-primary label-lg uppercase">{t("returnOrder")}</h2>
        <p className="text-secondary label-md max-w-sm">
          {t("returnInfo")}{" "}
          <Link href="/returns" className="underline">
            {t("returnsAndRefunds")}
          </Link>
          .
        </p>
      </div>
      <Link href={`/user/orders/${order.id}/return`}>
        <Button variant="tonal" className="uppercase" onClick={() => null}>
          {t("return")}
        </Button>
      </Link>
    </div>
  )
}
