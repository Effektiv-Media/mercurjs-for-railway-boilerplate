import { useState } from "react";

import { Button, Input, Label, Switch, toast } from "@medusajs/ui";

import { useCreateListingFeeRule } from "@hooks/api/listing-fee-rules";

type Props = {
  onSuccess?: () => void;
};

const CreateListingFeeRuleForm = ({ onSuccess }: Props) => {
  const [durationHours, setDurationHours] = useState<number>(10);
  const [feePercentage, setFeePercentage] = useState<number>(4);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: createListingFeeRule } = useCreateListingFeeRule({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createListingFeeRule({
        duration_hours: durationHours,
        fee_percentage: feePercentage,
        is_active: isActive,
      });

      toast.success("Created!");
      onSuccess?.();
    } catch (error) {
      toast.error("Error!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <fieldset>
        <Label htmlFor="duration_hours" className="mb-2 block">
          Duration (hours)
        </Label>
        <Input
          id="duration_hours"
          name="duration_hours"
          type="number"
          min={1}
          step={1}
          value={durationHours}
          onChange={(e) => setDurationHours(Number(e.target.value))}
        />
      </fieldset>

      <fieldset>
        <Label htmlFor="fee_percentage" className="mb-2 block">
          Fee percentage
        </Label>
        <Input
          id="fee_percentage"
          name="fee_percentage"
          type="number"
          min={0}
          max={100}
          step={0.01}
          value={feePercentage}
          onChange={(e) => setFeePercentage(Number(e.target.value))}
        />
      </fieldset>

      <fieldset>
        <div className="flex items-center gap-x-2">
          <Switch
            id="is_active"
            checked={isActive}
            onCheckedChange={(checked) => setIsActive(checked)}
          />
          <Label htmlFor="is_active">Enabled</Label>
        </div>
      </fieldset>

      <Button type="submit" isLoading={loading}>
        Create
      </Button>
    </form>
  );
};

export default CreateListingFeeRuleForm;