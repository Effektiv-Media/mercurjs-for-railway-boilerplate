"use client"

import { useMemo } from "react"

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const locale = useMemo(() => {
    if (typeof document === "undefined") return "en"
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1]
    return cookie === "sv" ? "sv" : "en"
  }, [])

  const copy =
    locale === "sv"
      ? { title: "Nagot gick fel!", retry: "Forsok igen" }
      : { title: "Something went wrong!", retry: "Try again" }

  return (
    <html>
      <body>
        <h2>{copy.title}</h2>
        <button onClick={() => reset()}>{copy.retry}</button>
      </body>
    </html>
  )
}
