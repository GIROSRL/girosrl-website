import type { Metadata } from "next"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import {
  DisplayHeading,
  Heading2,
  Heading3,
  BodyLarge,
  Body,
  Caption,
  Label,
} from "@/components/common/typography"
import { GiroButton } from "@/components/common/giro-button"
import { GiroCard } from "@/components/common/giro-card"
import { OrbitBadge } from "@/components/common/orbit-badge"
import { AnimatedLink } from "@/components/common/animated-link"
import { Magnetic } from "@/components/common/magnetic"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
}

function DSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-blue)]">
          {title}
        </span>
        <div className="flex-1 h-px bg-[var(--color-navy-light)]" />
      </div>
      {children}
    </div>
  )
}

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--color-navy-light)] py-8">
        <Container>
          <div className="flex items-center justify-between">
            <div>
              <Label>Pagina interna</Label>
              <h1 className="text-2xl font-bold mt-2">GI.R.O. SRL — Design System</h1>
            </div>
            <OrbitBadge variant="subtle">v1.0 · Fase 1</OrbitBadge>
          </div>
        </Container>
      </div>

      <Section>
        <Container>

          {/* ── PALETTE ── */}
          <DSSection title="Palette cromatica">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { name: "Navy",        hex: "#080d1a", var: "--color-navy",        light: false },
                { name: "Navy Mid",    hex: "#0d1424", var: "--color-navy-mid",    light: false },
                { name: "Navy Light",  hex: "#1a2a4a", var: "--color-navy-light",  light: false },
                { name: "Blue Dark",   hex: "#1a5faa", var: "--color-blue-dark",   light: false },
                { name: "Brand Blue",  hex: "#3a8fe8", var: "--color-blue",        light: false },
                { name: "Blue Light",  hex: "#5bb3f0", var: "--color-blue-light",  light: false },
                { name: "Blue Pale",   hex: "#7ec0f0", var: "--color-blue-pale",   light: false },
                { name: "Blue Ghost",  hex: "#b8cfe8", var: "--color-blue-ghost",  light: true  },
                { name: "Blue Ice",    hex: "#e6f1fb", var: "--color-blue-ice",    light: true  },
                { name: "Off White",   hex: "#f4f7fc", var: "--color-off-white",   light: true  },
              ].map((swatch) => (
                <div key={swatch.hex} className="rounded-lg overflow-hidden border border-[var(--color-navy-light)]">
                  <div
                    className="h-16"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <div className="p-3 bg-[var(--color-navy-mid)]">
                    <p className="text-xs font-semibold text-[var(--fg)]">{swatch.name}</p>
                    <p className="text-[10px] font-mono text-[var(--color-gray-mid)] mt-0.5">{swatch.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </DSSection>

          {/* ── TYPOGRAPHY ── */}
          <DSSection title="Tipografia">
            <div className="space-y-10 p-8 rounded-xl bg-[var(--color-navy-mid)] border border-[var(--color-navy-light)]">
              <div>
                <Caption className="mb-3">Display — Inter Tight 800 · H1</Caption>
                <DisplayHeading>Un solo partner. Infinite direzioni.</DisplayHeading>
              </div>
              <Separator className="bg-[var(--color-navy-light)]" />
              <div>
                <Caption className="mb-3">Heading 2 — Inter Tight 700</Caption>
                <Heading2>La trasformazione digitale inizia qui.</Heading2>
              </div>
              <Separator className="bg-[var(--color-navy-light)]" />
              <div>
                <Caption className="mb-3">Heading 3 — Inter 600</Caption>
                <Heading3>Consulenza strategica su misura per PMI</Heading3>
              </div>
              <Separator className="bg-[var(--color-navy-light)]" />
              <div>
                <Caption className="mb-3">Body Large — Inter 400</Caption>
                <BodyLarge className="text-[var(--color-gray-mid)] max-w-2xl">
                  Accompagniamo le imprese italiane nel percorso di trasformazione digitale,
                  dall&apos;analisi strategica all&apos;esecuzione operativa, con un approccio integrato e misurabile.
                </BodyLarge>
              </div>
              <Separator className="bg-[var(--color-navy-light)]" />
              <div>
                <Caption className="mb-3">Labels & Tags</Caption>
                <div className="flex flex-wrap gap-4 items-center">
                  <Label>Categoria</Label>
                  <Label>AI e Automazione</Label>
                  <Label>Case Study</Label>
                </div>
              </div>
            </div>
          </DSSection>

          {/* ── WORDMARK ── */}
          <DSSection title="Logo & Wordmark">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-10 rounded-xl bg-[var(--color-navy)] border border-[var(--color-navy-light)] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-header-dark.svg" alt="GIRO SRL logo dark" width={200} height={55} />
              </div>
              <div className="p-10 rounded-xl bg-[var(--color-off-white)] border border-[var(--color-gray-light)] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo-header-light.svg" alt="GIRO SRL logo light" width={200} height={55} />
              </div>
            </div>
          </DSSection>

          {/* ── BUTTONS ── */}
          <DSSection title="Pulsanti">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4 items-center">
                <Magnetic>
                  <GiroButton variant="primary" size="lg">Prenota una call</GiroButton>
                </Magnetic>
                <GiroButton variant="primary">Primary</GiroButton>
                <GiroButton variant="primary" size="sm">Small</GiroButton>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <GiroButton variant="secondary" size="lg">Secondary Large</GiroButton>
                <GiroButton variant="secondary">Secondary</GiroButton>
                <GiroButton variant="secondary" size="sm">Small</GiroButton>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <GiroButton variant="ghost" size="lg">Ghost Large</GiroButton>
                <GiroButton variant="ghost">Ghost</GiroButton>
                <GiroButton variant="outline">Outline</GiroButton>
              </div>
            </div>
          </DSSection>

          {/* ── BADGES ── */}
          <DSSection title="Badge">
            <div className="flex flex-wrap gap-3">
              <OrbitBadge>AI e Automazione</OrbitBadge>
              <OrbitBadge>Sviluppo Web</OrbitBadge>
              <OrbitBadge variant="subtle">Digital Transformation</OrbitBadge>
              <OrbitBadge variant="outline">Marketing</OrbitBadge>
              <OrbitBadge variant="subtle">Consulenza Aziendale</OrbitBadge>
            </div>
          </DSSection>

          {/* ── CARDS ── */}
          <DSSection title="Cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { label: "Sviluppo Web", title: "Siti e applicazioni che convertono", body: "Dal design al deploy, costruiamo esperienze digitali performanti e misurabili." },
                { label: "AI & Automazione", title: "Automatizza. Scala. Cresci.", body: "Integriamo l'intelligenza artificiale nei tuoi processi per ridurre i costi e aumentare la velocità." },
                { label: "Marketing", title: "Visibilità che genera valore", body: "Strategie data-driven su tutti i canali digitali, con KPI chiari e risultati misurabili." },
              ].map((card) => (
                <GiroCard key={card.label} glow className="p-6">
                  <Label>{card.label}</Label>
                  <Heading3 className="mt-3 mb-2">{card.title}</Heading3>
                  <Body className="text-[var(--color-gray-mid)]">{card.body}</Body>
                  <AnimatedLink href="/servizi" className="mt-4 inline-block text-sm text-[var(--color-blue)]">
                    Scopri di più →
                  </AnimatedLink>
                </GiroCard>
              ))}
            </div>
          </DSSection>

          {/* ── SPACING ── */}
          <DSSection title="Spaziatura">
            <div className="space-y-3">
              {[
                { label: "section-sm (py-16/24)", h: "h-8", bg: "bg-[var(--color-blue)/15%]" },
                { label: "section (py-24/32)",    h: "h-12", bg: "bg-[var(--color-blue)/25%]" },
                { label: "section-lg (py-32/48)", h: "h-16", bg: "bg-[var(--color-blue)/35%]" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className={`${s.h} ${s.bg} rounded flex-1`} />
                  <span className="text-xs text-[var(--color-gray-mid)] w-52">{s.label}</span>
                </div>
              ))}
            </div>
          </DSSection>

          {/* ── SMOOTH SCROLL ── */}
          <DSSection title="Smooth scroll">
            <Body className="text-[var(--color-gray-mid)]">
              Lenis è attivo globalmente nel <code className="text-[var(--color-blue-light)] text-sm">RootLayout</code>.
              Il smooth scroll cinematografico è operativo su tutti i browser desktop.
              Su mobile e con <code className="text-[var(--color-blue-light)] text-sm">prefers-reduced-motion</code> viene disabilitato automaticamente.
            </Body>
          </DSSection>

        </Container>
      </Section>
    </main>
  )
}
