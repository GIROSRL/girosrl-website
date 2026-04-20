import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge, Heading2 } from "@/components/common/typography"
import { GiroButton } from "@/components/common/giro-button"
import { Magnetic } from "@/components/common/magnetic"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"
import { AuroraBackground } from "@/components/common/aurora-background"
import { paths, getPathBySlug } from "@/content/paths"
import { serviceAreas, getAreaBySlug } from "@/content/services"

export function generateStaticParams() {
  return paths.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const path = getPathBySlug(slug)
  if (!path) return {}
  return {
    title: path.metaTitle,
    description: path.metaDescription,
    alternates: { canonical: path.href },
    openGraph: {
      title: path.metaTitle,
      description: path.metaDescription,
      url: path.href,
      type: "website",
    },
  }
}

export default async function PercorsoDettaglioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const path = getPathBySlug(slug)
  if (!path) notFound()

  const firstArea = getAreaBySlug(path.aree[0]!)
  const secondArea = path.aree[1] ? getAreaBySlug(path.aree[1]) : undefined
  const auroraAccent = firstArea?.color ?? "#3a8fe8"
  const auroraSecondary = secondArea?.color

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: path.title,
    description: path.description,
    provider: {
      "@type": "Organization",
      name: "GI.R.O. SRL",
      url: "https://girosrl.com",
    },
    serviceType: path.tagline,
    url: `https://girosrl.com${path.href}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex flex-col">
        <AuroraBackground
          accent={auroraAccent}
          {...(auroraSecondary ? { secondary: auroraSecondary } : {})}
        />
        {/* Hero — verbo imperativo gigante */}
        <Section size="lg" className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(58,143,232,0.3) 0%, transparent 60%)",
            }}
          />
          <Container>
            <BreadcrumbNav
              items={[
                { label: "Home", href: "/" },
                { label: "Percorsi", href: "/percorsi" },
                { label: path.title },
              ]}
            />
            <Label className="mb-4 text-[var(--color-blue)]">
              Percorso · {path.tagline}
            </Label>
            <AnimatedHeadline
              text={path.title.toUpperCase() + "."}
              fontSize={160}
              fontWeight={900}
              tag="h1"
              color={auroraAccent}
              className="mb-8"
            />
            <BodyLarge className="max-w-2xl text-[var(--color-gray-mid)] mb-8">
              {path.description}
            </BodyLarge>
            <div className="flex flex-wrap gap-2 mb-10">
              {path.aree.map((slug) => {
                const area = getAreaBySlug(slug)
                if (!area) return null
                return (
                  <Link
                    key={slug}
                    href={area.href}
                    className="text-xs px-3 py-1.5 rounded-full border hover:-translate-y-0.5 transition-all duration-300"
                    style={{
                      color: area.color,
                      borderColor: `${area.color}55`,
                      background: `${area.color}10`,
                    }}
                  >
                    {area.title}
                  </Link>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <GiroButton variant="primary" size="lg" href="/contatti">
                  Inizia questo percorso
                </GiroButton>
              </Magnetic>
              <GiroButton variant="outline" size="lg" href="/percorsi">
                Confronta con gli altri
              </GiroButton>
            </div>
          </Container>
        </Section>

        {/* Budget + durata badge */}
        <Section size="sm">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoBadge label="Budget indicativo" value={path.budgetIndicativo} />
              <InfoBadge label="Durata" value={path.durataIndicativa} />
            </div>
          </Container>
        </Section>

        {/* Per chi è */}
        <Section size="lg">
          <Container>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-4">
                <Label className="mb-4 text-[var(--color-blue)]">Per chi è</Label>
                <Heading2>Profili cliente tipici</Heading2>
              </div>
              <div className="md:col-span-8">
                <p className="max-w-2xl text-base md:text-lg leading-relaxed text-[var(--color-gray-mid)] mb-8">
                  {path.perChi}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {path.profiliCliente.map((profilo, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40"
                    >
                      <span
                        aria-hidden
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold"
                        style={{
                          background: "var(--color-blue-dark)",
                          color: "#ffffff",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{profilo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Fasi timeline */}
        <Section
          size="lg"
          className="relative"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(58,143,232,0.05) 50%, transparent 100%)",
          }}
        >
          <Container>
            <div className="mb-12">
              <Label className="mb-4 text-[var(--color-blue)]">
                Le fasi del percorso
              </Label>
              <Heading2 className="max-w-2xl">
                Come lavoriamo insieme, fase dopo fase
              </Heading2>
            </div>
            <div className="space-y-4">
              {path.fasi.map((fase, idx) => {
                const area = getAreaBySlug(fase.area)
                const color = area?.color ?? "#3a8fe8"
                return (
                  <div
                    key={fase.numero}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-start p-6 rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/30"
                  >
                    <div className="md:col-span-2 flex md:flex-col gap-3 md:gap-2 items-start">
                      <span
                        className="font-display text-5xl md:text-6xl font-bold leading-none"
                        style={{ color }}
                      >
                        {String(fase.numero).padStart(2, "0")}
                      </span>
                      {area && (
                        <Link
                          href={area.href}
                          className="text-[10px] tracking-widest uppercase font-semibold"
                          style={{ color }}
                        >
                          {area.title}
                        </Link>
                      )}
                    </div>
                    <div className="md:col-span-10">
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                        {fase.titolo}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed text-[var(--color-gray-mid)]">
                        {fase.descrizione}
                      </p>
                    </div>
                    {idx < path.fasi.length - 1 && (
                      <div
                        aria-hidden
                        className="md:col-span-12 h-px opacity-30 mt-2"
                        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </Container>
        </Section>

        {/* Risultati */}
        <Section size="lg">
          <Container>
            <div className="mb-12">
              <Label className="mb-4 text-[var(--color-blue)]">
                Risultati attesi
              </Label>
              <Heading2 className="max-w-2xl">
                Numeri, non promesse
              </Heading2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {path.risultati.map((r) => (
                <div
                  key={r.label}
                  className="p-8 rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40 text-center relative overflow-hidden"
                >
                  <div
                    aria-hidden
                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-20"
                    style={{
                      background:
                        "radial-gradient(circle, var(--color-blue) 0%, transparent 70%)",
                    }}
                  />
                  <div
                    className="relative font-display text-5xl md:text-6xl font-bold leading-none mb-3 text-[var(--color-blue)]"
                  >
                    {r.metric}
                  </div>
                  <div className="relative text-sm font-semibold">{r.label}</div>
                  {r.sublabel && (
                    <div className="relative mt-1 text-[10px] tracking-widest uppercase text-[var(--color-gray-mid)]">
                      {r.sublabel}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Aree coinvolte (dettaglio) */}
        <Section size="lg">
          <Container>
            <Label className="mb-4 text-[var(--color-blue)]">
              Aree di servizio coinvolte
            </Label>
            <Heading2 className="mb-10 max-w-2xl">
              {path.aree.length} direzioni.{" "}
              <em className="not-italic text-[var(--color-blue)]">
                Un solo piano.
              </em>
            </Heading2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceAreas.map((area) => {
                const isInvolved = path.aree.includes(area.slug)
                return (
                  <Link
                    key={area.slug}
                    href={area.href}
                    className="group p-6 rounded-xl border transition-all duration-500 hover:-translate-y-0.5"
                    style={{
                      borderColor: isInvolved
                        ? `${area.color}55`
                        : "var(--color-navy-light)",
                      background: isInvolved
                        ? `${area.color}10`
                        : "rgba(13, 20, 36, 0.3)",
                      opacity: isInvolved ? 1 : 0.45,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: area.color }}
                      />
                      <span
                        className="font-display text-xl font-bold"
                        style={{ color: isInvolved ? area.color : "var(--fg)" }}
                      >
                        {area.title}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-gray-mid)] leading-relaxed">
                      {area.tagline}
                    </p>
                    {isInvolved && (
                      <span className="mt-3 inline-block text-[10px] uppercase tracking-widest font-semibold" style={{ color: area.color }}>
                        ✓ Inclusa
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </Container>
        </Section>

        {/* CTA finale */}
        <Section size="lg" className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(58,143,232,0.2) 0%, transparent 60%)",
            }}
          />
          <Container>
            <div className="relative text-center max-w-3xl mx-auto">
              <Label className="mb-4 text-[var(--color-blue)]">
                Pronto a partire?
              </Label>
              <Heading2 className="mb-6">
                Parlaci del tuo progetto.
                <br />
                <em className="not-italic text-[var(--color-blue)]">
                  Noi ti diciamo se {path.title} fa per te.
                </em>
              </Heading2>
              <p className="text-base md:text-lg text-[var(--color-gray-mid)] mb-10 max-w-xl mx-auto">
                Una call onesta: 30 minuti, zero obbligo. Se non è il percorso
                giusto, te lo diciamo.
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

function InfoBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-5 rounded-xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40">
      <div className="text-[10px] tracking-widest uppercase text-[var(--color-gray-mid)] mb-2">
        {label}
      </div>
      <div className="font-display text-2xl md:text-3xl font-bold text-[var(--fg)]">
        {value}
      </div>
    </div>
  )
}
