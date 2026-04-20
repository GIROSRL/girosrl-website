import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge, Heading2 } from "@/components/common/typography"
import { GiroButton } from "@/components/common/giro-button"
import { Magnetic } from "@/components/common/magnetic"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"
import { AuroraBackground } from "@/components/common/aurora-background"
import { paths } from "@/content/paths"
import { getAreaBySlug } from "@/content/services"

export const metadata: Metadata = {
  title: "Percorsi — Tre porte d'ingresso",
  description:
    "Parti, Cresci, Trasforma. Tre percorsi integrati che combinano le nostre aree di servizio per rispondere al momento di vita della tua azienda.",
}

export default function PercorsiHubPage() {
  return (
    <main className="flex flex-col">
      <AuroraBackground accent="#3a8fe8" />
      <Section size="lg">
        <Container>
          <BreadcrumbNav
            items={[{ label: "Home", href: "/" }, { label: "Percorsi" }]}
          />
          <Label className="mb-4 text-[var(--color-blue)]">
            Il tuo percorso con GIRO
          </Label>
          <AnimatedHeadline
            text="Parti. Cresci. Trasforma."
            fontSize={104}
            tag="h1"
            className="mb-4"
          />
          <BodyLarge className="max-w-2xl text-[var(--color-gray-mid)] mb-8">
            Ogni percorso combina più aree di servizio in un&apos;offerta
            coerente, pensata per un momento specifico della vita della tua
            azienda.
          </BodyLarge>
        </Container>
      </Section>

      {/* Comparatore 3 colonne */}
      <Section size="md" className="pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {paths.map((path, idx) => (
              <PercorsoColumn key={path.slug} path={path} highlight={idx === 1} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Non sai scegliere? */}
      <Section size="lg" className="relative">
        <Container>
          <div className="relative rounded-3xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/50 p-10 md:p-16 text-center overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(58,143,232,0.2) 0%, transparent 60%)",
              }}
            />
            <div className="relative">
              <Label className="mb-4 text-[var(--color-blue)]">
                Non sai da dove partire?
              </Label>
              <Heading2 className="mb-6 max-w-3xl mx-auto">
                Una call gratuita ti fa capire{" "}
                <em className="not-italic text-[var(--color-blue)]">
                  quale percorso ha più senso per te.
                </em>
              </Heading2>
              <p className="max-w-xl mx-auto text-base md:text-lg text-[var(--color-gray-mid)] mb-10">
                In 30 minuti capiamo insieme dove sei, cosa ti serve, e quale
                percorso (o mix) ha più ROI per il tuo business specifico.
              </p>
              <Magnetic>
                <GiroButton
                  variant="primary"
                  size="lg"
                  href="/contatti?subject=Aiutami%20a%20scegliere%20il%20percorso%20giusto"
                >
                  Aiutami a scegliere il percorso giusto
                </GiroButton>
              </Magnetic>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}

function PercorsoColumn({
  path,
  highlight,
}: {
  path: (typeof paths)[number]
  highlight?: boolean
}) {
  return (
    <Link
      href={path.href}
      className="group relative block rounded-2xl border bg-[var(--color-navy-mid)]/40 p-7 md:p-8 hover:-translate-y-1 transition-all duration-500"
      style={{
        borderColor: highlight
          ? "var(--color-blue-dark)"
          : "var(--color-navy-light)",
      }}
    >
      {highlight && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ background: "var(--color-blue)", color: "#0d1424" }}
        >
          Più richiesto
        </div>
      )}

      {/* Title */}
      <div className="font-display text-4xl md:text-5xl font-bold mb-2 text-[var(--fg)]">
        {path.title}
      </div>
      <div className="text-xs tracking-widest uppercase text-[var(--color-blue-light)] font-semibold mb-5">
        {path.tagline}
      </div>
      <p className="text-sm text-[var(--color-gray-mid)] leading-relaxed mb-6">
        {path.description}
      </p>

      {/* Budget + durata */}
      <div className="space-y-1 mb-6 pb-6 border-b border-[var(--color-navy-light)]">
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-[var(--color-gray-mid)] uppercase tracking-wider">
            Budget
          </span>
          <span className="text-[var(--fg)] font-semibold">{path.budgetIndicativo}</span>
        </div>
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-[var(--color-gray-mid)] uppercase tracking-wider">
            Durata
          </span>
          <span className="text-[var(--fg)] font-semibold">{path.durataIndicativa}</span>
        </div>
      </div>

      {/* Aree coinvolte — pill color-coded */}
      <div className="mb-6">
        <div className="text-[10px] tracking-widest uppercase text-[var(--color-gray-mid)] mb-3">
          Aree coinvolte
        </div>
        <div className="flex flex-wrap gap-1.5">
          {path.aree.map((slug) => {
            const area = getAreaBySlug(slug)
            if (!area) return null
            return (
              <span
                key={slug}
                className="text-xs px-2.5 py-1 rounded-full border font-medium"
                style={{
                  color: area.color,
                  borderColor: `${area.color}55`,
                  background: `${area.color}10`,
                }}
              >
                {area.title}
              </span>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[var(--color-blue-light)] group-hover:text-[var(--color-blue)]">
        <span>Scopri {path.title}</span>
        <svg width="14" height="9" viewBox="0 0 16 10" fill="none" aria-hidden>
          <path
            d="M1 5 H14 M10 1 L14 5 L10 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  )
}
