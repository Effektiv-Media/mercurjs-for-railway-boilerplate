import { sdk } from "@lib/client";
import { queryKeysFactory } from "@lib/query-key-factory";
import type {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";

export type AdminListingFeeRule = {
  id: string;
  duration_hours: number;
  fee_bps: number;
  fee_percentage: number;
  is_active?: boolean;
};

export type CreateListingFeeRule = {
  duration_hours: number;
  fee_percentage: number;
  is_active?: boolean;
};

export type UpdateListingFeeRule = {
  id: string;
  duration_hours: number;
  fee_percentage: number;
  is_active?: boolean;
};

export type DeleteListingFeeRule = {
  id: string;
};

export const listingFeeRulesQueryKeys =
  queryKeysFactory("listing_fee_rule");

export const useListingFeeRules = (
  query?: Record<string, string | number>,
  options?: Omit<
    UseQueryOptions<
      Record<string, string | number>,
      Error,
      { listing_fee_rules: AdminListingFeeRule[] },
      QueryKey
    >,
    "queryFn" | "queryKey"
  >,
) => {
  const { data, ...other } = useQuery<
    Record<string, string | number>,
    Error,
    { listing_fee_rules: AdminListingFeeRule[] }
  >({
    queryKey: listingFeeRulesQueryKeys.list(query),
    queryFn: () =>
      sdk.client.fetch("/admin/listing-fee-rules", {
        method: "GET",
        query,
      }),
    ...options,
  });

    return {
    listing_fee_rules: data?.listing_fee_rules ?? [],
    count: data?.listing_fee_rules?.length ?? 0,
    ...other,
  };
};

export const useCreateListingFeeRule = (
  options: UseMutationOptions<
    { listing_fee_rule?: AdminListingFeeRule },
    Error,
    CreateListingFeeRule
  >,
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch("/admin/listing-fee-rules", {
        method: "POST",
        body: payload,
      }),
    ...options,
  });
};

export const useUpdateListingFeeRule = (
  options: UseMutationOptions<
    { listing_fee_rule?: AdminListingFeeRule },
    Error,
    UpdateListingFeeRule
  >,
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/listing-fee-rules/${payload.id}`, {
        method: "POST",
        body: {
          duration_hours: payload.duration_hours,
          fee_percentage: payload.fee_percentage,
          is_active: payload.is_active,
        },
      }),
    ...options,
  });
};

export const useDeleteListingFeeRule = (
  options: UseMutationOptions<
    {
      id?: string;
      object?: string;
      deleted?: boolean;
    },
    Error,
    DeleteListingFeeRule
  >,
) => {
  return useMutation({
    mutationFn: (payload) =>
      sdk.client.fetch(`/admin/listing-fee-rules/${payload.id}`, {
        method: "DELETE",
      }),
    ...options,
  });
};