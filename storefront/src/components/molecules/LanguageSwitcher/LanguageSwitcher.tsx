"use client"

import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

const ONE_YEAR = 60 * 60 * 24 * 365

export const LanguageSwitcher = () => {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("language")

  const setLanguage = (language: "en" | "sv") => {
    document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=${ONE_YEAR}; samesite=lax`
    router.refresh()
  }

  return (
    <div
      className="hidden md:inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white p-1"
      aria-label={t("label")}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
          locale === "en"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        {t("english")}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("sv")}
        className={`rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
          locale === "sv"
            ? "bg-slate-900 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        {t("swedish")}
      </button>
    </div>
  )
}
