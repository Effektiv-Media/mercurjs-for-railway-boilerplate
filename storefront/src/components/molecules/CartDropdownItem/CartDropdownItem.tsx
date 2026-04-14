import { convertToLocale } from "@/lib/helpers/money"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { DeleteCartItemButton } from "../DeleteCartItemButton/DeleteCartItemButton"
import { useTranslations } from "next-intl"

const isExpiredItem = (item: HttpTypes.StoreCartLineItem) => {
  const metadata = (item.product?.metadata || {}) as Record<string, unknown>

  if (metadata.listing_is_expired === true) {
    return true
  }

  if (typeof metadata.listing_expires_at === "string") {
    const date = new Date(metadata.listing_expires_at)
    if (!Number.isNaN(date.getTime())) {
      return date.getTime() <= Date.now()
    }
  }

  return false
}

export const CartDropdownItem = ({
  item,
  currency_code,
}: {
  item: HttpTypes.StoreCartLineItem
  currency_code: string
}) => {
  const t = useTranslations("cart")
  const original_total = convertToLocale({
    amount: (item.compare_at_unit_price || 0) * item.quantity,
    currency_code,
  })

  const total = convertToLocale({
    amount: item.total ?? 0,
    currency_code,
  })
  
  const isExpired = isExpiredItem(item)

  return (
    <div
      className={`relative mb-4 flex gap-2 rounded-sm border p-1 transition-all ${
        isExpired
          ? "border-red-300 bg-red-50/40 opacity-70"
          : "hover:bg-slate-50"
      }`}
    >
      {isExpired && (
        <div className="absolute left-2 top-2 z-10">
          <span className="text-[10px] font-bold uppercase bg-red-500 text-white px-2 py-1 rounded-full">
            {t("expired")}
          </span>
        </div>
      )}
      <div className="w-[100px] h-[132px] flex items-center justify-center">
        {item.thumbnail ? (
          <Image
            src={decodeURIComponent(item.thumbnail)}
            alt={item.product_title || ""}
            width={80}
            height={90}
            className="w-[80px] h-[90px] object-cover rounded-xs"
            priority
          />
        ) : (
          <Image
            src={"/images/placeholder.svg"}
            alt="Product thumbnail"
            width={50}
            height={66}
            className="rounded-xs w-[50px] h-[66px] object-contain opacity-30"
          />
        )}
      </div>

      <div className="py-2 pr-10">
        <h4 className="heading-xs">{item.product_title}</h4>
        <div className="label-md text-secondary">
          {item.variant?.options?.map(({ option, id, value }) => (
            <p key={id}>
              {option?.title}: <span className="text-primary">{value}</span>
            </p>
          ))}
          <p>
             {t("quantity")}: <span className="text-primary">{item.quantity}</span>
          </p>
        </div>
        <div className="pt-2 flex items-center gap-2 mt-4 lg:mt-0">
          <p className="label-lg">{total}</p>
          {isExpired && (
            <p className="text-xs text-red-600 font-semibold">
              {t("expiredDescription")}
            </p>
          )}
            <div className="absolute right-1 top-1 z-10">
              <DeleteCartItemButton id={item.id} />
            </div>
        </div>
      </div>
    </div>
  )
}