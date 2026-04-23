import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import footerLinks, { type SocialIcon } from "@/data/footerLinks"
import { getServerI18n } from "@/lib/i18n/server"

function SocialSvg({ icon }: { icon: SocialIcon }) {
  if (icon === "facebook") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    )
  }
  if (icon === "instagram") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    )
  }
  if (icon === "linkedin") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  }
  if (icon === "tiktok") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.86 4.86 0 01-1.01-.07z" />
      </svg>
    )
  }
  return null
}

export async function Footer({ locale }: { locale: string }) {
  const { t } = await getServerI18n({ regionLocale: locale })
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-purple-50/30 border-t border-slate-200">
      {/* Accent gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-8">

        {/* Top row: logo + tagline + social icons */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-10 border-b border-slate-200">
          <div>
            <span className="text-[22px] font-extrabold tracking-tight leading-none bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Clickfynd
            </span>
            <p className="mt-2 text-sm text-slate-500 max-w-[260px] leading-relaxed">
              Din smarta marknadsplats för begagnat och nytt.
            </p>
          </div>

          {/* Social icons */}
          <nav aria-label={t("footer.socialMediaNavigation")} className="flex items-center gap-2">
            {footerLinks.social.map(({ label, icon, path }) => (
              <a
                key={label}
                href={path}
                aria-label={t("footer.goToPage", { label })}
                title={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-500 shadow-sm hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50 hover:shadow-md transition-all duration-200 hover:scale-110"
              >
                <SocialSvg icon={icon} />
              </a>
            ))}
          </nav>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10 pt-10">
          <nav aria-label={t("footer.customerServicesNavigation")}>
            <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-400 mb-4">
              {t("footer.customerService")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.customerServices.map(({ key, path }) => (
                <li key={key}>
                  <LocalizedClientLink
                    href={path}
                    className="footer-link text-sm text-slate-600 hover:text-slate-900 transition-colors duration-150"
                  >
                    {t(`footer.links.${key}`)}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.aboutNavigation")}>
            <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-400 mb-4">
              {t("footer.aboutClickfynd")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.about.map(({ key, path }) => (
                <li key={key}>
                  <LocalizedClientLink
                    href={path}
                    className="footer-link text-sm text-slate-600 hover:text-slate-900 transition-colors duration-150"
                  >
                    {t(`footer.links.${key}`)}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Seller CTA column */}
          <div className="col-span-2 md:col-span-1 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/60 border border-purple-100 px-5 py-5">
            <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-slate-400 mb-3">
              Sälj hos oss
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Nå tusentals köpare. Gratis att komma igång — du betalar bara när du säljer.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_VENDOR_URL || "https://vendor.mercurjs.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-xs font-semibold text-white hover:from-purple-700 hover:to-pink-600 transition-colors duration-150 shadow-sm"
            >
              Bli säljare
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            { label: "SSL-krypterat", path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
            { label: "Trygg handel", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.58L18 8l-8 8z" },
            { label: "14 dagars ångerrätt", path: "M9 14l-4-4 1.41-1.42L9 11.17l8.59-8.58L19 4l-10 10z" },
            { label: "Säkra betalningar", path: "M1 4h22v16H1zM1 10h22" },
          ] as { label: string; path: string }[]).map(({ label, path }) => (
            <div key={label} className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 text-purple-500"
                aria-hidden="true"
              >
                <path d={path} />
              </svg>
              <span className="text-[11px] text-slate-500 font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-400">
            © {year} Clickfynd AB
          </p>
          <p className="text-[11px] text-slate-400">
            Alla priser visas inkl. moms
          </p>
        </div>

      </div>
    </footer>
  )
}
