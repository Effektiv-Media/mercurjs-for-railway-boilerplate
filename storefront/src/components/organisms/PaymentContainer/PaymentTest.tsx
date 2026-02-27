"use client"

import { Badge } from "@medusajs/ui"
import { useTranslations } from "next-intl"

const PaymentTest = ({ className }: { className?: string }) => {
  const t = useTranslations("checkout")

  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold px-4">{t("attention")}</span>{" "}
      {t("testingOnly")}
    </Badge>
  )
}

export default PaymentTest
