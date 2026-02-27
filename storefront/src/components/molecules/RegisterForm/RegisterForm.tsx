"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Button } from "@/components/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import { LabeledInput } from "@/components/cells"
import { registerFormSchema, RegisterFormData } from "./schema"
import { signup } from "@/lib/data/customer"
import { useState } from "react"
import { Container } from "@medusajs/ui"
import Link from "next/link"
import { PasswordValidator } from "@/components/cells/PasswordValidator/PasswordValidator"
import { useTranslations } from "next-intl"

export const RegisterForm = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}

const Form = () => {
  const t = useTranslations("forms.auth")
  const ta = useTranslations("forms.address")
  const [passwordError, setPasswordError] = useState({
    isValid: false,
    lower: false,
    upper: false,
    "8chars": false,
    symbolOrDigit: false,
  })
  const [error, setError] = useState()
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const submit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("first_name", data.firstName)
    formData.append("last_name", data.lastName)
    formData.append("phone", data.phone)

    const res = passwordError.isValid && (await signup(formData))

    if (res && !res?.id) setError(res)
  }

  return (
    <main className="container">
      <Container className="border max-w-xl mx-auto mt-8 p-4">
        <h1 className="heading-md text-primary uppercase mb-8">
          {t("createAccount")}
        </h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <LabeledInput
              className="md:w-1/2"
              label={ta("firstName")}
              placeholder={ta("typeFirstName")}
              error={errors.firstName as FieldError}
              {...register("firstName")}
            />
            <LabeledInput
              className="md:w-1/2"
              label={ta("lastName")}
              placeholder={ta("typeLastName")}
              error={errors.lastName as FieldError}
              {...register("lastName")}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <LabeledInput
              className="md:w-1/2"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              error={errors.email as FieldError}
              {...register("email")}
            />
            <LabeledInput
              className="md:w-1/2"
              label={ta("phone")}
              placeholder={ta("typePhoneNumber")}
              error={errors.phone as FieldError}
              {...register("phone")}
            />
          </div>
          <div>
            <LabeledInput
              className="mb-4"
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              type="password"
              error={errors.password as FieldError}
              {...register("password")}
            />
            <PasswordValidator
              password={watch("password")}
              setError={setPasswordError}
            />
          </div>

          {error && <p className="label-md text-negative">{error}</p>}
          <Button
            className="w-full flex justify-center mt-8 uppercase"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {t("createAccount")}
          </Button>
        </form>
      </Container>
      <Container className="border max-w-xl mx-auto mt-8 p-4">
        <h1 className="heading-md text-primary uppercase mb-8">
          {t("alreadyHaveAccount")}
        </h1>
        <p className="text-center label-md">
          <Link href="/user">
            <Button
              variant="tonal"
              className="w-full flex justify-center mt-8 uppercase"
            >
              {t("login")}
            </Button>
          </Link>
        </p>
      </Container>
    </main>
  )
}
