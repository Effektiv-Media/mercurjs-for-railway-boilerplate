"use client"
import { Button, Card } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { Modal } from "../Modal/Modal"
import { useState } from "react"
import { ProfileDetailsForm } from "../ProfileDetailsForm/ProfileDetailsForm"
import { Divider, Heading } from "@medusajs/ui"
import { PencilSquare } from "@medusajs/icons"
import { useTranslations } from "next-intl"

export const ProfileDetails = ({ user }: { user: HttpTypes.StoreCustomer }) => {
  const t = useTranslations("forms.profile")
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Card className="bg-secondary p-4 flex justify-between items-center">
        <Heading level="h2" className="heading-sm uppercase">
          {t("profileDetails")}
        </Heading>
        <Button
          variant="tonal"
          onClick={() => setShowForm(true)}
          className="uppercase flex items-center gap-2 font-semibold"
        >
          <PencilSquare />
          {t("editDetails")}
        </Button>
      </Card>
      <Card className="p-0">
        <div className="p-4">
          <p className="label-md text-secondary">{t("name")}</p>
          <p className="label-lg text-primary">
            {`${user.first_name} ${user.last_name}`}
          </p>
        </div>
        <Divider />
        <div className="p-4">
          <p className="label-md text-secondary">{t("email")}</p>
          <p className="label-lg text-primary">{user.email}</p>
        </div>
        <Divider />
        <div className="p-4">
          <p className="label-md text-secondary">{t("phoneNumber")}</p>
          <p className="label-lg text-primary">{user.phone}</p>
        </div>
      </Card>
      {showForm && (
        <Modal
          heading={t("editProfileDetails")}
          onClose={() => setShowForm(false)}
        >
          <ProfileDetailsForm
            handleClose={() => setShowForm(false)}
            defaultValues={{
              firstName: user.first_name || "",
              lastName: user.last_name || "",
              phone: user.phone || "",
              email: user.email || "",
            }}
          />
        </Modal>
      )}
    </>
  )
}
