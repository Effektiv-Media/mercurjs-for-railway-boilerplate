import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import { CartDropdown, MobileNavbar, Navbar } from "@/components/cells"
import { HeartIcon } from "@/icons"
import { listCategories } from "@/lib/data/categories"
import { PARENT_CATEGORIES } from "@/const"
import { UserDropdown } from "@/components/cells/UserDropdown/UserDropdown"
import { retrieveCustomer } from "@/lib/data/customer"
import { getUserWishlists } from "@/lib/data/wishlist"
import { Wishlist } from "@/types/wishlist"
import { Badge } from "@/components/atoms"
import CountrySelector from "@/components/molecules/CountrySelector/CountrySelector"
import { NavbarSearch } from "@/components/molecules"
import { listRegions } from "@/lib/data/regions"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { MessageButton } from "@/components/molecules/MessageButton/MessageButton"

export const Header = async () => {
  const user = await retrieveCustomer()
  let wishlist: Wishlist[] = []
  if (user) {
    const response = await getUserWishlists()
    wishlist = response.wishlists
  }

  const regions = await listRegions()

  const wishlistCount = wishlist?.[0]?.products.length || 0
  const sellerCtaHref =
    process.env.NEXT_PUBLIC_VENDOR_URL || "https://vendor.mercurjs.com"

  const { categories, parentCategories } = (await listCategories({
    headingCategories: PARENT_CATEGORIES,
  })) as {
    categories: HttpTypes.StoreProductCategory[]
    parentCategories: HttpTypes.StoreProductCategory[]
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm text-slate-900">
      <div className="px-4 lg:px-8 pt-3 pb-2">
        <div className="mx-auto max-w-[1320px] rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50/70 via-white to-cyan-50/50 shadow-[0_10px_30px_rgba(15,23,42,0.09)] ring-1 ring-slate-100">
          <div className="flex py-3 px-3 lg:px-5 items-center min-h-[76px] gap-3">
            <div className="flex items-center gap-3 shrink-0 lg:w-[260px]">
              <MobileNavbar
                parentCategories={parentCategories}
                childrenCategories={categories}
              />
              <div className="hidden lg:flex items-center">
                <LocalizedClientLink href="/" className="text-2xl font-bold">
                  <Image
                    src="/Logo.svg"
                    width={104}
                    height={36}
                    alt="Clickfynd logo"
                    priority
                  />
                </LocalizedClientLink>
              </div>
            </div>
            <div className="flex lg:hidden items-center">
              <LocalizedClientLink href="/" className="text-2xl font-bold">
                <Image
                  src="/Logo.svg"
                  width={98}
                  height={32}
                  alt="Clickfynd logo"
                  priority
                />
              </LocalizedClientLink>
            </div>
            <div className="hidden lg:block flex-1 mx-auto">
              <NavbarSearch />
            </div>
            <div className="flex items-center justify-end gap-2 lg:gap-4 w-full lg:w-[420px] py-2 text-slate-800">
              <a
                href={sellerCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex rounded-full bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
              >
                Salj med oss
              </a>
              <div className="hidden md:block">
                <CountrySelector regions={regions} />
              </div>
              <LocalizedClientLink
                href="/kontakt"
                className="hidden xl:block rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] hover:bg-slate-100"
              >
                Support
              </LocalizedClientLink>
              {user && (
                <div className="hidden sm:block">
                  <MessageButton iconColor="#0f172a" />
                </div>
              )}
              <UserDropdown user={user} iconColor="#0f172a" />
              {user && (
                <LocalizedClientLink
                  href="/user/wishlist"
                  className="relative text-slate-900 hidden sm:block"
                >
                  <HeartIcon size={20} color="#0f172a" />
                  {Boolean(wishlistCount) && (
                    <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0 bg-rose-500 text-white border-0">
                      {wishlistCount}
                    </Badge>
                  )}
                </LocalizedClientLink>
              )}

              <CartDropdown iconColor="#0f172a" />
            </div>
          </div>
        </div>
      </div>
      <Navbar categories={categories} />
    </header>
  )
}
