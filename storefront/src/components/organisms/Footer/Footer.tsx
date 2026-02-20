import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import footerLinks from "@/data/footerLinks"

export function Footer() {
  return (
    <footer className="container !pt-10 !pb-6 bg-gradient-to-b from-slate-50 to-sky-50/40 border-t border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-6 border border-slate-200 rounded-xl bg-white">
          <h2 className="heading-sm text-primary mb-3 uppercase">Kundservice</h2>
          <nav className="space-y-3" aria-label="Customer services navigation">
            {footerLinks.customerServices.map(({ label, path }) => (
              <LocalizedClientLink
                key={label}
                href={path}
                className="block label-md text-secondary hover:text-sky-700"
              >
                {label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        <div className="p-6 border border-slate-200 rounded-xl bg-white">
          <h2 className="heading-sm text-primary mb-3 uppercase">Om Clickfynd</h2>
          <nav className="space-y-3" aria-label="About navigation">
            {footerLinks.about.map(({ label, path }) => (
              <LocalizedClientLink
                key={label}
                href={path}
                className="block label-md text-secondary hover:text-sky-700"
              >
                {label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        <div className="p-6 border border-slate-200 rounded-xl bg-white">
          <h2 className="heading-sm text-primary mb-3 uppercase">Connect</h2>
          <nav className="space-y-3" aria-label="Social media navigation">
            {footerLinks.connect.map(({ label, path }) => (
              <a
                aria-label={`Go to ${label} page`}
                title={`Go to ${label} page`}
                key={label}
                href={path}
                className="block label-md text-secondary hover:text-sky-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-4 py-6 border border-slate-200 rounded-xl bg-white">
        <p className="text-md text-secondary text-center">
          © {new Date().getFullYear()} Clickfynd
        </p>
      </div>
    </footer>
  )
}
