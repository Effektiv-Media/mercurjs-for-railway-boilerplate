"use client"

import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, HeaderCategoryNavbar, NavbarSearch } from "@/components/molecules"
import { CloseIcon, HamburgerMenuIcon } from "@/icons"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslations } from "next-intl"

export const MobileNavbar = ({
  childrenCategories,
  parentCategories,
}: {
  childrenCategories: HttpTypes.StoreProductCategory[]
  parentCategories: HttpTypes.StoreProductCategory[]
}) => {
  const t = useTranslations("mobileNav")
  const [openMenu, setOpenMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  const closeMenuHandler = () => {
    setOpenMenu(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!openMenu) return

    const currentOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = currentOverflow
    }
  }, [openMenu])

  return (
    <div className="shrink-0">
      <button
        type="button"
        onClick={() => setOpenMenu(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-100"
        aria-label={t("openMenu")}
      >
        <HamburgerMenuIcon color="#0f172a" />
      </button>
      {mounted && openMenu
        ? createPortal(
            <div className="fixed inset-0 z-[100]">
              <button
                type="button"
                className="absolute inset-0 bg-slate-900/40"
                onClick={closeMenuHandler}
                aria-label={t("closeMenuOverlay")}
              />
              <aside className="absolute left-0 top-0 h-full w-[86%] max-w-[360px] bg-white text-slate-900 shadow-xl px-4 py-5 overflow-y-auto border-r border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {t("menu")}
                  </p>
                  <button
                    type="button"
                    onClick={closeMenuHandler}
                    className="inline-flex items-center justify-center rounded-full p-1 hover:bg-slate-100"
                    aria-label={t("closeMenu")}
                  >
                    <CloseIcon size={22} color="#64748b" />
                  </button>
                </div>
                <div className="mt-4">
                  <NavbarSearch />
                </div>
                <a
                  href={process.env.NEXT_PUBLIC_VENDOR_URL || "https://vendor.mercurjs.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-sm font-semibold text-fuchsia-800 hover:bg-fuchsia-100 transition-colors"
                >
                  {t("becomeSeller")}
                </a>
                <div className="mt-5">
                  <HeaderCategoryNavbar
                    onClose={closeMenuHandler}
                    categories={parentCategories}
                  />
                </div>
                <div className="mt-2 border-t border-slate-100 pt-2">
                  <CategoryNavbar
                    onClose={closeMenuHandler}
                    categories={childrenCategories}
                  />
                </div>
              </aside>
            </div>,
            document.body
          )
        : null}
    </div>
  )
}
