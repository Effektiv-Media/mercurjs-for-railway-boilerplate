import { Fragment } from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
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
    title: t("pages.trackOrder.title"),
    description: t("pages.trackOrder.description"),
    alternates: { canonical: `${baseUrl}/${locale}/spara-order` },
  }
}

const steps = [
  {
    num: "01",
    title: "Beställ",
    desc: "Du gör din beställning och väljer betalningsmetod. Du får en orderbekräftelse direkt till din e-post.",
  },
  {
    num: "02",
    title: "Behandlas",
    desc: "Säljaren bekräftar och packar din order. Status uppdateras i ditt konto under Mina ordrar.",
  },
  {
    num: "03",
    title: "Skickas",
    desc: "Ordern lämnar lagret och du får ett spårningsnummer via e-post. Du kan följa paketet i realtid.",
  },
  {
    num: "04",
    title: "Levererad",
    desc: "Paketet är framme hos dig. Om något är fel, starta enkelt en retur via ditt konto.",
  },
]

const statusGuide = [
  {
    status: "Bekräftad",
    desc: "Din betalning är godkänd och ordern har tagits emot av säljaren.",
    color: "bg-sky-100 text-sky-700",
  },
  {
    status: "Behandlas",
    desc: "Säljaren packar och förbereder din order för leverans.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    status: "Skickad",
    desc: "Paketet är på väg. Kolla din e-post för spårningslänk.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    status: "Levererad",
    desc: "Paketet har levererats till angiven adress.",
    color: "bg-emerald-100 text-emerald-700",
  },
]

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  return (
    <main className="page-shell">
      <section className="page-content">

        {/* Hero */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)] overflow-hidden mb-4">
          <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50/60 px-6 md:px-10 pt-10 pb-10 border-b border-slate-100">
            <p className="inline-flex rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
              {t("pages.trackOrder.badge")}
            </p>
            <h1 className="mt-4 heading-lg text-slate-900">
              {t("pages.trackOrder.heading")}
            </h1>
            <p className="mt-3 text-md text-slate-500 max-w-2xl">
              {t("pages.trackOrder.intro")}
            </p>
            <div className="mt-6">
              <LocalizedClientLink
                href="/user/orders"
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-white hover:bg-sky-700 transition-colors duration-150 shadow-sm"
              >
                Gå till Mina ordrar
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </LocalizedClientLink>
            </div>
          </div>
        </div>

        {/* How it works — steps */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-10 mb-4">
          <h2 className="heading-md text-slate-900 mb-8">Så fungerar det</h2>

          {/* Desktop: single row with connector lines between steps */}
          <div className="hidden lg:flex items-start">
            {steps.map((step, i) => (
              <Fragment key={step.num}>
                {i > 0 && (
                  <div className="flex-1 self-start mt-5 h-px min-w-6 bg-gradient-to-r from-sky-200 to-sky-100" />
                )}
                <div className="flex flex-col items-center text-center w-40 flex-shrink-0">
                  <div className="relative w-10 h-10 mb-4">
                    <div className={`absolute inset-0 rounded-full border-2 border-sky-300/80 step-ping step-ping-${i + 1}`} />
                    <div className="absolute inset-0 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center shadow-sm z-10">
                      {step.num}
                    </div>
                  </div>
                  <h3 className="heading-sm text-slate-900 mb-1.5">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </Fragment>
            ))}
          </div>

          {/* Mobile: 2-col grid */}
          <div className="lg:hidden grid grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className="relative w-10 h-10 mb-3">
                  <div className={`absolute inset-0 rounded-full border-2 border-sky-300/80 step-ping step-ping-${i + 1}`} />
                  <div className="absolute inset-0 rounded-full bg-sky-600 text-white text-sm font-bold flex items-center justify-center shadow-sm z-10">
                    {step.num}
                  </div>
                </div>
                <h3 className="heading-sm text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order status guide */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-10">
          <h2 className="heading-md text-slate-900 mb-6">Vad betyder olika statusar?</h2>
          <dl className="grid sm:grid-cols-2 gap-3">
            {statusGuide.map((item) => (
              <div
                key={item.status}
                className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 hover:bg-white hover:shadow-sm transition-all duration-150"
              >
                <dt className="mb-1.5">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.color}`}>
                    {item.status}
                  </span>
                </dt>
                <dd className="text-md text-slate-500">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>

      </section>
    </main>
  )
}
