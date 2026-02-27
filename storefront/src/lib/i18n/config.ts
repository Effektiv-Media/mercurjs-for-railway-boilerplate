import en from "@/messages/en.json"
import sv from "@/messages/sv.json"

export const SUPPORTED_LANGUAGES = ["en", "sv"] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = "en"

const messagesByLanguage = {
  en,
  sv,
} as const

export function normalizeLanguage(
  language?: string | null
): SupportedLanguage | undefined {
  if (!language) return undefined

  const normalized = language.toLowerCase()

  if (SUPPORTED_LANGUAGES.includes(normalized as SupportedLanguage)) {
    return normalized as SupportedLanguage
  }

  return undefined
}

export function getLanguageFromRegion(locale?: string | null): SupportedLanguage {
  const normalized = (locale || "").toLowerCase()
  if (normalized === "se" || normalized === "sv") return "sv"
  return "en"
}

export function resolveLanguage({
  regionLocale,
  preferredLanguage,
}: {
  regionLocale?: string | null
  preferredLanguage?: string | null
}): SupportedLanguage {
  return (
    normalizeLanguage(preferredLanguage) ??
    getLanguageFromRegion(regionLocale) ??
    DEFAULT_LANGUAGE
  )
}

export function getMessages(language: SupportedLanguage) {
  return messagesByLanguage[language]
}
