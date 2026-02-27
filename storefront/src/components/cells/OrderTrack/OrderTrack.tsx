import { Card } from "@/components/atoms"
import { getServerI18n } from "@/lib/i18n/server"

export const OrderTrack = async ({ order }: { order: any }) => {
  if (!order.fulfillments[0]?.labels?.length) return null

  const { t } = await getServerI18n({
    regionLocale: order.shipping_address?.country_code,
  })
  const labels = order.fulfillments[0]?.labels

  return (
    <div>
      <h2 className="text-primary label-lg uppercase">{t("orders.orderTracking")}</h2>
      <ul className="mt-4">
        {labels.map((item: any) => (
          <li key={item.id}>
            <a href={item.tracking_number} target="_blank">
              <Card className="px-4 hover:bg-secondary/30">
                {item.tracking_number}
              </Card>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
