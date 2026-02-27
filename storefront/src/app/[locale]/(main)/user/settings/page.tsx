import { LoginForm, ProfileDetails } from "@/components/molecules"
import { UserNavigation } from "@/components/molecules"
import { ProfilePassword } from "@/components/molecules/ProfileDetails/ProfilePassword"
import { retrieveCustomer } from "@/lib/data/customer"
import { getServerI18n } from "@/lib/i18n/server"

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })
  const user = await retrieveCustomer()

  if (!user) return <LoginForm />

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-5 md:gap-8">
        <UserNavigation />
        <div className="md:col-span-3">
          <h1 className="heading-md uppercase mb-8">{t("account.settings")}</h1>
          <ProfileDetails user={user} />
          <ProfilePassword user={user} />
        </div>
      </div>
    </main>
  )
}
