"use client"

import { useEffect } from "react"

const VISITOR_KEY_STORAGE = "clickfynd_visitor_key"

const getVisitorKey = () => {
  const existing = window.localStorage.getItem(VISITOR_KEY_STORAGE)

  if (existing) {
    return existing
  }

  const created =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `visitor_${Date.now()}_${Math.random().toString(36).slice(2)}`

  window.localStorage.setItem(VISITOR_KEY_STORAGE, created)
  return created
}

export const ProductViewTracker = ({
  productId,
}: {
  productId: string
}) => {
  useEffect(() => {
    if (!productId) {
      return
    }

    const visitorKey = getVisitorKey()
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

    if (!backendUrl || !publishableKey) {
      return
    }

    fetch(`${backendUrl}/store/products/${productId}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key": publishableKey,
      },
      body: JSON.stringify({
        visitor_key: visitorKey,
      }),
      cache: "no-store",
    }).catch(() => {
      // Ignore tracking failures in UI
    })
  }, [productId])

  return null
}