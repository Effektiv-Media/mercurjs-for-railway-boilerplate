"use client"

import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage"
import { isManual, isStripe } from "../../../lib/constants"
import { placeOrder } from "@/lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/atoms"
import { useTranslations } from "next-intl"


type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]
  const t = useTranslations("checkout")
  
  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
          buttonLabel={t("placeOrder")}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton 
          notReady={notReady} 
          data-testid={dataTestId}
          buttonLabel={t("placeOrder")}
        />
      )
    default:
      return (
        <Button disabled className="w-full">
          {t("selectPaymentMethod")}
        </Button>
      )
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  buttonLabel,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  buttonLabel: string
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(true)

  const onPaymentCompleted = async () => {
    try {
      const res = await placeOrder()
      if (!res.ok) {
        setErrorMessage(res.error?.message)
      }
    } catch (error: any) {
      if (error?.message !== "NEXT_REDIRECT") {
        setErrorMessage(
          error?.message?.replace("Error setting up the request: ", "")
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

  const stripe = useStripe()
  const elements = useElements()

  const session = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )

   useEffect(() => {
    setDisabled(!(stripe && elements && session?.data?.client_secret))
  }, [stripe, elements, session]) 

    const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    if (!stripe || !elements || !cart || !session?.data?.client_secret) {
      setSubmitting(false)
      return
    }

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message || null)
      setSubmitting(false)
      return
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret: session.data.client_secret as string,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name:
              (cart.billing_address?.first_name || "") +
              " " +
              (cart.billing_address?.last_name || ""),
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
        return_url: window.location.href,
      },
      redirect: "if_required",
    })

    if (error) {
      setErrorMessage(error.message || null)
      setSubmitting(false)
      return
    }

    if (
      (paymentIntent && paymentIntent.status === "requires_capture") ||
      (paymentIntent && paymentIntent.status === "succeeded") ||
      (paymentIntent && paymentIntent.status === "requires_confirmation") ||
      (paymentIntent && paymentIntent.status === "processing")
    ) {
      await onPaymentCompleted()
      return
    }

    setSubmitting(false)
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        loading={submitting}
        className="w-full"
      >
        {buttonLabel}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({
  notReady,
  buttonLabel,
}: {
  notReady: boolean
  buttonLabel: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    try {
      const res = await placeOrder()
      if (!res.ok) {
        setErrorMessage(res.error?.message)
      }
    } catch (error: any) {
      if (error?.message !== "NEXT_REDIRECT") {
        setErrorMessage(
          error?.message?.replace("Error setting up the request: ", "")
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handlePayment = () => {
    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        onClick={handlePayment}
        className="w-full"
        loading={submitting}
      >
        {buttonLabel}
      </Button>
      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton