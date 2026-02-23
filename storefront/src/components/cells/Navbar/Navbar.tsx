import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-[1320px] px-4 lg:px-8">
        <div className="lg:hidden py-3">
          <NavbarSearch />
        </div>
        <div className="hidden lg:block">
          <CategoryNavbar categories={categories} />
        </div>
      </div>
    </div>
  )
}
