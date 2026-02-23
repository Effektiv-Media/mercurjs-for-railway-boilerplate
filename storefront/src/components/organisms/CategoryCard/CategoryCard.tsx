import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"

export function CategoryCard({
  category,
}: {
  category: { name: string; handle: string }
}) {
  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className="group relative flex flex-col items-center justify-between border border-slate-200 rounded-2xl bg-gradient-to-b from-white to-slate-50 transition-all hover:border-sky-300 hover:shadow-[0_12px_24px_rgba(2,132,199,0.16)] min-h-[220px] p-3"
    >
      <div className="flex relative aspect-square overflow-hidden w-[140px] md:w-[168px] mt-1">
        <Image
          loading="lazy"
          src={`/images/categories/${category.handle}.png`}
          alt={`category - ${category.name}`}
          width={200}
          height={200}
          sizes="(min-width: 1280px) 180px, (min-width: 768px) 140px, 38vw"
          className="object-contain scale-90 rounded-full transition-transform duration-300 group-hover:scale-95"
        />
      </div>
      <h3 className="w-full text-center text-lg md:text-xl font-semibold text-slate-900 mb-2">
        {category.name}
      </h3>
    </LocalizedClientLink>
  )
}
