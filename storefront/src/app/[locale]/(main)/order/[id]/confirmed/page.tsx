import { OrderConfirmedSection } from "@/components/sections/OrderConfirmedSection/OrderConfirmedSection"
import { retrieveOrder } from "@/lib/data/orders"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServerI18n } from "@/lib/i18n/server"

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  return {
    title: t("orders.orderConfirmed"),
    description: t("orders.purchaseSuccessful"),
  }
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  return (
    <main className="container">
      <OrderConfirmedSection order={order} />
    </main>
  )
}
