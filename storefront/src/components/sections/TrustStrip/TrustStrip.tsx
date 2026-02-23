import { cn } from "@/lib/utils"

export type TrustStripItem = {
  title: string
  subtitle?: string
}

export const TrustStrip = ({
  items,
  className,
}: {
  items: TrustStripItem[]
  className?: string
}) => {
  if (!items?.length) return null

  return (
    <section className={cn("w-full", className)} aria-label="Trust">
      <div className="w-full rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 text-white shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 py-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-xl bg-white/5 px-3 py-2"
            >
              <p className="text-sm font-semibold leading-5 uppercase tracking-[0.04em]">
                {item.title}
              </p>
              {item.subtitle ? (
                <p className="text-xs text-white/85 mt-0.5">
                  {item.subtitle}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
