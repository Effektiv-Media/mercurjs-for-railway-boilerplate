import Image from "next/image"

import Link from "next/link"

type HeroProps = {
  image: string
  heading: string
  paragraph: string
  buttons: { label: string; path: string }[]
}

const tiles = [
  {
    title: "Smart elektronik, lojliga priser",
    button: "Kop nu",
    path: "/categories",
    image: "/images/blog/post-1.jpg",
    accent: "from-fuchsia-800 to-fuchsia-700",
    pill: "bg-rose-100 text-fuchsia-800",
  },
  {
    title: "Smaskiga priser pa restauranger",
    button: "Kop nu",
    path: "/categories",
    image: "/images/blog/post-2.jpg",
    accent: "from-slate-900 to-slate-800",
    pill: "bg-yellow-300 text-slate-900",
  },
  {
    title: "Spaerbjudanden svara att motsta",
    button: "Kop nu",
    path: "/categories",
    image: "/images/blog/post-3.jpg",
    accent: "from-emerald-800 to-teal-700",
    pill: "bg-emerald-200 text-emerald-900",
  },
  {
    title: "Prisvarda koksredskap",
    button: "Kop nu",
    path: "/categories",
    image: "/images/banner-section/Image.jpg",
    accent: "from-teal-700 to-cyan-700",
    pill: "bg-lime-200 text-emerald-900",
  },
]

export const Hero = ({ image, heading, paragraph, buttons }: HeroProps) => {
  return (
    <section className="w-full px-4 lg:px-8 mt-3">
      <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr_1fr] gap-4">
        <article className="relative overflow-hidden rounded-3xl lg:row-span-2 min-h-[360px] lg:min-h-[760px] border-[12px] border-blue-900">
          <Image
            src={decodeURIComponent(image)}
            width={960}
            height={1120}
            alt={`Hero banner - ${heading}`}
            className="absolute inset-0 h-full w-full object-cover"
            priority
            fetchPriority="high"
            quality={70}
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/35 to-slate-950/80" />
          <div className="absolute right-4 top-4 rounded-full bg-blue-500 px-6 py-7 text-white shadow-lg">
            <p className="text-lg font-semibold">Fran</p>
            <p className="text-5xl font-extrabold leading-none">29 kr</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] drop-shadow-md">
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
                    className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-2xl font-semibold transition ${
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
            className={`relative overflow-hidden rounded-2xl min-h-[270px] lg:min-h-[370px] border-[10px] bg-gradient-to-br ${tile.accent}`}
          >
            <Image
              src={tile.image}
              width={600}
              height={640}
              alt={tile.title}
              className="absolute inset-0 h-full w-full object-cover opacity-75"
              sizes="(min-width: 1024px) 20vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/25 to-black/55" />
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
