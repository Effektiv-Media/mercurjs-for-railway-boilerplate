import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import Image from "next/image"

export const BannerSection = () => {
  return (
    <section className="container text-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center rounded-3xl border border-slate-200 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.05)] overflow-hidden">
        <div className="py-6 px-6 md:px-8 flex flex-col h-full justify-between">
          <div className="mb-8 lg:mb-24">
            <span className="text-xs inline-block px-3 py-1 border border-sky-300 bg-sky-50 text-sky-700 rounded-full font-semibold uppercase tracking-[0.08em]">
              #COLLECTION
            </span>
            <h2 className="display-sm text-slate-900 mt-3">
              BOHO VIBES: WHERE COMFORT MEETS CREATIVITY
            </h2>
            <p className="text-lg text-slate-600 max-w-lg mt-2">
              Discover boho styles that inspire adventure and embrace the beauty
              of the unconventional.
            </p>
          </div>
          <LocalizedClientLink href="/collections/boho">
            <Button size="large" className="w-fit bg-sky-700 text-white">
              EXPLORE
            </Button>
          </LocalizedClientLink>
        </div>
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full flex justify-end">
          <Image
            loading="lazy"
            fetchPriority="high"
            src="/images/banner-section/Image.jpg"
            alt="Boho fashion collection - Model wearing a floral dress with yellow boots"
            width={700}
            height={600}
            className="object-cover object-top h-full w-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
