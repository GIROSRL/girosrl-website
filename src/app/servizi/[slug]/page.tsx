import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge, Heading2 } from "@/components/common/typography"
import { GiroButton } from "@/components/common/giro-button"
import { Magnetic } from "@/components/common/magnetic"
import { PlanetBadge } from "@/components/common/planet-badge"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"
import { AuroraBackground } from "@/components/common/aurora-background"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { serviceAreas, getAreaBySlug } from "@/content/services"
import { paths } from "@/content/paths"
import type { AreaSlug } from "@/types/content"

export function generateStaticParams() {
  return serviceAreas.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) return {}
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: { canonical: area.href },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: area.href,
      type: "website",
    },
  }
}

export default async function ServizioDettaglioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const area = getAreaBySlug(slug)
  if (!area) notFound()

  const collegati = paths.filter((p) =>
    area.percorsiCollegati.includes(p.slug as never)
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.title,
    description: area.description,
    provider: {
      "@type": "Organization",
      name: "GI.R.O. SRL",
      url: "https://girosrl.com",
    },
    areaServed: "IT",
    serviceType: area.tagline,
    url: `https://girosrl.com${area.href}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col">
        <AuroraBackground accent={area.color} />
        {/* Hero */}
        <Section size="lg" className="relative overflow-hidden">
          {/* Glow di area nello sfondo */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(circle, ${area.color}55 0%, ${area.color}22 40%, transparent 75%)`,
            }}
          />
          <Container>
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Servizi", href: "/servizi" },
                { label: area.title },
              ]}
            />
            <div className="flex items-center gap-5 mb-6">
              <PlanetBadge color={area.color} size={72} />
              <Label style={{ color: area.color }}>{area.tagline}</Label>
            </div>
            <AnimatedHeadline
              text={area.title + "."}
              fontSize={120}
              tag="h1"
              color={area.color}
              className="mb-6"
            />
            <BodyLarge className="max-w-2xl text-[var(--color-gray-mid)] mb-10">
              {area.description}
            </BodyLarge>
            <div className="flex flex-wrap gap-2 mb-10">
              {area.items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full border bg-white/5 backdrop-blur-sm"
                  style={{
                    color: area.color,
                    borderColor: `${area.color}55`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <GiroButton variant="primary" size="lg" href="/contatti">
                  Prenota una call
                </GiroButton>
              </Magnetic>
              <GiroButton variant="outline" size="lg" href="/percorsi">
                Scopri i percorsi
              </GiroButton>
            </div>
          </Container>
        </Section>

        {/* Problema */}
        <Section size="lg" className="relative">
          <Container>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-4">
                <Label className="mb-4" style={{ color: area.color }}>
                  Il problema
                </Label>
              </div>
              <div className="md:col-span-8">
                <Heading2 className="mb-6 max-w-2xl">
                  {area.problema.title}
                </Heading2>
                <p className="max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-gray-mid)] mb-8">
                  {area.problema.body}
                </p>
                <ul className="space-y-3">
                  {area.problema.painPoints.map((pp) => (
                    <li key={pp} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: area.color }}
                      />
                      <span className="text-sm md:text-base text-[var(--fg)]">
                        {pp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Approccio */}
        <Section
          size="lg"
          className="relative"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${area.color}08 50%, transparent 100%)`,
          }}
        >
          <Container>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start mb-12">
              <div className="md:col-span-4">
                <Label className="mb-4" style={{ color: area.color }}>
                  Il nostro approccio
                </Label>
              </div>
              <div className="md:col-span-8">
                <Heading2 className="mb-6 max-w-2xl">
                  {area.approccio.title}
                </Heading2>
                <p className="max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-gray-mid)]">
                  {area.approccio.body}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {area.approccio.steps.map((step) => (
                <div
                  key={step.num}
                  className="relative p-6 rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40"
                >
                  <div
                    className="font-display text-3xl font-bold mb-3"
                    style={{ color: area.color }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-gray-mid)]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Deliverables */}
        <Section size="lg">
          <Container>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-4">
                <Label className="mb-4" style={{ color: area.color }}>
                  Cosa ottieni
                </Label>
                <Heading2>Deliverable concreti</Heading2>
              </div>
              <div className="md:col-span-8">
                <ul className="space-y-4">
                  {area.deliverables.map((d, i) => (
                    <li
                      key={d}
                      className="flex items-start gap-4 p-4 rounded-xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/30"
                    >
                      <span
                        className="font-display font-bold text-lg shrink-0 w-8"
                        style={{ color: area.color }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm md:text-base leading-relaxed">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Percorsi collegati */}
        {collegati.length > 0 && (
          <Section size="lg" className="relative">
            <Container>
              <Label className="mb-4 text-[var(--color-blue)]">
                Percorsi che includono questa area
              </Label>
              <Heading2 className="mb-10 max-w-2xl">
                Questa direzione fa parte di{" "}
                <em
                  className="not-italic"
                  style={{ color: area.color }}
                >
                  {collegati.length === 1 ? "un percorso" : `${collegati.length} percorsi`}
                </em>
              </Heading2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {collegati.map((p) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="group p-6 rounded-xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/50 hover:border-[var(--color-blue-dark)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="font-display text-2xl font-bold text-[var(--color-blue-light)] mb-2">
                      {p.title}
                    </div>
                    <div className="text-xs tracking-widest uppercase text-[var(--color-gray-mid)] mb-3">
                      {p.tagline}
                    </div>
                    <p className="text-sm text-[var(--color-gray-mid)] mb-4 line-clamp-2">
                      {p.description}
                    </p>
                    <span className="text-xs uppercase tracking-wider text-[var(--color-blue-light)] group-hover:text-[var(--color-blue)]">
                      Scopri →
                    </span>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* FAQ */}
        <Section size="lg">
          <Container>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-4">
                <Label className="mb-4" style={{ color: area.color }}>
                  Domande frequenti
                </Label>
                <Heading2>FAQ</Heading2>
              </div>
              <div className="md:col-span-8">
                <Accordion className="w-full">
                  {area.faq.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base leading-relaxed text-[var(--color-gray-mid)]">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA finale */}
        <Section size="lg" className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: `radial-gradient(ellipse at center, ${area.color}33 0%, transparent 60%)`,
            }}
          />
          <Container>
            <div className="relative text-center max-w-3xl mx-auto">
              <Label className="mb-4" style={{ color: area.color }}>
                Pronto a iniziare?
              </Label>
              <Heading2 className="mb-6">
                Parliamone in una call.{" "}
                <em
                  className="not-italic"
                  style={{ color: area.color }}
                >
                  30 minuti, zero slide.
                </em>
              </Heading2>
              <p className="text-base md:text-lg text-[var(--color-gray-mid)] mb-10 max-w-xl mx-auto">
                Ti ascoltiamo, capiamo il tuo caso, ti diciamo se {area.title.toLowerCase()} è
                davvero quello che ti serve — o cosa viene prima.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic>
                  <GiroButton variant="primary" size="lg" href="/contatti">
                    Prenota una call
                  </GiroButton>
                </Magnetic>
                <GiroButton
                  variant="ghost"
                  size="lg"
                  href="mailto:info@girosrl.com"
                >
                  info@girosrl.com
                </GiroButton>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}

// TypeScript helper: ristringe percorsiCollegati al type union
type _CheckAreaSlug = AreaSlug
