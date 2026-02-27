"use client"

import {
  Badge,
  Divider,
  LogoutButton,
  NavigationItem,
} from "@/components/atoms"
import { Dropdown } from "@/components/molecules"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ProfileIcon } from "@/icons"
import { HttpTypes } from "@medusajs/types"
import { useUnreads } from "@talkjs/react"
import { useState } from "react"
import { useTranslations } from "next-intl"

export const UserDropdown = ({
  user,
  iconColor = "#090909",
}: {
  user: HttpTypes.StoreCustomer | null
  iconColor?: string
}) => {
  const t = useTranslations("userMenu")
  const [open, setOpen] = useState(false)

  const unreads = useUnreads()

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
    >
      <LocalizedClientLink
        href="/user"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label={t("goToProfile")}
      >
        <ProfileIcon size={20} color={iconColor} />
      </LocalizedClientLink>
      <Dropdown show={open}>
        {user ? (
          <div className="p-1">
            <div className="lg:w-[200px]">
              <h3 className="uppercase heading-xs border-b p-4">
                {t("yourAccount")}
              </h3>
            </div>
            <NavigationItem href="/user/orders">{t("orders")}</NavigationItem>
            <NavigationItem href="/user/messages" className="relative">
              {t("messages")}
              {Boolean(unreads?.length) && (
                <Badge className="absolute top-3 left-24 w-4 h-4 p-0">
                  {unreads?.length}
                </Badge>
              )}
            </NavigationItem>
            <NavigationItem href="/user/returns">{t("returns")}</NavigationItem>
            <NavigationItem href="/user/addresses">
              {t("addresses")}
            </NavigationItem>
            <NavigationItem href="/user/reviews">{t("reviews")}</NavigationItem>
            <NavigationItem href="/user/wishlist">
              {t("wishlist")}
            </NavigationItem>
            <Divider />
            <NavigationItem href="/user/settings">
              {t("settings")}
            </NavigationItem>
            <LogoutButton />
          </div>
        ) : (
          <div className="p-1">
            <NavigationItem href="/user">{t("login")}</NavigationItem>
            <NavigationItem href="/user/register">{t("register")}</NavigationItem>
          </div>
        )}
      </Dropdown>
    </div>
  )
}
