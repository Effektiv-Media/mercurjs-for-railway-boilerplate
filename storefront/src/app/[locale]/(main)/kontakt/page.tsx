import type { Metadata } from "next"
import { headers } from "next/headers"
import { getServerI18n } from "@/lib/i18n/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`

  return {
    title: t("pages.contact.title"),
    description: t("pages.contact.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/kontakt`,
    },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })
  const contactRows = [
    { label: t("pages.contact.email"), value: "support@clickfynd.com" },
    { label: t("pages.contact.phone"), value: "+46 10 123 45 67" },
    {
      label: t("pages.contact.openingHours"),
      value: t("pages.contact.openingHoursValue"),
    },
    {
      label: t("pages.contact.address"),
      value: "Clickfynd AB, Storgatan 10, 111 22 Stockholm",
    },
  ]

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_14px_24px_rgba(15,23,42,0.06)]">
          <div>
            <p className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
              {t("pages.contact.badge")}
            </p>
            <h1 className="mt-4 heading-lg text-slate-900">
              {t("pages.contact.heading")}
            </h1>
            <p className="mt-4 text-md text-slate-600 max-w-2xl">
              {t("pages.contact.intro")}
            </p>

            <dl className="mt-8 space-y-3">
              {contactRows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <dt className="text-xs uppercase tracking-[0.08em] text-slate-500">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-md text-slate-900">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-gradient-to-b from-sky-600 to-cyan-700 p-5 text-white">
            <h2 className="heading-sm">{t("pages.contact.commonCases")}</h2>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-white/90">
              <li>{t("pages.contact.orderStatusTracking")}</li>
              <li>{t("pages.contact.exchangesReturns")}</li>
              <li>{t("pages.contact.paymentQuestions")}</li>
              <li>{t("pages.contact.sellerHelp")}</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  )
}
