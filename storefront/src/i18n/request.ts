import { getRequestConfig } from "next-intl/server"

const supportedLocales = ["en", "sv"] as const
type SupportedLocale = (typeof supportedLocales)[number]

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale)
}

function mapRegionToLanguage(locale?: string | null): SupportedLocale {
  const normalized = (locale || "").toLowerCase()
  if (normalized === "sv" || normalized === "se") return "sv"
  return "en"
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale =
    requested && isSupportedLocale(requested)
      ? requested
      : mapRegionToLanguage(requested)

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
