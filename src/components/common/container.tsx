import { cn } from "@/lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const sizes = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
}

export function Container({ children, className, size = "xl" }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 md:px-8 lg:px-12", sizes[size], className)}>
      {children}
    </div>
  )
}
