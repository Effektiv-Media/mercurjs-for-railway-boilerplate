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
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <LocalizedClientLink
            key={l.label}
            href={l.href}
            className="inline-flex items-center rounded-full border bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition"
          >
            {l.label}
          </LocalizedClientLink>
        ))}
      </div>
    </section>
  )
}
