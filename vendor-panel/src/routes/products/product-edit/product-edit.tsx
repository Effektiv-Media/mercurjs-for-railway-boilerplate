import { Heading } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useParams, useSearchParams } from "react-router-dom"

import { RouteDrawer } from "../../../components/modals"
import { useProduct } from "../../../hooks/api/products"
import { PRODUCT_DETAIL_FIELDS } from "../product-detail/constants"
import { EditProductForm } from "./components/edit-product-form"

export const ProductEdit = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const mode = searchParams.get("mode")
  const isRepublishMode = mode === "republish"
  const isPublishMode = mode === "publish"
  const isListingActivationMode = isRepublishMode || isPublishMode

  const { product, isLoading, isError, error } = useProduct(id!, {
    fields: PRODUCT_DETAIL_FIELDS,
  })

  if (isError) {
    throw error
  }

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>
            {isPublishMode
              ? "Publish Product"
              : isRepublishMode
              ? "Republish Product"
              : t("products.edit.header")}
          </Heading>
        </RouteDrawer.Title>
        <RouteDrawer.Description className="sr-only">
          {isPublishMode
            ? "Configure the listing and publish the product"
            : isRepublishMode
            ? "Update the product and republish the listing"
            : t("products.edit.description")}
        </RouteDrawer.Description>
      </RouteDrawer.Header>

      {!isLoading && product && (
        <EditProductForm 
          product={product}
          isRepublishMode={isRepublishMode}
          isPublishMode={isPublishMode}
          isListingActivationMode={isListingActivationMode}
        />
      )}
    </RouteDrawer>
  )
}