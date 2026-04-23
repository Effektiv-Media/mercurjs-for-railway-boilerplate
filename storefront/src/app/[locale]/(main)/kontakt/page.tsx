import type { Metadata } from "next"
import type { ReactNode } from "react"
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

const SUPPORT_EMAIL = "support@clickfynd.com"

function IconEmail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,4 12,13 2,4" />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  const contactRows: Array<{
    label: string
    value: string
    href?: string
    icon: ReactNode
  }> = [
    {
      label: t("pages.contact.email"),
      value: SUPPORT_EMAIL,
      href: `mailto:${SUPPORT_EMAIL}`,
      icon: <IconEmail />,
    },
    {
      label: t("pages.contact.phone"),
      value: "+46 10 123 45 67",
      href: "tel:+46101234567",
      icon: <IconPhone />,
    },
    {
      label: t("pages.contact.openingHours"),
      value: t("pages.contact.openingHoursValue"),
      icon: <IconClock />,
    },
    {
      label: t("pages.contact.address"),
      value: "Clickfynd AB, Storgatan 10, 111 22 Stockholm",
      icon: <IconMapPin />,
    },
  ]

  const commonCases = [
    t("pages.contact.orderStatusTracking"),
    t("pages.contact.exchangesReturns"),
    t("pages.contact.paymentQuestions"),
    t("pages.contact.sellerHelp"),
  ]

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="grid lg:grid-cols-[1.3fr,0.7fr] gap-4">

          {/* Main info card */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_14px_24px_rgba(15,23,42,0.06)] overflow-hidden">

            {/* Hero header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50/40 px-6 md:px-10 pt-10 pb-10 border-b border-slate-100">
              <div
                className="absolute inset-0 opacity-[0.25] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #e9d5ff 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
                aria-hidden="true"
              />
              <p className="relative inline-flex rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
                {t("pages.contact.badge")}
              </p>
              <h1 className="relative mt-4 heading-lg text-slate-900">
                {t("pages.contact.heading")}
              </h1>
              <p className="relative mt-3 text-md text-slate-500 max-w-lg">
                {t("pages.contact.intro")}
              </p>
            </div>

            {/* Contact rows */}
            <div className="px-6 md:px-10 py-8">
              <dl className="space-y-2.5">
                {contactRows.map((row) => (
                  <div
                    key={row.label}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 hover:border-purple-200 hover:bg-purple-50/50 hover:shadow-sm transition-all duration-150"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-purple-200 group-hover:text-purple-500 transition-colors duration-150 shadow-sm">
                      {row.icon}
                    </div>
                    <div className="min-w-0">
                      <dt className="text-[11px] uppercase tracking-[0.1em] text-slate-400 font-semibold">
                        {row.label}
                      </dt>
                      <dd className="mt-0.5">
                        {row.href ? (
                          <a
                            href={row.href}
                            className="text-md text-purple-600 hover:text-purple-700 font-medium transition-colors duration-100 truncate block"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="text-md text-slate-900">{row.value}</span>
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Sidebar: common cases — light sky design */}
          <aside className="rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50/40 shadow-[0_14px_24px_rgba(15,23,42,0.06)] overflow-hidden">
            <div className="relative p-6 md:p-8 h-full flex flex-col">
              {/* Subtle dot pattern */}
              <div
                className="absolute inset-0 opacity-[0.25] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #d8b4fe 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
                aria-hidden="true"
              />

              <h2 className="relative heading-sm text-slate-900">
                {t("pages.contact.commonCases")}
              </h2>

              <ul className="relative mt-4 space-y-2.5 flex-1">
                {commonCases.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed"
                  >
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-600"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Email CTA */}
              <div className="relative mt-8 pt-6 border-t border-purple-200">
                <p className="text-xs text-slate-500 mb-3">Snabbast svar via e-post:</p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 shadow-sm hover:shadow-md"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <polyline points="22,4 12,13 2,4" />
                  </svg>
                  {SUPPORT_EMAIL}
                </a>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  )
}
