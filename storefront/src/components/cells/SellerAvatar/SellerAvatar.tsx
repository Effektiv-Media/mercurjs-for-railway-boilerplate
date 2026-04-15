import Image from "next/image"

export const SellerAvatar = ({
  photo = "",
  size = 32,
  alt = "",
}: {
  photo?: string
  size?: number
  alt?: string
}) => {
  return photo ? (
    <Image
      src={decodeURIComponent(photo)}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="rounded-sm border object-contain object-center bg-white p-0.5"
    />
  ) : (
    <Image
      src="/images/placeholder.svg"
      alt={alt}
      className="h-8 w-8 rounded-sm border bg-white p-0.5 opacity-30 object-contain object-center"
      width={32}
      height={32}
    />
  )
}