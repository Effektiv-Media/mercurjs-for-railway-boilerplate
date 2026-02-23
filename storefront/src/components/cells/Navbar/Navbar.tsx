import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="bg-white/80 px-3 sm:px-4 lg:px-8 pb-4 border-b border-slate-200/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="lg:hidden">
        <div className="w-full max-w-[1320px] mx-auto rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
          <NavbarSearch />
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <div className="w-full max-w-[1320px] mx-auto rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
          <CategoryNavbar categories={categories} />
        </div>
      </div>
    </div>
  )
}
