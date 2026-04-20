import { cn } from "@/lib/utils"

type OrbitBadgeProps = {
  children: React.ReactNode
  className?: string
  variant?: "default" | "subtle" | "outline"
}

const variants = {
  default: "bg-[var(--color-blue)/15%] text-[var(--color-blue-light)] border border-[var(--color-blue)/30%]",
  subtle:  "bg-[var(--color-navy-light)] text-[var(--color-gray-mid)] border border-[var(--color-navy-light)]",
  outline: "bg-transparent text-[var(--color-blue)] border border-[var(--color-blue)/50%]",
}

export function OrbitBadge({ children, className, variant = "default" }: OrbitBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full",
        "text-xs font-medium tracking-widest uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
