import { cn } from "@/lib/utils"

import Spinner from "@/icons/spinner"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "text" | "destructive"
  size?: "small" | "large"
  loading?: boolean
}

export function Button({
  children,
  variant = "filled",
  size = "small",
  loading = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  const baseClasses =
    "text-md button-text rounded-full disabled:bg-disabled disabled:text-disabled transition-all duration-200 disabled:cursor-not-allowed font-semibold tracking-[0.03em]"

  const variantClasses = {
    filled: `bg-action text-action-on-primary hover:bg-action-hover active:bg-action-pressed ${
      loading && "button-text-filled"
    }`,
    tonal:
      "bg-action-secondary hover:bg-action-secondary-hover active:bg-action-secondary-pressed text-action-on-secondary border border-slate-200",
    text: "bg-primary hover:bg-action-secondary-hover active:bg-action-secondary-pressed text-primary",
    destructive: `text-negative-on-primary bg-negative hover:bg-negative-hover active:bg-negative-pressed ${
      loading && "button-text-filled"
    }`,
  }

  const sizeClasses = {
    small: "px-[18px] py-[9px]",
    large: "px-[24px] py-[11px]",
  }

  return (
    <button
      disabled={disabled}
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        baseClasses,
        className
      )}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}
