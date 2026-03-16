import { formatDistanceToNow } from "date-fns"

export const ProductPostedDate = ({
  posted,
}: {
  posted?: string | null
}) => {
  const postedValue = typeof posted === "string" ? posted : ""
  const postedAt = postedValue ? new Date(postedValue) : null
  const hasValidPostedAt = postedAt && !Number.isNaN(postedAt.getTime())

  const postedDate = hasValidPostedAt
    ? formatDistanceToNow(postedAt, { addSuffix: true })
    : "-"

  return (
    <p className="label-md text-secondary">
      Posted: {postedDate}
    </p>
  )
}
