import { WishlistTabs } from "@/components/organisms"
import { getTranslations } from "next-intl/server"
import { HomeCategories } from "../HomeCategories/HomeCategories"

export const WishlistPage = async ({ tab }: { tab: string }) => {
  const t = await getTranslations("cart")

  return (
    <>
      <WishlistTabs tab={tab} />
      <HomeCategories heading={t("explore")} />
    </>
  )
}
