import { cn } from "@/lib/utils"

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
  size?: "sm" | "md" | "lg"
  style?: React.CSSProperties
}

const paddings = {
  sm: "py-16 md:py-24",
  md: "py-24 md:py-32",
  lg: "py-32 md:py-48",
}

export function Section({ children, className, id, size = "md", style }: SectionProps) {
  return (
    <section id={id} style={style} className={cn(paddings[size], className)}>
      {children}
    </section>
  )
}
