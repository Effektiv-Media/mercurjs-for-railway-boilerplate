import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="bg-action text-action-on-primary">
      <div className="flex items-center justify-between gap-4 py-2 lg:px-8 px-4">
        <div className="hidden md:flex items-center">
          <CategoryNavbar categories={categories} />
        </div>

        {/* Keep a smaller search in navbar for convenience on long pages */}
        <div className="hidden lg:block">
          <NavbarSearch placeholder="Sök efter produkter" />
        </div>
      </div>
    </div>
  )
}
