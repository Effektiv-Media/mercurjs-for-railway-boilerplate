import Image from "next/image"

import Link from "next/link"
import { getTranslations } from "next-intl/server"
import button from "@medusajs/icons/dist/components/button"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

export const Hero = async ({ image, heading, paragraph, buttons }: HeroProps) => {
  const t = await getTranslations("pages.home")
    const tiles = [
    {
      title: t("heroTileElectronics"),
      button: t("heroTileButton"),
      path: "/kategorier",
      image: "/images/blog/post-9.png",
      accent: "from-blue-900/35 via-sky-700/15 to-slate-950/20",
      pill: "bg-blue-100 text-blue-800",
      border: "border-blue-200",
    },
    {
      title: t("heroTileFlashDeals"),
      button: t("heroTileButton"),
      path: "/kategorier",
      image: "/images/blog/post-5.jpeg",
      accent: "from-amber-300/18 via-yellow-300/10 to-slate-950/20",
      pill: "bg-yellow-300 text-slate-900",
      border: "border-yellow-300",
    },
    {
      title: t("heroTileOffers"),
      button: t("heroTileButton"),
      path: "/kategorier",
      image: "/images/blog/post-10.jpeg",
      accent: "from-rose-300/20 via-pink-300/10 to-slate-950/20",
      pill: "bg-rose-100 text-rose-800",
      border: "border-rose-200",
    },
    {
      title: t("heroTileKitchen"),
      button: t("heroTileButton"),
      path: "/kategorier",
      image: "/images/blog/post-7.jpg",
      accent: "from-stone-300/18 via-zinc-200/10 to-slate-950/20",
      pill: "bg-stone-200 text-stone-900",
      border: "border-stone-300",
    },
  ]

  return (
    <section className="w-full px-4 lg:px-8 mt-3">
      <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr_1fr] gap-4">
        <article className="relative overflow-hidden rounded-3xl lg:row-span-2 min-h-[320px] sm:min-h-[390px] lg:min-h-[760px] border-[12px] border-blue-900">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={decodeURIComponent(image)}
            className="absolute inset-0 h-full w-full object-cover object-[2%_center] sm:object-[5%_center]"
          >
            <source src="/videos/hero/herovideo-optimized.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/30 to-slate-950/25" />
          <div className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full bg-blue-500 px-4 py-4 sm:px-6 sm:py-7 text-white shadow-lg z-10 max-w-[140px] sm:max-w-none">
            <p className="text-lg font-semibold">{t("heroPriceFrom")}</p>
            <p className="text-4xl sm:text-5xl font-extrabold leading-none">
              {t("heroPriceValue")}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 pt-24 sm:pt-20 lg:p-8 text-white">
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] drop-shadow-md">
              {heading}
            </h2>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/95">
              {paragraph}
            </p>
            {buttons.length > 0 ? (
              <div className="mt-7 flex flex-wrap gap-3">
                {buttons.map(({ label, path }, index) => (
                  <Link
                    key={path}
                    href={path}
                    className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-xl sm:text-2xl font-semibold transition ${
                      index === 0
                        ? "bg-blue-500 text-white hover:bg-blue-400"
                        : "border border-white/70 bg-white/10 text-white hover:bg-white/20"
                    }`}
                    aria-label={label}
                    title={label}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </article>

        {tiles.map((tile) => (
          <article
            key={tile.title}
            className={`relative overflow-hidden rounded-2xl min-h-[270px] lg:min-h-[370px] border-[10px] ${tile.border} bg-gradient-to-br ${tile.accent}`}
          >
            <Image
              src={tile.image}
              width={900}
              height={960}
              alt={tile.title}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 30vw, 50vw"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-b ${tile.accent}`}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="heading-md !text-white max-w-[18ch] leading-tight">
                {tile.title}
              </h3>
              <Link
                href={tile.path}
                className={`mt-3 inline-flex rounded-full px-6 py-2.5 text-xl font-semibold ${tile.pill}`}
              >
                {tile.button}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}