import { useQueryParams } from "@/hooks/use-query-params";

type UseListingFeeRulesTableQueryProps = {
  prefix?: string;
  pageSize?: number;
};

type ListingFeeRulesTableQuery = {
  limit: number;
  offset: number;
  q?: string;
  order?: string;
};

export const useListingFeeRulesTableQuery = ({
  prefix,
  pageSize = 20,
}: UseListingFeeRulesTableQueryProps) => {
  const queryObject = useQueryParams(["offset", "q", "order"], prefix);

  const { offset, q, order } = queryObject;

  const searchParams: ListingFeeRulesTableQuery = {
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    order,
    q,
  };

  return {
    searchParams,
    raw: queryObject,
  };
};