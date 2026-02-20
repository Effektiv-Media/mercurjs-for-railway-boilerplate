import { MetadataRoute } from "next"
import { listRegions } from "@/lib/data/regions"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  )

  let locales: string[] = ["se"]
  try {
    const regions = await listRegions()
    locales = Array.from(
      new Set(
        (regions || [])
          .map(
            (region) =>
              region.countries?.map(
                (country: { iso_2?: string }) => country.iso_2
              ) || []
          )
          .flat()
          .filter(Boolean)
      )
    ) as string[]
  } catch {
    locales = ["se"]
  }

  const routes = ["", "/om-oss", "/kontakt", "/categories"]

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route ? "weekly" : "daily",
      priority: route ? 0.7 : 1,
    }))
  )
}
