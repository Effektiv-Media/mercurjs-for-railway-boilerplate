"use client"

import { formatDistanceToNow } from "date-fns"
import { enUS, sv } from "date-fns/locale"
import { useLocale, useTranslations } from "next-intl"

export const ProductPostedDate = ({
  posted,
}: {
  posted?: string | null
}) => {
  const t = useTranslations("product")
  const locale = useLocale()

  const postedValue = typeof posted === "string" ? posted : ""
  const postedAt = postedValue ? new Date(postedValue) : null
  const hasValidPostedAt = postedAt && !Number.isNaN(postedAt.getTime())

  const dateFnsLocale = locale.startsWith("sv") ? sv : enUS

  const postedDate = hasValidPostedAt
    ? formatDistanceToNow(postedAt, {
        addSuffix: true,
        locale: dateFnsLocale,
      })
    : "-"

  return (
    <p className="label-md text-secondary">
      {t("postedLabel")}: {postedDate}
    </p>
  )
}