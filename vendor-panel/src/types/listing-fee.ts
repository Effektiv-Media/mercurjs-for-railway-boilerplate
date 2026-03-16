export interface ListingFeeRule {
  id?: string
  duration_hours: number
  fee_percentage: number
}

export interface ListingFeeRulesResponse {
  listing_fee_rules: ListingFeeRule[]
}
