import { cn } from "@/lib/utils"

type TypographyProps = {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function DisplayHeading({ children, className, style }: TypographyProps) {
  return (
    <h1
      style={style}
      className={cn(
        "font-display font-bold leading-[1.1] tracking-tight",
        "text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
        className
      )}
    >
      {children}
    </h1>
  )
}

export function Heading2({ children, className, style }: TypographyProps) {
  return (
    <h2
      style={style}
      className={cn(
        "font-display font-bold leading-tight tracking-tight",
        "text-3xl md:text-4xl lg:text-5xl",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function Heading3({ children, className, style }: TypographyProps) {
  return (
    <h3
      style={style}
      className={cn(
        "font-sans font-semibold leading-snug",
        "text-xl md:text-2xl",
        className
      )}
    >
      {children}
    </h3>
  )
}

export function BodyLarge({ children, className, style }: TypographyProps) {
  return (
    <p style={style} className={cn("text-lg md:text-xl leading-relaxed", className)}>
      {children}
    </p>
  )
}

export function Body({ children, className, style }: TypographyProps) {
  return (
    <p style={style} className={cn("text-base leading-relaxed", className)}>
      {children}
    </p>
  )
}

export function Caption({ children, className, style }: TypographyProps) {
  return (
    <p
      style={style}
      className={cn(
        "text-sm leading-normal text-[var(--color-gray-mid)]",
        className
      )}
    >
      {children}
    </p>
  )
}

export function Label({ children, className, style }: TypographyProps) {
  return (
    <span
      style={style}
      className={cn(
        "text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-blue)]",
        className
      )}
    >
      {children}
    </span>
  )
}
