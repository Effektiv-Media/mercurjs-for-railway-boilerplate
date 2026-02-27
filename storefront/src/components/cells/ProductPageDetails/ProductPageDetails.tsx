"use client"

import { ProductPageAccordion } from "@/components/molecules"
import { useTranslations } from "next-intl"

export const ProductPageDetails = ({ details }: { details: string }) => {
  const t = useTranslations("product")
  if (!details) return null

  return (
    <ProductPageAccordion heading={t("productDetails")} defaultOpen={false}>
      <div
        className="product-details"
        dangerouslySetInnerHTML={{
          __html: details,
        }}
      />
    </ProductPageAccordion>
  )
}
