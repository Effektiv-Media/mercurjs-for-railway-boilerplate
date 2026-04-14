"use client"

import { cn } from "@/lib/utils"
import { SiKlarna, SiPaypal, SiVisa, SiMastercard } from "react-icons/si"
import { RotateCcw, Truck } from "lucide-react"
import Image from "next/image"
import Lottie from "lottie-react"
import { useEffect, useRef, useState } from "react"


export type TrustStripItem = {
  title: string
  subtitle?: string
  payments?: ("klarna" | "visa" | "mastercard" | "paypal")[]
  shipping?: ("PostNord" | "DHL" | "Schenker" | "UPS")[]
  showReturnsIcon?: boolean
}

export const TrustStrip = ({
  items,
  className,
}: {
  items: TrustStripItem[]
  className?: string
}) => {
  if (!items?.length) return null

const [truckAnimation, setTruckAnimation] = useState(null)
const lottieRef = useRef<any>(null)

useEffect(() => {
  fetch("/animations/truck.json")
    .then((res) => res.json())
    .then((data) => setTruckAnimation(data))
}, [])

useEffect(() => {
  if (lottieRef.current) {
    lottieRef.current.setSpeed(0.5)
  }
}, [truckAnimation])

  return (
    <section
      className={cn("w-full", className)}
      aria-label={items.map((item) => item.title).join(", ")}
    >
      <div className="w-full rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 text-white shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4 py-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="trust-strip-card-shimmer relative overflow-hidden flex flex-col rounded-xl bg-white/5 px-4 py-3 min-h-[92px]"
            >
              <p className="text-sm font-semibold leading-5 uppercase tracking-[0.04em]">
                {item.title}
              </p>
              {item.subtitle ? (
                <p className="text-xs text-white/85 mt-0.5">
                  {item.subtitle}
                </p>
              ) : null}
              {item.payments?.length ? (
                <div className="mt-6">
                  <div className="relative z-[1] flex flex-wrap items-center gap-6 text-white/80">
                    {item.payments.includes("klarna") ? (
                      <span className="flex items-center justify-center rounded-md border border-white/60 bg-[#FFB3C7] px-3 py-2 shadow-sm">
                        <SiKlarna className="text-2xl text-slate-900" />
                      </span>
                    ) : null}

                    {item.payments.includes("visa") ? (
                      <span className="flex items-center justify-center rounded-md border border-white/60 bg-[#1A1F71] px-3 py-2 shadow-sm">
                        <SiVisa className="text-2xl text-slate-100" />
                      </span>
                    ) : null}

                    {item.payments.includes("mastercard") ? (
                      <span className="flex items-center justify-center rounded-md border border-white/60 bg-white/95 px-1 py-2 shadow-sm">
                        <Image
                          src="/images/logos/mastercardlogo.png"
                          alt="Mastercard"
                          width={40}
                          height={24}
                          className="h-6 w-auto object-contain"
                        />
                      </span>
                    ) : null}

                    {item.payments.includes("paypal") ? (
                      <span className="flex items-center justify-center rounded-md border border-white/60 bg-white/95 px-3 py-2 shadow-sm">
                        <SiPaypal className="text-[#003087] text-2xl" />
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {item.shipping?.length ? (
                <div className="relative mt-6 pr-12">
                  <div className="pointer-events-none absolute bottom-0 right-1 trust-strip-truck-idle">
                    {truckAnimation && (
                      <Lottie
                        lottieRef={lottieRef}
                        animationData={truckAnimation}
                        loop
                        autoplay
                        className="h-24 w-24 opacity-40"
                      />
                    )}
                  </div>

                  <div className="relative z-[1] flex flex-wrap items-center gap-6">
                    {item.shipping.includes("PostNord") ? (
                      <Image
                        src="/images/logos/postnord.png"
                        alt="PostNord"
                        width={72}
                        height={20}
                        className="h-12 w-auto object-contain"
                      />
                    ) : null}

                    {item.shipping.includes("DHL") ? (
                      <Image
                        src="/images/logos/dhl.svg"
                        alt="DHL"
                        width={56}
                        height={20}
                        className="h-12 w-auto object-contain"
                      />
                    ) : null}

                    {item.shipping.includes("Schenker") ? (
                      <Image
                        src="/images/logos/schenker.webp"
                        alt="Schenker"
                        width={84}
                        height={20}
                        className="h-12 w-auto object-contain"
                      />
                    ) : null}

                    {item.shipping.includes("UPS") ? (
                      <Image
                        src="/images/logos/ups.png"
                        alt="UPS"
                        width={84}
                        height={20}
                        className="h-12 w-auto object-contain"
                      />
                    ) : null}
                  </div>
                </div>
              ) : null}

              {item.showReturnsIcon ? (
                <div className="pointer-events-none absolute right-2 bottom-4">
                  <RotateCcw
                    strokeWidth={1}
                    className="trust-strip-returns h-20 w-20 text-slate-500/40 md:text-slate-200"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}