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
    title: t("pages.faq.title"),
    description: t("pages.faq.description"),
    alternates: { canonical: `${baseUrl}/${locale}/vanliga-fragor` },
  }
}

const faqs = [
  {
    category: "Beställningar",
    color: "sky",
    items: [
      {
        q: "Hur gör jag en beställning?",
        a: "Lägg till produkter i varukorgen och gå sedan till kassan. Fyll i dina uppgifter och välj betalningsmetod. Du får en bekräftelse via e-post direkt efter genomfört köp.",
      },
      {
        q: "Kan jag ändra eller avboka en order?",
        a: "Kontakta oss så snart som möjligt via vår kontaktsida. Vi kan hjälpa till om ordern ännu inte har skickats. När en order är skickad hanteras den istället som en retur.",
      },
      {
        q: "Varför fick jag ingen orderbekräftelse?",
        a: "Kontrollera din skräppostmapp. Om e-posten inte finns där, logga in på ditt konto och kontrollera under Mina ordrar. Du kan även kontakta vår support.",
      },
    ],
  },
  {
    category: "Leverans",
    color: "emerald",
    items: [
      {
        q: "Hur lång tid tar leveransen?",
        a: "Standardleverans tar normalt 2–5 vardagar inom Sverige. Leveranstiden kan variera beroende på säljare och produkt. Du ser alltid en uppskattad leveranstid vid utcheckning.",
      },
      {
        q: "Hur spårar jag min leverans?",
        a: "När din order har skickats får du ett spårningsnummer via e-post. Du kan även logga in på ditt konto och klicka på din order för att se leveransstatus i realtid.",
      },
      {
        q: "Levererar ni utanför Sverige?",
        a: "För tillfället levererar vi primärt inom Sverige. Internationell frakt kan erbjudas av enskilda säljare — se produktsidan för mer information.",
      },
    ],
  },
  {
    category: "Returer",
    color: "amber",
    items: [
      {
        q: "Hur lång är ångerrätten?",
        a: "Du har 14 dagars ångerrätt från det att du mottagit varan, i enlighet med konsumentköplagen. Varan ska returneras i originalskick.",
      },
      {
        q: "Hur startar jag en retur?",
        a: "Logga in på ditt konto, gå till Mina ordrar och välj den order du vill returnera. Följ instruktionerna för att initiera returen. Du kan även kontakta vår support.",
      },
      {
        q: "När får jag pengarna tillbaka?",
        a: "Återbetalning sker normalt inom 3–5 vardagar efter att vi mottagit och godkänt din retur. Pengarna återbetalas till det betalningssätt du använde vid köpet.",
      },
    ],
  },
  {
    category: "Betalning",
    color: "violet",
    items: [
      {
        q: "Vilka betalningsmetoder accepterar ni?",
        a: "Vi accepterar de flesta vanliga betalningsmetoder inklusive Visa, Mastercard, och andra kortbetalningar. Tillgängliga alternativ visas vid kassan.",
      },
      {
        q: "Är det säkert att betala på Clickfynd?",
        a: "Ja. Alla betalningar hanteras via krypterade och säkra betalningslösningar (SSL). Vi lagrar aldrig kortuppgifter på våra egna servrar.",
      },
      {
        q: "Varför nekades min betalning?",
        a: "Det kan bero på fel kortuppgifter, otillräckliga medel eller att din bank blockerade transaktionen. Kontakta din bank eller prova en annan betalningsmetod.",
      },
    ],
  },
]

const colorMap: Record<string, { badge: string; dot: string; border: string }> = {
  sky: {
    badge: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
    border: "border-purple-100",
  },
  emerald: {
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    border: "border-emerald-100",
  },
  amber: {
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    border: "border-amber-100",
  },
  violet: {
    badge: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
    border: "border-violet-100",
  },
}

export default async function FaqPage({
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
              {t("pages.faq.badge")}
            </p>
            <h1 className="mt-4 heading-lg text-slate-900">
              {t("pages.faq.heading")}
            </h1>
            <p className="mt-3 text-md text-slate-500 max-w-2xl">
              {t("pages.faq.intro")}
            </p>
          </div>
        </div>

        {/* FAQ sections */}
        <div className="space-y-4">
          {faqs.map((section) => {
            const c = colorMap[section.color]
            return (
              <div
                key={section.category}
                className="rounded-3xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] overflow-hidden"
              >
                {/* Section header */}
                <div className="px-6 md:px-10 py-5 border-b border-slate-100 flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                  <h2 className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${c.badge}`}>
                    {section.category}
                  </h2>
                </div>

                {/* Q&A items */}
                <dl className="divide-y divide-slate-100">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="px-6 md:px-10 py-5 hover:bg-slate-50/60 transition-colors duration-150"
                    >
                      <dt className="heading-sm text-slate-900 mb-2">
                        {item.q}
                      </dt>
                      <dd className="text-md text-slate-500 leading-relaxed">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )
          })}
        </div>

        {/* Still need help */}
        <div className="mt-4 rounded-3xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50/40 px-6 md:px-10 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="heading-sm text-slate-900">Hittade du inte svaret?</p>
            <p className="mt-1 text-md text-slate-500">
              Vår support hjälper dig snabbt på vardagar 08–17.
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
