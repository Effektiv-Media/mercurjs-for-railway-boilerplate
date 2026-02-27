import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { format } from "date-fns"
import { getServerI18n } from "@/lib/i18n/server"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = async ({ order, showStatus }: OrderDetailsProps) => {
  const { t } = await getServerI18n({})
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="border rounded-sm p-4 bg-ui-bg-subtle grid lg:grid-cols-2">
      <Text className="mt-2">
        <span className="font-bold block">{t("order.orderDate")}</span>
        <span>{format(order.created_at, "dd-MM-yyyy")}</span>
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        <span className="font-bold block">{t("order.orderNumber")}</span> #
        <span>{order.display_id}</span>
      </Text>
      {showStatus && (
        <div className="lg:col-span-2 flex items-center text-compact-small gap-x-4 mt-4">
          <>
            <Text>
              {t("order.orderStatus")}:{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {/* TODO: Check where the statuses should come from */}
                {/* {formatStatus(order.fulfillment_status)} */}
              </span>
            </Text>
            <Text>
              {t("order.paymentStatus")}:{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {/* {formatStatus(order.payment_status)} */}
              </span>
            </Text>
          </>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
