import { OrdersPagination } from "@/components/organisms/OrdersPagination/OrdersPagination"
import { SingleOrderReturn } from "@/components/organisms/SingleOrderReturn/SingleOrderReturn"
import { isEmpty } from "lodash"

const LIMIT = 10

export const OrderReturnRequests = ({
  returns = [],
  user,
  page,
  currentReturn,
  returnReasons,
}: {
  returns: any[]
  user: any
  page: string
  currentReturn: string
  returnReasons: any[]
}) => {
  const pages = Math.ceil(returns.length / LIMIT)
  const currentPage = +page || 1
  const offset = (+currentPage - 1) * LIMIT

  const processedReturns = returns.slice(offset, offset + LIMIT)

  if (isEmpty(processedReturns)) {
    return (
      <div className="mt-8">
        <p className="text-center text-secondary w-96 mt-8 mx-auto">
          Inga returer ännu. När du har gjort en returförfrågan kommer den att visas här.
        </p>
      </div>
    )
  }

  return (
    <div>
      {processedReturns.map((item) => (
        <SingleOrderReturn
          key={item.id}
          item={item}
          user={user}
          defaultOpen={currentReturn === item.id}
          returnReason={returnReasons}
        />
      ))}
      <div className="mt-8 flex justify-center">
        <OrdersPagination pages={pages} />
      </div>
    </div>
  )
}
