import { Button } from "@/components/atoms/Button/Button"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { UserNavigation } from "@/components/molecules/UserNavigation/UserNavigation"
import { getServerI18n } from "@/lib/i18n/server"

export default async function RequestSuccessPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id, locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-3 text-center">
          <h1 className="heading-md uppercase">{t("account.returnRequested")}</h1>
          <p className="label-md text-secondary w-96 mx-auto my-8">
            {t("account.returnRequestedDescription")}
          </p>
          <LocalizedClientLink href={`/user/returns${id && `?return=${id}`}`}>
            <Button className="label-md uppercase px-12 py-3">
              {t("account.returnDetails")}
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </main>
  )
}
