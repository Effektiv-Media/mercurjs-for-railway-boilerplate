import {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils"
import { OrderSetWorkflowEvents } from "@mercurjs/framework"
import { PRODUCT_SALE_MODULE } from "../modules/product_sale"

type OrderEntity = {
  id: string
}

type OrderSetEntity = {
  orders: OrderEntity[]
}

export default async function orderSetPlacedProductSalesHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const orderService = container.resolve(Modules.ORDER)
  const productSaleService = container.resolve(PRODUCT_SALE_MODULE) as any

  const { data: sets } = await query.graph({
    entity: "order_set",
    fields: ["orders.id"],
    filters: {
      id: event.data.id,
    },
  })

  const set = sets?.[0] as OrderSetEntity | undefined

  if (!set?.orders?.length) {
    return
  }

  for (const order of set.orders) {
    const fullOrder = await orderService.retrieveOrder(order.id, {
      relations: ["items"],
      select: ["id"],
    })

    if (!fullOrder?.items?.length) {
      continue
    }

    const rows = fullOrder.items
      .filter((item: any) => item.product_id)
      .map((item: any) => ({
        product_id: item.product_id,
        order_id: fullOrder.id,
        line_item_id: item.id,
        quantity: Number(item.quantity || 1),
      }))

    if (!rows.length) {
      continue
    }

    await productSaleService.createProductSales(rows)
  }
}

export const config: SubscriberConfig = {
  event: OrderSetWorkflowEvents.PLACED,
  context: {
    subscriberId: "order-set-placed-product-sales-handler",
  },
}