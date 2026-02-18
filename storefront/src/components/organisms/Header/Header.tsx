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
import { listRegions } from "@/lib/data/regions"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { MessageButton } from "@/components/molecules/MessageButton/MessageButton"
import { SellNowButton } from "@/components/cells/SellNowButton/SellNowButton"
import { HeaderSearch } from "@/components/molecules"

export const Header = async () => {
  const user = await retrieveCustomer()
  let wishlist: Wishlist[] = []
  if (user) {
    const response = await getUserWishlists()
    wishlist = response.wishlists
  }

  const regions = await listRegions()

  const wishlistCount = wishlist?.[0]?.products.length || 0

  const { categories, parentCategories } = (await listCategories({
    headingCategories: PARENT_CATEGORIES,
  })) as {
    categories: HttpTypes.StoreProductCategory[]
    parentCategories: HttpTypes.StoreProductCategory[]
  }

  return (
    <header className="sticky top-0 z-50 bg-primary">
      {/* Top bar */}
      <div className="border-b">
        <div className="flex items-center justify-between gap-3 py-2 lg:px-8 px-4">
          <div className="flex items-center gap-3">
            <MobileNavbar
              parentCategories={parentCategories}
              childrenCategories={categories}
            />
            <div className="hidden lg:block">
              <SellNowButton />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:support@clickfynd.se"
              className="hidden md:inline text-sm text-secondary hover:underline"
            >
              Kundservice
            </a>
            <CountrySelector regions={regions} />
            {user && <MessageButton />}
            <UserDropdown user={user} />
            {user && (
              <LocalizedClientLink href="/user/wishlist" className="relative">
                <HeartIcon size={20} />
                {Boolean(wishlistCount) && (
                  <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0">
                    {wishlistCount}
                  </Badge>
                )}
              </LocalizedClientLink>
            )}
            <CartDropdown />
          </div>
        </div>
      </div>

      {/* Brand + search row */}
      <div className="bg-action">
        <div className="lg:px-8 px-4 py-3">
          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_180px] gap-3 items-center">
            <LocalizedClientLink href="/" className="font-bold">
              <Image
                src="/Logo.svg"
                width={126}
                height={40}
                alt="Logo"
                priority
              />
            </LocalizedClientLink>

            <HeaderSearch />

            <div className="hidden lg:flex justify-end">
              <LocalizedClientLink
                href="/cart"
                className="inline-flex items-center rounded-sm bg-white/10 text-action-on-primary px-3 py-2 text-sm font-semibold hover:bg-white/15 transition"
              >
                Till kassan
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>

      <Navbar categories={categories} />
    </header>
  )
}
