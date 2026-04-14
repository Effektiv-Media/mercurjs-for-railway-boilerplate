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
    title: t("pages.about.title"),
    description: t("pages.about.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/om-oss`,
    },
  }
}

function IconBolt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconSparkles() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
      <path d="M5 3l.8 2.2L8 6l-2.2.8L5 9l-.8-2.2L2 6l2.2-.8z" />
      <path d="M19 13l.8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8z" />
    </svg>
  )
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  const features = [
    {
      title: t("pages.about.fast"),
      text: t("pages.about.fastText"),
      icon: <IconBolt />,
      accent: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      title: t("pages.about.safe"),
      text: t("pages.about.safeText"),
      icon: <IconShield />,
      accent: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: t("pages.about.smooth"),
      text: t("pages.about.smoothText"),
      icon: <IconSparkles />,
      accent: "text-sky-600",
      bg: "bg-sky-50",
      border: "border-sky-100",
    },
  ]

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)] overflow-hidden">

          {/* Hero — light sky gradient */}
          <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-50/60 px-6 md:px-10 pt-10 pb-10 border-b border-slate-100">
            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.25] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #bae6fd 1px, transparent 1px)",
                backgroundSize: "26px 26px",
              }}
              aria-hidden="true"
            />
            <p className="relative inline-flex rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
              {t("pages.about.badge")}
            </p>
            <h1 className="relative mt-4 heading-lg text-slate-900 max-w-2xl">
              {t("pages.about.heading")}
            </h1>
            <p className="relative mt-3 text-md text-slate-500 max-w-2xl">
              {t("pages.about.intro")}
            </p>
          </div>

          {/* Stats strip */}
          {/* <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100 bg-slate-50/40">
            {[
              { value: "1\u202f000+", label: "Aktiva säljare" },
              { value: "5\u202f000+", label: "Produkter" },
              { value: "14 dagar", label: "Ångerrätt" },
            ].map((stat) => (
              <div key={stat.label} className="py-5 flex flex-col items-center text-center">
                <span className="heading-md text-sky-600">{stat.value}</span>
                <span className="text-sm text-slate-400 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div> */}

          {/* Feature cards — normal flow, no negative margin */}
          <div className="px-6 md:px-10 py-8">
            <div className="grid md:grid-cols-3 gap-4">
              {features.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 hover:bg-white hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${item.bg} border ${item.border} ${item.accent} mb-3`}>
                    {item.icon}
                  </div>
                  <h2 className="heading-sm text-slate-900">{item.title}</h2>
                  <p className="mt-1.5 text-md text-slate-500">{item.text}</p>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <LocalizedClientLink
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-white hover:bg-sky-700 transition-colors duration-150 shadow-sm hover:shadow-md"
              >
                {t("pages.about.contactUs")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </LocalizedClientLink>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
