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
    title: t("pages.returns.title"),
    description: t("pages.returns.description"),
    alternates: { canonical: `${baseUrl}/${locale}/returer` },
  }
}

const steps = [
  {
    num: "01",
    title: "Logga in & välj order",
    desc: 'Gå till "Mina ordrar" i ditt konto och välj den order som innehåller varan du vill returnera.',
  },
  {
    num: "02",
    title: "Initiera retur",
    desc: 'Klicka på "Starta retur" och ange orsak. Du får en returbekräftelse och instruktioner via e-post.',
  },
  {
    num: "03",
    title: "Paketera & skicka",
    desc: "Paketera varan i originalförpackning om möjligt. Skicka med angiven retursedel inom returperioden.",
  },
  {
    num: "04",
    title: "Återbetalning",
    desc: "När vi mottagit och godkänt returen sker återbetalning inom 3–5 vardagar till din ursprungliga betalningsmetod.",
  },
]

const eligibleItems = [
  "Oanvända produkter i originalskick",
  "Varor med original förpackning och etiketter",
  "Produkter reklamerade inom 14 dagar",
  "Felaktiga eller skadade varor",
]

const nonEligibleItems = [
  "Varor som tydligt har använts eller monterats",
  "Produkter utan originalförpackning",
  "Hygienartiklar av hälsoskäl",
  "Nedladdningsbart digitalt innehåll",
]

export default async function ReturnsPage({
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
          <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50/40 px-6 md:px-10 pt-10 pb-10 border-b border-slate-100">
            <p className="inline-flex rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
              {t("pages.returns.badge")}
            </p>
            <h1 className="mt-4 heading-lg text-slate-900">
              {t("pages.returns.heading")}
            </h1>
            <p className="mt-3 text-md text-slate-500 max-w-2xl">
              {t("pages.returns.intro")}
            </p>

            {/* Key policy pill */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 flex-shrink-0" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-sm font-semibold text-emerald-700">14 dagars ångerrätt på alla köp</span>
            </div>
          </div>
        </div>

        {/* Return steps */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-10 mb-4">
          <h2 className="heading-md text-slate-900 mb-8">Så här returnerar du</h2>

          {/* Desktop: single row with connector lines */}
          <div className="hidden lg:flex items-start">
            {steps.map((step, i) => (
              <Fragment key={step.num}>
                {i > 0 && (
                  <div className="flex-1 self-start mt-5 h-px min-w-6 bg-gradient-to-r from-sky-200 to-sky-100" />
                )}
                <div className="flex flex-col items-center text-center w-40 flex-shrink-0">
                  <div className="relative w-10 h-10 mb-4">
                    <div className={`absolute inset-0 rounded-full border-2 border-purple-300/80 step-ping step-ping-${i + 1}`} />
                    <div className="absolute inset-0 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-sm z-10">
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
                  <div className={`absolute inset-0 rounded-full border-2 border-purple-300/80 step-ping step-ping-${i + 1}`} />
                  <div className="absolute inset-0 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-sm z-10">
                    {step.num}
                  </div>
                </div>
                <h3 className="heading-sm text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <LocalizedClientLink
              href="/user/returns"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-white hover:from-purple-700 hover:to-pink-600 transition-colors duration-150 shadow-sm"
            >
              Starta en retur
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Eligible / Non-eligible */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-3xl border border-emerald-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-8">
            <h2 className="heading-sm text-slate-900 mb-4 flex items-center gap-2">
              <span className="inline-flex w-6 h-6 rounded-full bg-emerald-100 items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Kan returneras
            </h2>
            <ul className="space-y-2.5">
              {eligibleItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-md text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-red-100 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-8">
            <h2 className="heading-sm text-slate-900 mb-4 flex items-center gap-2">
              <span className="inline-flex w-6 h-6 rounded-full bg-red-50 items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-500" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
              Kan ej returneras
            </h2>
            <ul className="space-y-2.5">
              {nonEligibleItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-md text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50/40 px-6 md:px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="heading-sm text-slate-900">Behöver du hjälp med din retur?</p>
            <p className="mt-1 text-md text-slate-500">
              Vi hjälper dig snabbt via vår kundservice.
            </p>
          </div>
          <LocalizedClientLink
            href="/kontakt"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-white hover:from-purple-700 hover:to-pink-600 transition-colors duration-150 shadow-sm"
          >
            Kontakta oss
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>

      </section>
    </main>
  )
}
