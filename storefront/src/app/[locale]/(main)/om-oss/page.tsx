import type { Metadata } from "next"
import { headers } from "next/headers"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const headersList = await headers()
  const host = headersList.get("host")
  const protocol = headersList.get("x-forwarded-proto") || "https"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`

  return {
    title: "Om oss",
    description:
      "Lär känna Clickfynd, vår vision och hur vi gör smart shopping snabbare.",
    alternates: {
      canonical: `${baseUrl}/${locale}/om-oss`,
    },
  }
}

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_14px_24px_rgba(15,23,42,0.06)]">
          <p className="inline-flex rounded-full bg-sky-100 text-sky-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
            Om oss
          </p>
          <h1 className="mt-4 heading-lg text-slate-900">
            Clickfynd bygger en snabbare marknadsplats for vardagliga fynd
          </h1>
          <p className="mt-4 text-md text-slate-600 max-w-3xl">
            Vi samlar produkter fran flera saljare i en och samma checkout.
            Fokus ar tydligt: bra priser, snabb leverans och en trygg
            kundupplevelse.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Snabbt",
                text: "Nya produkter varje dag och tydliga kampanjer.",
              },
              {
                title: "Tryggt",
                text: "Sakra betalningar och support nar du behover hjalp.",
              },
              {
                title: "Smidigt",
                text: "Flera saljare, en upplevelse och enkel returhantering.",
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
              Kontakta oss
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </main>
  )
}
