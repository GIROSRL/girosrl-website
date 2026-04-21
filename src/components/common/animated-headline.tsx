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
    // Cap inferiore 2rem (32px) per device stretti (es. iPhone SE 375px)
    // Mantiene leggibilita\u0300 su titoli lunghi senza troncamento orizzontale
    fontSize: `clamp(2rem, ${Math.max(4, fontSize / 14)}vw + 1rem, ${fontSize}px)`,
    fontWeight,
    lineHeight: 1.05,
    letterSpacing: "-0.035em", // Inter Tight display: tracking molto stretto
    color: color ?? "var(--fg)",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  }

  // Whitespace text node (nbsp) dentro ogni span tranne l'ultimo:
  // - visivamente collassa con margin-right (inline-block) → zero impatto UI
  // - entra nel DOM textContent → Google/screen-reader leggono "Un solo partner"
  //   invece di "Unsolopartner"
  // Da qui via aria-label/aria-hidden duplicati (il testo ora e\u0300 leggibile).
  const last = words.length - 1
  return (
    <Tag className={cn(className)} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="animated-headline-word inline-block"
          style={{
            animationDelay: `${delay + i * stagger}s`,
            marginRight: i < last ? "0.28em" : 0,
          }}
        >
          {word}
          {i < last ? "\u00a0" : ""}
        </span>
      ))}
    </Tag>
  )
}
