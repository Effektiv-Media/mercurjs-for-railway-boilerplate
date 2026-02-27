"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileDetailsSchema, ProfileDetailsFormData } from "./schema"
import { LabeledInput } from "@/components/cells"
import { Button } from "@/components/atoms"
import { updateCustomer } from "@/lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { useTranslations } from "next-intl"

interface Props {
  defaultValues?: ProfileDetailsFormData
  handleClose?: () => void
}

export const ProfileDetailsForm: React.FC<Props> = ({
  defaultValues,
  ...props
}) => {
  const methods = useForm<ProfileDetailsFormData>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  )
}

const Form: React.FC<Props> = ({ handleClose }) => {
  const ta = useTranslations("forms.address")
  const tc = useTranslations("common")
  const tp = useTranslations("forms.profile")
  const [error, setError] = useState<string>()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext()

  const submit = async (data: FieldValues) => {
    const body = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
    }
    try {
      await updateCustomer(body as HttpTypes.StoreUpdateCustomer)
    } catch (err) {
      setError((err as Error).message)
      return
    }

    setError("")
    handleClose && handleClose()
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="px-4 space-y-4">
        <div className="max-w-full grid grid-cols-2 items-top gap-4 mb-4">
          <LabeledInput
            label={ta("firstName")}
            placeholder={ta("typeFirstName")}
            error={errors.firstName as FieldError}
            {...register("firstName")}
          />
          <LabeledInput
            label={ta("lastName")}
            placeholder={ta("typeLastName")}
            error={errors.lastName as FieldError}
            {...register("lastName")}
          />
          <LabeledInput
            label={ta("phone")}
            placeholder={ta("typePhoneNumber")}
            error={errors.phone as FieldError}
            {...register("phone")}
          />
          <LabeledInput label={tp("email")} disabled {...register("email")} />
        </div>
        {error && <p className="label-md text-negative">{error}</p>}
        <Button className="w-full ">{tc("save")}</Button>
      </div>
    </form>
  )
}
