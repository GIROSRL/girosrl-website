import type { Metadata } from "next"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge, Heading2 } from "@/components/common/typography"
import { GiroButton } from "@/components/common/giro-button"
import { Magnetic } from "@/components/common/magnetic"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"
import { AuroraBackground } from "@/components/common/aurora-background"
import { VisionMission } from "@/components/sections/vision-mission"

export const metadata: Metadata = {
  title: "Chi siamo — Un centro gravitazionale per il tuo digitale",
  description:
    "GI.R.O. SRL è il partner unico per la trasformazione digitale delle PMI italiane. Strategia, sviluppo, AI, brand e marketing in un'unica relazione di fiducia.",
  alternates: { canonical: "/chi-siamo" },
  openGraph: {
    title: "Chi siamo — GI.R.O. SRL",
    description:
      "Un solo partner, infinite direzioni. Scopri chi siamo, cosa crediamo e come lavoriamo.",
    url: "/chi-siamo",
    type: "website",
  },
}

/** Valori guida — derivati dal brandbook + risposte founder. */
const valori = [
  {
    num: "01",
    title: "Pochi clienti, tanta attenzione",
    body: "Seguiamo poche aziende per volta. È una scelta: ci permette di capire il tuo business prima di proporre soluzioni, e di restare vicini quando le cose si complicano.",
  },
  {
    num: "02",
    title: "Tempi certi, prezzi trasparenti",
    body: "Nessuna stima indicativa. Cronoprogramma scritto, milestone chiari, budget fissato a inizio progetto. Se cambia qualcosa, lo diciamo subito.",
  },
  {
    num: "03",
    title: "Il codice è tuo, sempre",
    body: "Repository, domini, credenziali: tutto intestato a te. Se un giorno decidi di cambiare partner, non perdi nulla. È il tuo digitale, non il nostro.",
  },
  {
    num: "04",
    title: "Strumenti moderni, non moda",
    body: "Usiamo tecnologia recente quando serve davvero. Next.js, Supabase, AI: scelte pragmatiche che reggeranno i prossimi cinque anni, non gadget da copertina.",
  },
]

export default function ChiSiamoPage() {
  return (
    <>
      <AuroraBackground accent="#3a8fe8" />
      <main className="flex flex-col">
        {/* Hero */}
        <Section size="lg" className="relative overflow-hidden">
          <Container>
            <BreadcrumbNav
              items={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]}
            />
            <Label className="mb-4 text-[var(--color-blue)]">
              La nostra storia
            </Label>
            <AnimatedHeadline
              text="Un centro gravitazionale, non uno studio qualunque."
              fontSize={104}
              tag="h1"
              className="mb-8"
            />
            <BodyLarge className="max-w-3xl text-[var(--color-gray-mid)] mb-10">
              GI.R.O. SRL nasce dall&apos;idea che una PMI italiana non abbia
              bisogno di dieci fornitori scollegati: ha bisogno di un interlocutore
              unico che capisca il suo business e coordini tutto il digitale in
              modo coerente. Siamo a Catania, lavoriamo con clienti in tutta
              Italia, e alcune partnership durano da oltre otto anni.
            </BodyLarge>
            <div className="flex flex-col sm:flex-row gap-4">
              <Magnetic>
                <GiroButton variant="primary" size="lg" href="/contatti">
                  Parlaci del tuo progetto
                </GiroButton>
              </Magnetic>
              <GiroButton variant="outline" size="lg" href="/percorsi">
                Scopri i percorsi
              </GiroButton>
            </div>
          </Container>
        </Section>

        {/* Visione + Missione (riuso component) */}
        <VisionMission />

        {/* Valori */}
        <Section size="lg" className="relative">
          <Container>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start mb-12">
              <div className="md:col-span-4">
                <Label className="mb-4 text-[var(--color-blue)]">
                  Come lavoriamo
                </Label>
                <Heading2>Quattro principi non negoziabili</Heading2>
              </div>
              <div className="md:col-span-8">
                <BodyLarge className="text-[var(--color-gray-mid)]">
                  Le parole sono facili. Questi sono i comportamenti che ci
                  impegniamo a mantenere in ogni progetto — e che puoi usare per
                  valutarci lungo tutta la collaborazione.
                </BodyLarge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {valori.map((v) => (
                <div
                  key={v.num}
                  className="relative p-7 rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40"
                >
                  <div
                    className="font-display text-3xl font-bold mb-3 text-[var(--color-blue)]"
                  >
                    {v.num}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-3 leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--color-gray-mid)]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Team placeholder */}
        <Section size="lg" className="relative">
          <Container>
            <div className="rounded-3xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/30 p-10 md:p-16 text-center relative overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(58,143,232,0.2) 0%, transparent 60%)",
                }}
              />
              <div className="relative max-w-2xl mx-auto">
                <Label className="mb-4 text-[var(--color-blue)]">
                  Il team
                </Label>
                <Heading2 className="mb-6">
                  Sei professionisti,{" "}
                  <em className="not-italic text-[var(--color-blue)]">
                    un&apos;unica testa.
                  </em>
                </Heading2>
                <p className="text-base md:text-lg text-[var(--color-gray-mid)] mb-8">
                  Strategist, sviluppatori, AI engineer, brand designer e
                  marketer: ognuno porta la sua specializzazione, ma parliamo
                  con una voce sola. Foto e bio in arrivo nelle prossime
                  settimane — nel frattempo, la cosa migliore per conoscerci è
                  fissare una call.
                </p>
                <Magnetic>
                  <GiroButton variant="primary" size="lg" href="/contatti">
                    Prenota una call di 30 minuti
                  </GiroButton>
                </Magnetic>
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
              background:
                "radial-gradient(ellipse at center, rgba(58,143,232,0.2) 0%, transparent 60%)",
            }}
          />
          <Container>
            <div className="relative text-center max-w-3xl mx-auto">
              <Label className="mb-4 text-[var(--color-blue)]">
                Ci siamo presentati
              </Label>
              <Heading2 className="mb-6">
                Ora è il tuo turno.{" "}
                <em className="not-italic text-[var(--color-blue)]">
                  Raccontaci cosa vuoi costruire.
                </em>
              </Heading2>
              <p className="text-base md:text-lg text-[var(--color-gray-mid)] mb-10">
                Trenta minuti, zero slide, zero obbligo. Se possiamo esserti
                utili, te lo diciamo. Se non possiamo, ti indichiamo chi può.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Magnetic>
                  <GiroButton variant="primary" size="lg" href="/contatti">
                    Scrivici
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
