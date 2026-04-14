import { useState } from "react";

import { EllipsisHorizontal, PencilSquare, Trash } from "@medusajs/icons";
import { Drawer, DropdownMenu, toast } from "@medusajs/ui";

import {
  AdminListingFeeRule,
  useDeleteListingFeeRule,
} from "@hooks/api/listing-fee-rules";
import EditListingFeeRuleForm from "@routes/commission/components/edit-listing-fee-rule-form";

export function ListingFeeRuleActionMenu({
  rule,
  onSuccess,
}: {
  rule: AdminListingFeeRule;
  onSuccess?: () => void;
}) {
  const [editOpen, setEditOpen] = useState(false);

  const { mutateAsync: deleteListingFeeRule } = useDeleteListingFeeRule({});

  const onDeleteClick = async () => {
    try {
      await deleteListingFeeRule({ id: rule.id });
      toast.success("Deleted!");
      onSuccess?.();
    } catch (error) {
      toast.error("Error!");
      console.error(error);
    }
  };

  return (
    <Drawer open={editOpen} onOpenChange={setEditOpen}>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md cursor-pointer hover:bg-ui-bg-base-hover"
          >
            <EllipsisHorizontal />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item
            className="gap-x-2"
            onClick={() => setEditOpen(true)}
          >
            <PencilSquare className="text-ui-fg-subtle" />
            Edit
          </DropdownMenu.Item>

          <DropdownMenu.Separator />

          <DropdownMenu.Item className="gap-x-2" onClick={onDeleteClick}>
            <Trash className="text-ui-fg-subtle" />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Listing Fee Rule</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditListingFeeRuleForm
            rule={rule}
            onSuccess={() => {
              setEditOpen(false);
              onSuccess?.();
            }}
          />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  );
}