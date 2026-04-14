import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getTranslations } from "next-intl/server"
import { Trophy, BadgePercent, Sparkles, Gift } from "lucide-react"

export const DealQuickLinks = async () => {
  const t = await getTranslations("pages.home")
  const links = [
  { label: t("quickLinkTopList"), href: "/kategorier", icon: Trophy },
  { label: t("quickLinkUnder300"), href: "/kategorier?max_price=30000", icon: BadgePercent },
  { label: t("quickLinkNews"), href: "/kategorier", icon: Sparkles },
  { label: t("quickLinkGifts"), href: "/kategorier?query=present", icon: Gift },
]

  return (
    <section className="w-full" aria-label={t("quickLinksAria")}>
      <div className="flex items-end justify-between gap-3 mb-4">
        <h2 className="text-3xl font-bold text-slate-900">
          {t("quickLinksHeading")}
        </h2>
        <LocalizedClientLink
          href="/kategorier"
          className="hidden md:inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
        >
          {t("quickLinksViewAll")}
        </LocalizedClientLink>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {links.map((l) => (
          <LocalizedClientLink
            key={l.label}
            href={l.href}
            className="relative overflow-hidden inline-flex items-end rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-rose-50 to-violet-100 px-4 py-5 min-h-28 text-slate-900 text-base font-semibold shadow-sm hover:shadow-md transition"
          >
            <>
            <l.icon
              size={72}
              strokeWidth={2}
              className="absolute -top-0 -right-0 text-slate-200 pointer-events-none"
            />
            <span className="relative z-10">{l.label}</span>
          </>
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}