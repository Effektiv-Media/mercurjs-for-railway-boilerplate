import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ArrowUpIcon } from "@/icons"
import { Metadata } from "next"
import { getServerI18n } from "@/lib/i18n/server"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerI18n({})
  return {
    title: "404",
    description: t("errors.pageNotFoundDescription"),
  }
}

export default async function NotFound() {
  const { t } = await getServerI18n({})

  return (
    <div className="flex flex-col gap-4 items-center justify-center py-24">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("errors.pageNotFound")}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("errors.pageNotFoundDescription")}
      </p>
      <LocalizedClientLink className="flex gap-x-1 items-center group" href="/">
        {t("errors.goToFrontpage")}
        <ArrowUpIcon
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--fg-interactive)"
        />
      </LocalizedClientLink>
    </div>
  )
}
