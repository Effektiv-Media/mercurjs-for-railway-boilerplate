export const normalizeLocale = (locale: string) => {
  const localeMap: Record<string, string> = {
    se: "sv",
    us: "en",
  }

    return localeMap[locale] || locale
}