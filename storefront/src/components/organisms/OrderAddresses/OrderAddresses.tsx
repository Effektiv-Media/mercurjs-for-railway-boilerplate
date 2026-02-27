import { Card } from "@/components/atoms"
import { getTranslations } from "next-intl/server"

export const OrderAddresses = async () => {
  const t = await getTranslations("orders")

  return <Card>{t("shippingAddress")}</Card>
}
