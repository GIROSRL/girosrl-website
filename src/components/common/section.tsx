import { cn } from "@/lib/utils"

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
  size?: "sm" | "md" | "lg"
  style?: React.CSSProperties
}

// Mobile paddings piu\u0300 compatti — su 375px il 48vh di padding risultava
// eccessivo. Ora ~56-80-112px su mobile, invariati su desktop.
const paddings = {
  sm: "py-14 md:py-24",
  md: "py-20 md:py-32",
  lg: "py-28 md:py-48",
}

export function Section({ children, className, id, size = "md", style }: SectionProps) {
  return (
    <section id={id} style={style} className={cn(paddings[size], className)}>
      {children}
    </section>
  )
}
