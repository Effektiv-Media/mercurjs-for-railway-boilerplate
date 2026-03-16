import { PencilSquare, Trash } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Container, Heading, StatusBadge, usePrompt } from "@medusajs/ui"
import { format, formatDistanceToNowStrict } from "date-fns"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import { ActionMenu } from "../../../../../components/common/action-menu"
import { SectionRow } from "../../../../../components/common/section"
import { useDeleteProduct } from "../../../../../hooks/api/products"
import { useExtension } from "../../../../../providers/extension-provider"

const productStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "grey"
    case "proposed":
      return "orange"
    case "published":
      return "green"
    case "rejected":
      return "red"
    default:
      return "grey"
  }
}

const KNOWN_PRODUCT_STATUSES = new Set([
  "draft",
  "proposed",
  "published",
  "rejected",
])

type ProductGeneralSectionProps = {
  product: HttpTypes.AdminProduct
}

const toPositiveNumber = (value: unknown) => {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
      ? Number(value)
      : Number.NaN

  return Number.isFinite(parsed) && parsed > 0 ? parsed : null
}

const toDate = (value: unknown) => {
  if (typeof value !== "string") {
    return null
  }

  const date = new Date(value)

  return Number.isNaN(date.getTime()) ? null : date
}

const getListingState = (
  metadata?: Record<string, unknown> | null,
  nowMs = Date.now()
) => {
  const durationHours = toPositiveNumber(metadata?.listing_duration_hours)
  const feeBps = toPositiveNumber(metadata?.listing_fee_bps)
  const expiresAt = toDate(metadata?.listing_expires_at)
  const isMarkedExpired = metadata?.listing_is_expired === true
  const isExpired =
    isMarkedExpired || (expiresAt ? expiresAt.getTime() <= nowMs : false)

  const feePercentage =
    feeBps !== null ? Number((feeBps / 100).toFixed(2)) : null

  return {
    durationHours,
    feePercentage,
    expiresAt,
    isExpired,
    isConfigured: durationHours !== null || expiresAt !== null,
  }
}

export const ProductGeneralSection = ({
  product,
}: ProductGeneralSectionProps) => {
  const { t } = useTranslation()
  const [nowMs, setNowMs] = useState(() => Date.now())
  const prompt = usePrompt()
  const navigate = useNavigate()
  const { getDisplays } = useExtension()

  const displays = getDisplays("product", "general")
  const listing = getListingState(
    product.metadata as Record<string, unknown> | null,
    nowMs
  )
  const productStatus =
    typeof product.status === "string" && product.status.length
      ? product.status
      : null
  const productStatusLabel =
    productStatus && KNOWN_PRODUCT_STATUSES.has(productStatus)
      ? t(`products.productStatus.${productStatus}`)
      : productStatus || "Unknown"

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNowMs(Date.now())
    }, 60 * 1000)

    return () => window.clearInterval(interval)
  }, [])

  const { mutateAsync } = useDeleteProduct(product.id)

  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("products.deleteWarning", {
        title: product.title,
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel"),
    })

    if (!res) {
      return
    }

    await mutateAsync(undefined, {
      onSuccess: () => {
        navigate("..")
      },
    })
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{product.title || "-"}</Heading>
        <div className="flex items-center gap-x-4">
          <StatusBadge color={productStatusColor(productStatus || "")}>
            {productStatusLabel}
          </StatusBadge>
          <ActionMenu
            groups={[
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    to: "edit",
                    icon: <PencilSquare />,
                  },
                ],
              },
              {
                actions: [
                  {
                    label: t("actions.delete"),
                    onClick: handleDelete,
                    icon: <Trash />,
                  },
                ],
              },
            ]}
          />
        </div>
      </div>

      <SectionRow title={t("fields.description")} value={product.description} />
      <SectionRow title={t("fields.subtitle")} value={product.subtitle} />
      <SectionRow
        title={t("fields.handle")}
        value={product.handle ? `/${product.handle}` : "-"}
      />
      <SectionRow
        title={t("fields.discountable")}
        value={product.discountable ? t("fields.true") : t("fields.false")}
      />
      <SectionRow
        title="Listing duration"
        value={
          listing.durationHours
            ? `${listing.durationHours}h${
                listing.feePercentage !== null
                  ? ` (${listing.feePercentage}% fee)`
                  : ""
              }`
            : "-"
        }
      />
      <SectionRow
        title="Listing status"
        value={
          listing.isConfigured ? (
            <div className="flex items-center gap-x-2">
              <StatusBadge color={listing.isExpired ? "red" : "green"}>
                {listing.isExpired ? "Expired" : "Active"}
              </StatusBadge>
              {listing.expiresAt ? (
                <span>
                  {format(listing.expiresAt, "yyyy-MM-dd HH:mm")} (
                  {formatDistanceToNowStrict(listing.expiresAt, {
                    addSuffix: true,
                  })}
                  )
                </span>
              ) : null}
            </div>
          ) : (
            "Not configured"
          )
        }
      />
      {displays.map((Component, index) => {
        return <Component key={index} data={product} />
      })}
    </Container>
  )
}
