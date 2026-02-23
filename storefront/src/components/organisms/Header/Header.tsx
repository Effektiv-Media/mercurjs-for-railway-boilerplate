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
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/80 text-slate-900 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="px-3 sm:px-4 lg:px-8 py-3">
        <div className="mx-auto max-w-[1320px] rounded-2xl border border-slate-200 bg-gradient-to-r from-white via-white to-slate-50 shadow-sm">
          <div className="flex flex-wrap px-3 py-2.5 lg:px-5 lg:py-3 items-center min-h-[72px] gap-x-3 gap-y-2">
            {/* Logo + hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <MobileNavbar
                parentCategories={parentCategories}
                childrenCategories={categories}
              />
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

            {/* Desktop search – grows to fill available space */}
            <div className="hidden lg:block flex-1">
              <NavbarSearch />
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-4 ml-auto shrink-0 py-1 text-slate-900">
              <a
                href={sellerCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex h-10 items-center whitespace-nowrap rounded-full border border-fuchsia-200 bg-white/90 px-4 text-sm font-semibold text-fuchsia-800 transition-colors hover:bg-fuchsia-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Bli säljare
              </a>
              <div className="hidden md:block">
                <CountrySelector regions={regions} />
              </div>
              <LocalizedClientLink
                href="/kontakt"
                className="hidden xl:inline-flex h-10 items-center rounded-full border border-slate-300 bg-white/70 px-3 text-xs font-semibold uppercase tracking-[0.06em] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
                  className="relative hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
