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
    title: t("pages.payment.title"),
    description: t("pages.payment.description"),
    alternates: { canonical: `${baseUrl}/${locale}/betalning` },
  }
}

const paymentMethods = [
  {
    title: "Kortbetalning",
    desc: "Betala smidigt med Visa eller Mastercard. Kortuppgifter hanteras aldrig av Clickfynd — allt sker via krypterad betalningsleverantör.",
    badge: "Rekommenderas",
    badgeColor: "bg-sky-100 text-sky-700",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    title: "Klarna",
    desc: "Köp nu, betala senare. Klarna erbjuder fakturabetalning, delbetalning och direktbetalning. Tillgänglighet beror på säljaren.",
    badge: "Populärt",
    badgeColor: "bg-pink-100 text-pink-700",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
  {
    title: "Direktbetalning",
    desc: "Betala direkt via din bank. Snabbt, säkert och utan mellanhänder. Tillgängligt för de flesta svenska banker.",
    badge: "Säkert",
    badgeColor: "bg-emerald-100 text-emerald-700",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
]

const trustItems = [
  {
    title: "SSL-krypterat",
    desc: "All kommunikation mellan dig och Clickfynd är krypterad med SSL/TLS.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
  {
    title: "PCI DSS-standard",
    desc: "Betalningshanteringen lever upp till internationell säkerhetsstandard för kortbetalningar.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Vi lagrar inga kortuppgifter",
    desc: "Clickfynd lagrar aldrig ditt kortnummer eller säkerhetskod på egna servrar.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: "Köparskydd",
    desc: "Om en order inte levereras som utlovat hjälper vi dig med återbetalning.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
]

export default async function PaymentPage({
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
              {t("pages.payment.badge")}
            </p>
            <h1 className="mt-4 heading-lg text-slate-900">
              {t("pages.payment.heading")}
            </h1>
            <p className="mt-3 text-md text-slate-500 max-w-2xl">
              {t("pages.payment.intro")}
            </p>
          </div>
        </div>

        {/* Payment methods */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-10 mb-4">
          <h2 className="heading-md text-slate-900 mb-6">Betalningsmetoder</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 hover:bg-white hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 mb-3">
                  {method.icon}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="heading-sm text-slate-900">{method.title}</h3>
                  <span className={`flex-shrink-0 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${method.badgeColor}`}>
                    {method.badge}
                  </span>
                </div>
                <p className="text-md text-slate-500 leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust / Security */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] p-6 md:p-10 mb-4">
          <h2 className="heading-md text-slate-900 mb-6">Säker handel</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 hover:bg-white hover:shadow-sm transition-all duration-150"
              >
                <div className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 text-sky-600">
                  {item.icon}
                </div>
                <div>
                  <p className="heading-sm text-slate-900 mb-0.5">{item.title}</p>
                  <p className="text-md text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50/50 px-6 md:px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="heading-sm text-slate-900">Frågor om betalning?</p>
            <p className="mt-1 text-md text-slate-500">
              Kontakta oss på vardagar 08–17.
            </p>
          </div>
          <LocalizedClientLink
            href="/kontakt"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-white hover:bg-sky-700 transition-colors duration-150 shadow-sm"
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
