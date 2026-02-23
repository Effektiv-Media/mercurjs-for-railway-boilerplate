import { CategoryCard } from "@/components/organisms"

export const categories: { id: number; name: string; handle: string }[] = [
  {
    id: 1,
    name: "Sneakers",
    handle: "sneakers",
  },
  {
    id: 2,
    name: "Sandals",
    handle: "sandals",
  },
  {
    id: 3,
    name: "Boots",
    handle: "boots",
  },
  {
    id: 4,
    name: "Sport",
    handle: "sport",
  },
  {
    id: 5,
    name: "Accessories",
    handle: "accessories",
  },
]

export const HomeCategories = async ({ heading }: { heading: string }) => {
  return (
    <section className="w-full rounded-3xl border border-slate-200 bg-white p-5 md:p-7 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="heading-lg text-slate-900 uppercase">{heading}</h2>
        <p className="hidden md:block text-sm text-slate-500">
          Utvalda kategorier for snabb navigering
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
