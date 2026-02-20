import type { Metadata } from "next"
import { headers } from "next/headers"

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
    title: "Kontakt",
    description:
      "Kontakta Clickfynd for fragor om order, returer, leverans eller betalning.",
    alternates: {
      canonical: `${baseUrl}/${locale}/kontakt`,
    },
  }
}

const contactRows = [
  { label: "E-post", value: "support@clickfynd.com" },
  { label: "Telefon", value: "+46 10 123 45 67" },
  { label: "Oppettider", value: "Man-fre 08:00-17:00" },
  { label: "Adress", value: "Clickfynd AB, Storgatan 10, 111 22 Stockholm" },
]

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_14px_24px_rgba(15,23,42,0.06)]">
          <div>
            <p className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]">
              Kontakt
            </p>
            <h1 className="mt-4 heading-lg text-slate-900">Vi hjalper dig snabbt</h1>
            <p className="mt-4 text-md text-slate-600 max-w-2xl">
              Har du fragor om order, returer eller betalning? Kontakta oss sa
              svarar vi sa snabbt vi kan under vardagar.
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
            <h2 className="heading-sm">Vanliga arenden</h2>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-white/90">
              <li>Orderstatus och sparning</li>
              <li>Byten och returer</li>
              <li>Betalningsfragor</li>
              <li>Hjalp till saljare</li>
            </ul>
          </aside>
        </div>
      </section>
    </main>
  )
}
