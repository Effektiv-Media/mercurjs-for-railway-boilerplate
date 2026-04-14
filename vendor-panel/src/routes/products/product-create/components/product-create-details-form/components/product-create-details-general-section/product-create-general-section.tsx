import { Input, Select, Textarea } from "@medusajs/ui"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Form } from "../../../../../../../components/common/form"
import { HandleInput } from "../../../../../../../components/inputs/handle-input"
import { useListingFeeRules } from "../../../../../../../hooks/api/listing-fee-rules"
import { ProductCreateSchemaType } from "../../../../types"

type ProductCreateGeneralSectionProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const ProductCreateGeneralSection = ({
  form,
}: ProductCreateGeneralSectionProps) => {
  const { t } = useTranslation()
  const { listing_fee_rules } = useListingFeeRules()
  const listingFeeOptions = listing_fee_rules

  return (
    <div id="general" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Form.Field
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label>{t("products.fields.title.label")}</Form.Label>
                  <Form.Control>
                    <Input {...field} placeholder="Winter jacket" />
                  </Form.Control>
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="subtitle"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label optional>
                    {t("products.fields.subtitle.label")}
                  </Form.Label>
                  <Form.Control>
                    <Input {...field} placeholder="Warm and cosy" />
                  </Form.Control>
                </Form.Item>
              )
            }}
          />
          <Form.Field
            control={form.control}
            name="handle"
            render={({ field }) => {
              return (
                <Form.Item>
                  <Form.Label
                    tooltip={t("products.fields.handle.tooltip")}
                    optional
                  >
                    {t("fields.handle")}
                  </Form.Label>
                  <Form.Control>
                    <HandleInput {...field} placeholder="winter-jacket" />
                  </Form.Control>
                </Form.Item>
              )
            }}
          />
        </div>
      </div>
      <Form.Field
        control={form.control}
        name="description"
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label optional>
                {t("products.fields.description.label")}
              </Form.Label>
              <Form.Control>
                <Textarea {...field} placeholder="A warm and cozy jacket" />
              </Form.Control>
            </Form.Item>
          )
        }}
      />
      <Form.Field
        control={form.control}
        name="listing_duration_hours"
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label>Listing duration</Form.Label>
              <Form.Control>
                <Select
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={!listingFeeOptions.length}
                >
                  <Select.Trigger>
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    {listingFeeOptions.map((rule) => {
                      return (
                        <Select.Item
                          key={`duration-${rule.duration_hours}`}
                          value={String(rule.duration_hours)}
                        >
                          {`${rule.duration_hours} timmar (${rule.fee_percentage}% avgift)`}
                        </Select.Item>
                      )
                    })}
                  </Select.Content>
                </Select>
              </Form.Control>
              <Form.ErrorMessage />
            </Form.Item>
          )
        }}
      />
    </div>
  )
}
