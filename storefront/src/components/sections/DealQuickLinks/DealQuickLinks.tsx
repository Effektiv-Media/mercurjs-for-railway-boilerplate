import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { getTranslations } from "next-intl/server"

export const DealQuickLinks = async () => {
  const t = await getTranslations("pages.home")
  const links = [
    { label: t("quickLinkTopList"), href: "/categories" },
    { label: t("quickLinkUnder300"), href: "/categories?max_price=30000" },
    { label: t("quickLinkNews"), href: "/categories" },
    { label: t("quickLinkGifts"), href: "/categories?query=present" },
  ]

  return (
    <section className="w-full" aria-label={t("quickLinksAria")}>
      <div className="flex items-end justify-between gap-3 mb-4">
        <h2 className="text-3xl font-bold text-slate-900">
          {t("quickLinksHeading")}
        </h2>
        <LocalizedClientLink
          href="/categories"
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
            className="inline-flex items-end rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-rose-50 to-violet-100 px-4 py-5 min-h-28 text-slate-900 text-base font-semibold shadow-sm hover:shadow-md transition"
          >
            {l.label}
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}
