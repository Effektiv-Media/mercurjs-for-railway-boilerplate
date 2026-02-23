import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { ArrowRightIcon } from "@/icons"
import { Style } from "@/types/styles"

export const styles: Style[] = [
  {
    id: 1,
    name: "LUXURY",
    href: "/collections/luxury",
  },
  {
    id: 2,
    name: "VINTAGE",
    href: "/collections/vintage",
  },
  {
    id: 3,
    name: "CASUAL",
    href: "/collections/casual",
  },
  {
    id: 4,
    name: "STREETWEAR",
    href: "/collections/streetwear",
  },
  {
    id: 5,
    name: "Y2K",
    href: "/collections/y2k",
  },
]

export function ShopByStyleSection() {
  return (
    <section className="container">
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-7 md:px-8 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
        <h2 className="heading-lg text-slate-900 mb-8">SHOP BY STYLE</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5">
          <div className="py-3 md:py-6 md:px-3 h-full">
          {styles.map((style) => (
            <LocalizedClientLink
              key={style.id}
              href={style.href}
              className="group flex items-center gap-4 text-slate-700 hover:text-sky-700 transition-colors w-fit pb-2 mb-5"
            >
              <span className="heading-lg">{style.name}</span>
              <ArrowRightIcon className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </LocalizedClientLink>
          ))}
          </div>
          <div className="relative hidden lg:block rounded-2xl overflow-hidden border border-slate-200">
            <Image
              loading="lazy"
              fetchPriority="high"
              src="/images/shop-by-styles/Image.jpg"
              alt="Models showcasing luxury fashion styles"
              width={700}
              height={600}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
