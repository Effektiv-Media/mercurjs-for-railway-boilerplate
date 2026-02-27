"use client"

import { ProductPageAccordion } from "@/components/molecules"
import { AdditionalAttributeProps } from "@/types/product"
import { useTranslations } from "next-intl"

export const ProductAdditionalAttributes = ({
  attributes,
}: {
  attributes: AdditionalAttributeProps[]
}) => {
  const t = useTranslations("product")
  if (!attributes.length) return null

  return (
    <ProductPageAccordion
      heading={t("additionalAttributes")}
      defaultOpen={false}
    >
      {attributes.map((attribute) => (
        <div
          key={attribute.id}
          className="border rounded-sm grid grid-cols-2 text-center label-md"
        >
          <div className="border-r py-3">{attribute.attribute.name}</div>
          <div className="py-3">{attribute.value}</div>
        </div>
      ))}
    </ProductPageAccordion>
  )
}
