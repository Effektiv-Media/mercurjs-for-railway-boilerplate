import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-w-5 items-center justify-center px-2 py-1 label-sm leading-none text-white bg-rose-500 rounded-full shadow-sm font-semibold",
        className
      )}
    >
      {children}
    </span>
  )
}
