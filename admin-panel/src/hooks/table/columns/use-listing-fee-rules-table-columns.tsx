import { useMemo } from "react";

import { createColumnHelper } from "@tanstack/react-table";

import { StatusCell } from "@/components/table/table-cells/common/status-cell";
import {
  TextCell,
  TextHeader,
} from "@/components/table/table-cells/common/text-cell";
import type { AdminListingFeeRule } from "@/hooks/api/listing-fee-rules";
import { ListingFeeRuleActionMenu } from "@/routes/commission/components/listing-fee-rule-actions";

const columnHelper = createColumnHelper<AdminListingFeeRule>();

export const useListingFeeRulesTableColumns = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  return useMemo(
    () => [
      columnHelper.accessor("duration_hours", {
        header: () => <TextHeader text="Duration" />,
        cell: ({ getValue }) => <TextCell text={`${getValue()}h`} />,
      }),
      columnHelper.accessor("fee_percentage", {
        header: () => <TextHeader text="Fee" />,
        cell: ({ getValue }) => <TextCell text={`${getValue()}%`} />,
      }),
      columnHelper.accessor("is_active", {
        header: () => <TextHeader text="Status" />,
        cell: ({ getValue }) => {
          const value = getValue();

          if (typeof value !== "boolean") {
            return <TextCell text="—" />;
          }

          return (
            <StatusCell color={value ? "green" : "grey"}>
              {value ? "Enabled" : "Disabled"}
            </StatusCell>
          );
        },
      }),
      columnHelper.accessor("id", {
        header: () => <div className="w-full text-right" />,
        cell: (props) => {
          return (
            <div className="flex w-full justify-end">
              <ListingFeeRuleActionMenu
                rule={props.row.original}
                onSuccess={onSuccess}
              />
            </div>
          );
        },
      }),
    ],
    [],
  );
};