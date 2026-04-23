"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

export const AnimatedLogo = ({
  className,
}: {
  className?: string
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const startTimer = window.setTimeout(() => {
      setIsAnimating(true)
    }, 180)

    const stopTimer = window.setTimeout(() => {
      setIsAnimating(false)
    }, 1900)

    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(stopTimer)
    }
  }, [])

  return (
    <LocalizedClientLink
      href="/"
      aria-label="Clickfynd"
      title="Clickfynd"
      className={clsx(
        "cf-logo",
        isMounted && "cf-logo--mounted",
        isAnimating && "cf-logo--animating",
        className
      )}
    >
      <span className="cf-logo__frame">
        <span className="cf-logo__text" aria-hidden="true">
          Clickfynd
        </span>

        <span className="cf-logo__cursor" aria-hidden="true" />
        <span className="cf-logo__burst" aria-hidden="true" />
      </span>
    </LocalizedClientLink>
  )
}