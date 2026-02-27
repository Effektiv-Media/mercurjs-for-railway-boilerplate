import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import footerLinks from "@/data/footerLinks"
import { getServerI18n } from "@/lib/i18n/server"

export async function Footer({ locale }: { locale: string }) {
  const { t } = await getServerI18n({ regionLocale: locale })

  return (
    <footer className="container !pt-10 !pb-6 bg-gradient-to-b from-slate-50 to-sky-50/40 border-t border-slate-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-6 border border-slate-200 rounded-xl bg-white">
          <h2 className="heading-sm text-primary mb-3 uppercase">
            {t("footer.customerService")}
          </h2>
          <nav
            className="space-y-3"
            aria-label={t("footer.customerServicesNavigation")}
          >
            {footerLinks.customerServices.map(({ key, path }) => (
              <LocalizedClientLink
                key={key}
                href={path}
                className="block label-md text-secondary hover:text-sky-700"
              >
                {t(`footer.links.${key}`)}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        <div className="p-6 border border-slate-200 rounded-xl bg-white">
          <h2 className="heading-sm text-primary mb-3 uppercase">
            {t("footer.aboutClickfynd")}
          </h2>
          <nav className="space-y-3" aria-label={t("footer.aboutNavigation")}>
            {footerLinks.about.map(({ key, path }) => (
              <LocalizedClientLink
                key={key}
                href={path}
                className="block label-md text-secondary hover:text-sky-700"
              >
                {t(`footer.links.${key}`)}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        <div className="p-6 border border-slate-200 rounded-xl bg-white">
          <h2 className="heading-sm text-primary mb-3 uppercase">
            {t("footer.connect")}
          </h2>
          <nav
            className="space-y-3"
            aria-label={t("footer.socialMediaNavigation")}
          >
            {footerLinks.connect.map(({ label, path }) => (
              <a
                aria-label={t("footer.goToPage", { label })}
                title={t("footer.goToPage", { label })}
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
