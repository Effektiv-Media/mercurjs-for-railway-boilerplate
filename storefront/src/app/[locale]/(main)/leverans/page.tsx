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
    title: t("pages.delivery.title"),
    description: t("pages.delivery.description"),
    alternates: { canonical: `${baseUrl}/${locale}/leverans` },
  }
}

const deliveryOptions = [
  {
    title: "Standardleverans",
    time: "2–5 vardagar",
    desc: "Leverans hem till dörren eller till närmaste utlämningsställe. Normalt det snabbaste alternativet för de flesta produkter.",
    badge: "Fri frakt",
    badgeColor: "bg-emerald-100 text-emerald-700",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Utlämningsställe",
    time: "2–4 vardagar",
    desc: "Hämta paketet när det passar dig på ett av tusentals utlämningsställen runt om i Sverige.",
    badge: "Flexibelt",
    badgeColor: "bg-sky-100 text-sky-700",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    title: "Expressleverans",
    time: "1–2 vardagar",
    desc: "Snabbare leverans direkt hem. Tillgänglig för valda produkter och säljare. Se produktsidan för mer info.",
    badge: "Snabb",
    badgeColor: "bg-amber-100 text-amber-700",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

const trackingSteps = [
  { label: "Bekräftad", desc: "Order mottagen och betalning godkänd." },
  { label: "Skickas", desc: "Paketet lämnar lagret. Du får ett spårningsnummer." },
  { label: "På väg", desc: "Paketet är i distribution och på väg till dig." },
  { label: "Levererad", desc: "Paketet är framme. Välkommen åter!" },
]

export default async function DeliveryPage({
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
              {t("pages.delivery.badge")}
            </p>
            <h1 className="mt-4 heading-lg text-slate-900">
              {t("pages.delivery.heading")}
            </h1>
            <p className="mt-3 text-md text-slate-500 max-w-2xl">
              {t("pages.delivery.intro")}
            </p>
          </div>
        </div>

        {/* Delivery options */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-10 mb-4">
          <h2 className="heading-md text-slate-900 mb-6">Leveransalternativ</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {deliveryOptions.map((opt) => (
              <div
                key={opt.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 hover:bg-white hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 mb-3">
                  {opt.icon}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="heading-sm text-slate-900">{opt.title}</h3>
                  <span className={`flex-shrink-0 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${opt.badgeColor}`}>
                    {opt.badge}
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-purple-600 mb-1.5">{opt.time}</p>
                <p className="text-md text-slate-500 leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking timeline */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-10 mb-4">
          <h2 className="heading-md text-slate-900 mb-6">Spårning steg för steg</h2>
          <ol>
            {trackingSteps.map((step, i) => (
              <li key={step.label} className="flex gap-4">
                {/* Track column: dot + line segment (no line after last item) */}
                <div className="flex flex-col items-center flex-shrink-0 w-5">
                  <div
                    className={`w-5 h-5 rounded-full border-2 border-white shadow flex-shrink-0 ${
                      i === 0 ? "bg-purple-600" : "bg-slate-200"
                    }`}
                    aria-hidden="true"
                  />
                  {i < trackingSteps.length - 1 && (
                    <div className="w-px flex-1 min-h-8 bg-gradient-to-b from-purple-200 to-slate-200 mt-1" aria-hidden="true" />
                  )}
                </div>
                {/* Content */}
                <div className={i < trackingSteps.length - 1 ? "pb-6" : "pb-1"}>
                  <p className="heading-sm text-slate-900">{step.label}</p>
                  <p className="mt-0.5 text-md text-slate-500">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <LocalizedClientLink
              href="/spara-order"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-150"
            >
              Gå till Spåra order
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50/40 px-6 md:px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="heading-sm text-slate-900">Frågor om din leverans?</p>
            <p className="mt-1 text-md text-slate-500">
              Kontakta oss på vardagar 08–17 så hjälper vi dig snabbt.
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
