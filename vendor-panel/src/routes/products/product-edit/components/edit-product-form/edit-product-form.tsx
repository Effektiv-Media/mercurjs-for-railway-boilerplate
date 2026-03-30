import { Button, Input, Select, Text, Textarea, toast } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import * as zod from "zod"

import { ExtendedAdminProduct } from "../../../../../types/products"
import { Form } from "../../../../../components/common/form"
import { SwitchBox } from "../../../../../components/common/switch-box"
import { RouteDrawer, useRouteModal } from "../../../../../components/modals"
import { useExtendableForm } from "../../../../../extensions/forms/hooks"
import { 
  useUpdateProduct, 
  useRepublishProduct, 
} from "../../../../../hooks/api/products"

import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import {
  FormExtensionZone,
  useDashboardExtension,
} from "../../../../../extensions"
import { useListingFeeRules } from "../../../../../hooks/api/listing-fee-rules"


type EditProductFormProps = {
  product: ExtendedAdminProduct
  isRepublishMode?: boolean
}

const EditProductSchema = zod.object({
  title: zod.string().min(1),
  handle: zod.string().min(1),
  description: zod.string().optional(),
  discountable: zod.boolean(),
  listing_duration_hours: zod.coerce.number().optional(),
})

export const EditProductForm = ({
  product, 
  isRepublishMode = false,
}: EditProductFormProps) => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()
  const { listing_fee_rules } = useListingFeeRules()
  const listingFeeOptions = listing_fee_rules
  const { getFormFields, getFormConfigs } = useDashboardExtension()
  const fields = getFormFields("product", "edit")
  const configs = getFormConfigs("product", "edit")

  const metadata = (product.metadata || {}) as Record<string, unknown>

  const getDefaultListingDuration = () => {
  const value = metadata.listing_duration_hours



    if (typeof value === "number" && Number.isFinite(value)) {
      return value
    }

    if (typeof value === "string") {
      const parsed = Number(value)

      if (Number.isFinite(parsed)) {
        return parsed
      }
    }

    return undefined
  }

  const form = useExtendableForm({
    defaultValues: {
      title: product.title,
      handle: product.handle || "",
      description: product.description || "",
      discountable: product.discountable,
      listing_duration_hours: getDefaultListingDuration(),
    },
    schema: EditProductSchema,
    configs: configs,
    data: product,
  })

  const { mutateAsync, isPending } = useUpdateProduct(product.id)
  const { mutateAsync: republishAsync, isPending: isRepublishing } =
    useRepublishProduct(product.id)

    const handleSubmit = form.handleSubmit(async (data) => {
    const {
      description,
      discountable,
      handle,
      title,
      listing_duration_hours,
    } = data

    if (isRepublishMode) {

      if (!listing_duration_hours) {
        toast.error("Please select a listing duration")
        return
      }

      await republishAsync(
        {
          description,
          discountable,
          handle,
          title,
          listing_duration_hours,
        },
        {
          onSuccess: ({ product }) => {
            toast.success(`Product "${product.title}" was republished successfully.`)
            handleSuccess(`/products/${product.id}`)
          },
          onError: (e) => {
            toast.error(e.message)
          },
        }
      )

      return
    }

    await mutateAsync(
      {
        description,
        discountable,
        handle,
        title,
      },
      {
        onSuccess: ({ product }) => {
          toast.success(
            t("products.edit.successToast", {
              title: product.title,
            })
          )
           handleSuccess(`/products/${product.id}`)
        },
        onError: (e) => {
          toast.error(e.message)
        },
      }
    )
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col overflow-hidden"
      >
        <RouteDrawer.Body className="flex flex-1 flex-col gap-y-8 overflow-y-auto">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">

              <Form.Field
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label>{t("fields.title")}</Form.Label>
                      <Form.Control>
                        <Input {...field} />
                      </Form.Control>
                      <Form.ErrorMessage />
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
                      <Form.Label>{t("fields.handle")}</Form.Label>
                      <Form.Control>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 z-10 flex w-8 items-center justify-center border-r">
                            <Text
                              className="text-ui-fg-muted"
                              size="small"
                              leading="compact"
                              weight="plus"
                            >
                              /
                            </Text>
                          </div>
                          <Input {...field} className="pl-10" />
                        </div>
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )
                }}
              />

              <Form.Field
                control={form.control}
                name="description"
                render={({ field }) => {
                  return (
                    <Form.Item>
                      <Form.Label optional>
                        {t("fields.description")}
                      </Form.Label>
                      <Form.Control>
                        <Textarea {...field} />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )
                }}
              />

               {isRepublishMode && (
                <Form.Field
                  control={form.control}
                  name="listing_duration_hours"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Form.Item>
                        <Form.Label>Listing duration</Form.Label>
                        <Form.Control>
                                                    <Select
                            value={value ? String(value) : undefined}
                            onValueChange={(value) => onChange(Number(value))}
                            disabled={!listingFeeOptions.length}
                          >
                            <Select.Trigger>
                            <Select.Value placeholder="Select listing duration" />
                            </Select.Trigger>
                            <Select.Content>
                              {listingFeeOptions.length ? (
                                listingFeeOptions.map((rule: (typeof listingFeeOptions)[number]) => {
                                  return (
                                    <Select.Item
                                      key={`duration-${rule.duration_hours}`}
                                      value={String(rule.duration_hours)}
                                    >
                                      {`${rule.duration_hours} timmar (${rule.fee_percentage}% avgift)`}
                                    </Select.Item>
                                  )
                                })
                              ) : (
                                <Select.Item value="__no_rules__" disabled>
                                  No listing fee rules configured
                                </Select.Item>
                              )}
                            </Select.Content>
                          </Select>
                        </Form.Control>
                        <Form.ErrorMessage />
                      </Form.Item>
                    )
                  }}
                />
              )}
            </div>
            <SwitchBox
              control={form.control}
              name="discountable"
              label={t("fields.discountable")}
              description={t("products.discountableHint")}
            />
            <FormExtensionZone fields={fields} form={form} />
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button
              size="small"
              type="submit"
              isLoading={isRepublishMode ? isRepublishing : isPending}
            >
              {isRepublishMode ? "Republish" : t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}