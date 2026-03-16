import { FetchError } from "@medusajs/js-sdk"
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { fetchQuery } from "../../lib/client"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { ListingFeeRulesResponse } from "../../types/listing-fee"

const LISTING_FEE_RULES_QUERY_KEY = "listing_fee_rules" as const
export const listingFeeRulesQueryKeys = queryKeysFactory(LISTING_FEE_RULES_QUERY_KEY)

export const FALLBACK_LISTING_FEE_RULES = [
  { duration_hours: 10, fee_percentage: 4 },
  { duration_hours: 24, fee_percentage: 6 },
  { duration_hours: 48, fee_percentage: 8 },
]

export const useListingFeeRules = (
  options?: Omit<
    UseQueryOptions<
      ListingFeeRulesResponse,
      FetchError,
      ListingFeeRulesResponse,
      QueryKey
    >,
    "queryFn" | "queryKey"
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: async () =>
      fetchQuery("/vendor/listing-fee-rules", {
        method: "GET",
      }),
    queryKey: listingFeeRulesQueryKeys.list({}),
    ...options,
  })

  return { listing_fee_rules: data?.listing_fee_rules || [], ...rest }
}
