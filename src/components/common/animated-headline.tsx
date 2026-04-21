import { cn } from "@/lib/utils"

type Tag = "h1" | "h2" | "h3" | "p"

type AnimatedHeadlineProps = {
  /** Testo del titolo (unico — niente cicli: SEO-first) */
  text: string
  /** Tag semantico (default h1) */
  tag?: Tag
  /** Dimensione base in px — usata come cap di un clamp() fluid */
  fontSize?: number
  /** Peso font (default 700 Playfair bold) */
  fontWeight?: number
  /** Colore testo (CSS value). Default var(--fg) */
  color?: string
  /** Delay iniziale in secondi prima dello stagger */
  delay?: number
  /** Gap di stagger fra parole, in secondi (default 0.08) */
  stagger?: number
  className?: string
}

/**
 * Hero heading con reveal word-by-word (fade + slide-up).
 * Sostituisce VaporizeHeading: preserva font Playfair reale, SEO-first.
 *
 * Implementazione CSS-only (niente JS runtime): ogni parola è uno span con
 * `animation-delay` incrementale e fill-mode `both` → stato finale stabile.
 * Rispetta `prefers-reduced-motion` via media query nel keyframe.
 */
export function AnimatedHeadline({
  text,
  tag = "h1",
  fontSize = 88,
  fontWeight = 700,
  color,
  delay = 0,
  stagger = 0.08,
  className,
}: AnimatedHeadlineProps) {
  const words = text.split(/\s+/).filter(Boolean)
  const Tag = tag

  const style: React.CSSProperties = {
    fontFamily: "var(--font-display), 'Helvetica Neue', Arial, sans-serif",
    fontSize: `clamp(2.5rem, ${Math.max(4, fontSize / 14)}vw + 1.5rem, ${fontSize}px)`,
    fontWeight,
    lineHeight: 1.02,
    letterSpacing: "-0.035em", // Inter Tight display: tracking molto stretto
    color: color ?? "var(--fg)",
  }

  return (
    <Tag className={cn(className)} style={style} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="animated-headline-word inline-block mr-[0.28em]"
          style={{ animationDelay: `${delay + i * stagger}s` }}
        >
          {word}
        </span>
      ))}
    </Tag>
  )
}
