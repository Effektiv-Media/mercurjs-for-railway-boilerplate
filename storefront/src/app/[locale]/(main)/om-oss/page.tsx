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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const { t } = await getServerI18n({ regionLocale: locale })

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_14px_24px_rgba(15,23,42,0.06)]">
          <p className="inline-flex rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
            {t("pages.about.badge")}
          </p>
          <h1 className="mt-4 heading-lg text-slate-900">
            {t("pages.about.heading")}
          </h1>
          <p className="mt-4 text-md text-slate-600 max-w-3xl">
            {t("pages.about.intro")}
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                title: t("pages.about.fast"),
                text: t("pages.about.fastText"),
              },
              {
                title: t("pages.about.safe"),
                text: t("pages.about.safeText"),
              },
              {
                title: t("pages.about.smooth"),
                text: t("pages.about.smoothText"),
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <h2 className="heading-sm text-slate-900">{item.title}</h2>
                <p className="mt-2 text-md text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <LocalizedClientLink
              href="/kontakt"
              className="inline-flex items-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.06em] text-white hover:bg-sky-700"
            >
              {t("pages.about.contactUs")}
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </main>
  )
}
