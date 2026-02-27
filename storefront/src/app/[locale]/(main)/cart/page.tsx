import { Cart } from "@/components/sections"
import { Metadata } from "next"
import { Suspense } from "react"
import { getServerI18n } from "@/lib/i18n/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  return {
    title: t("cart.title"),
    description: t("cart.description"),
  }
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  return (
    <main className="container grid grid-cols-12">
      <Suspense fallback={<>{t("common.loading")}</>}>
        <Cart />
      </Suspense>
    </main>
  )
}
