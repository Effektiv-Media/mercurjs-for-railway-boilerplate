import { getMessages, resolveLanguage } from "./config"

function getByPath(obj: Record<string, any>, path: string): string | undefined {
  return path.split(".").reduce<any>((acc, key) => acc?.[key], obj)
}

function interpolate(
  template: string,
  values?: Record<string, string | number>
): string {
  if (!values) return template

  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`\\{${key}\\}`, "g"), String(value))
  }, template)
}

export async function getServerI18n({
  regionLocale,
  preferredLanguage,
}: {
  regionLocale?: string | null
  preferredLanguage?: string | null
}) {
  const language = resolveLanguage({
    regionLocale,
    preferredLanguage,
  })
  const messages = getMessages(language)

  const t = (
    key: string,
    values?: Record<string, string | number>,
    fallback?: string
  ) => {
    const message = getByPath(messages as Record<string, any>, key) || fallback || key
    return interpolate(message, values)
  }

  return { language, messages, t }
}
