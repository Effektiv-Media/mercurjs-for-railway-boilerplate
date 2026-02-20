import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

const links = [
  { label: "Topplistan", href: "/categories" },
  { label: "Under 300 kr", href: "/categories?max_price=30000" },
  { label: "Nyheter", href: "/categories" },
  { label: "Presenter", href: "/categories?query=present" },
]

export const DealQuickLinks = () => {
  return (
    <section className="w-full" aria-label="Snabblänkar">
      <h2 className="text-3xl font-bold text-sky-900 mb-4">Nya, nya tag</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {links.map((l) => (
          <LocalizedClientLink
            key={l.label}
            href={l.href}
            className="inline-flex items-end rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-300 to-sky-500 px-4 py-5 min-h-28 text-sky-950 text-base font-semibold shadow-sm hover:brightness-95 transition"
          >
            {l.label}
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}
