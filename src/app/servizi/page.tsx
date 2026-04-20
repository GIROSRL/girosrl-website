import type { Metadata } from "next"
import Link from "next/link"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge } from "@/components/common/typography"
import { GiroButton } from "@/components/common/giro-button"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"
import { AuroraBackground } from "@/components/common/aurora-background"
import { GlowCard } from "@/components/ui/spotlight-card"
import { serviceAreas } from "@/content/services"
import { paths } from "@/content/paths"
import type { AreaSlug } from "@/types/content"

/** Hue HSL approssimativo per ogni area — usato dal GlowCard per il bordo luminoso. */
const AREA_HUE: Record<AreaSlug, number> = {
  strategia: 210,
  sviluppo: 170,
  intelligenza: 260,
  brand: 350,
  marketing: 43,
}

export const metadata: Metadata = {
  title: "Servizi — 5 aree, un solo partner",
  description:
    "Strategia, Sviluppo, Intelligenza AI, Brand, Marketing. Cinque direzioni che ruotano attorno al tuo progetto, con un solo interlocutore competente.",
}

export default function ServiziHubPage() {
  return (
    <main className="flex flex-col">
      <AuroraBackground accent="#3a8fe8" />
      <Section size="lg">
        <Container>
          <BreadcrumbNav
            items={[
              { label: "Home", href: "/" },
              { label: "Servizi" },
            ]}
          />
          <Label className="mb-4 text-[var(--color-blue)]">
            Aree di servizio
          </Label>
          <AnimatedHeadline
            text="Un solo partner. Infinite direzioni."
            fontSize={104}
            tag="h1"
            className="mb-4"
          />
          <BodyLarge className="max-w-2xl text-[var(--color-gray-mid)] mb-12">
            Ogni area è un pianeta nella tua orbita. Insieme diventano un
            sistema: un solo interlocutore per tutta la trasformazione digitale.
          </BodyLarge>
        </Container>
      </Section>

      {/* Grid 5 aree con accent color dinamico */}
      <Section size="md" className="pt-0">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {serviceAreas.map((area) => (
              <GlowCard
                key={area.slug}
                customSize
                hue={AREA_HUE[area.slug]}
                spread={60}
                radius={18}
                border={1.5}
                className="group transition-transform duration-500 hover:-translate-y-1 bg-[var(--color-navy-mid)]/70 backdrop-blur-sm"
              >
                <Link
                  href={area.href}
                  className="block p-7 rounded-[inherit] relative overflow-hidden"
                  style={{ "--area-color": area.color } as React.CSSProperties}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${area.color}22, transparent 70%)`,
                    }}
                  />
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full mb-6 relative"
                      style={{
                        background: `radial-gradient(circle, ${area.color}, ${area.color}44 70%, transparent)`,
                        boxShadow: `0 0 24px ${area.color}44`,
                      }}
                    />
                    <h3 className="font-display font-bold text-xl md:text-2xl mb-2 leading-tight">
                      {area.title}
                    </h3>
                    <p
                      className="text-xs tracking-widest uppercase font-medium mb-4"
                      style={{ color: area.color }}
                    >
                      {area.tagline}
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--color-gray-mid)] mb-5">
                      {area.description}
                    </p>
                    <ul className="space-y-1.5 mb-6">
                      {area.items.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="text-xs text-[var(--color-gray-mid)] flex items-start gap-2"
                        >
                          <span style={{ color: area.color }}>·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                      {area.items.length > 3 && (
                        <li className="text-xs text-[var(--color-gray-mid)] opacity-70">
                          +{area.items.length - 3} altri
                        </li>
                      )}
                    </ul>
                    <div
                      className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase"
                      style={{ color: area.color }}
                    >
                      <span>Scopri</span>
                      <svg
                        width="16"
                        height="10"
                        viewBox="0 0 16 10"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M1 5 H14 M10 1 L14 5 L10 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </GlowCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Teaser Percorsi */}
      <Section size="lg" className="relative overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-12 gap-8 items-end mb-12">
            <div className="md:col-span-7">
              <Label className="mb-4 text-[var(--color-blue)]">
                Oppure scegli un percorso
              </Label>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1]">
                Tre porte d&apos;ingresso.{" "}
                <em className="not-italic text-[var(--color-blue)]">
                  Infinite possibilità.
                </em>
              </h2>
            </div>
            <div className="md:col-span-5 md:text-right">
              <GiroButton variant="outline" href="/percorsi">
                Confronta i percorsi →
              </GiroButton>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paths.map((path) => (
              <Link
                key={path.slug}
                href={path.href}
                className="group block p-6 rounded-xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/50 hover:border-[var(--color-blue-dark)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="font-display text-3xl font-bold mb-2 text-[var(--color-blue-light)]">
                  {path.title}
                </div>
                <div className="text-xs tracking-widest uppercase text-[var(--color-gray-mid)] mb-3">
                  {path.tagline}
                </div>
                <p className="text-sm text-[var(--color-gray-mid)] mb-4 line-clamp-3">
                  {path.description}
                </p>
                <span className="text-xs uppercase tracking-wider text-[var(--color-blue-light)] group-hover:text-[var(--color-blue)] transition-colors">
                  Scopri →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  )
}
