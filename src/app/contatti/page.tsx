import type { Metadata } from "next"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge } from "@/components/common/typography"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"
import { AuroraBackground } from "@/components/common/aurora-background"
import { CalendarBooking } from "@/components/common/calendar-booking"
import {
  JsonLdLocalBusiness,
  JsonLdBreadcrumb,
} from "@/components/common/json-ld"
import { ContactForm } from "./contact-form"

export const metadata: Metadata = {
  title: "Contatti — Prenota una Call Gratuita | GI.R.O. SRL Catania",
  description:
    "Prenota una call gratuita di 30 minuti con il team GI.R.O. SRL. Raccontaci il tuo progetto — Viale Ulisse 22, Catania. info@girosrl.com",
  alternates: { canonical: "/contatti" },
  openGraph: {
    title: "Contatti — Prenota una Call Gratuita | GI.R.O. SRL Catania",
    description:
      "Prenota una call gratuita di 30 minuti. Raccontaci il tuo progetto. Viale Ulisse 22, Catania.",
    url: "/contatti",
    type: "website",
  },
}

export default function ContattiPage() {
  return (
    <>
      <JsonLdLocalBusiness />
      <JsonLdBreadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: "Contatti", path: "/contatti" },
        ]}
      />
      <AuroraBackground accent="#3a8fe8" />
      <main className="flex flex-col">
        {/* Hero */}
        <Section size="lg" className="relative overflow-hidden">
          <Container>
            <BreadcrumbNav
              items={[{ label: "Home", href: "/" }, { label: "Contatti" }]}
            />
            <Label className="mb-4 text-[var(--color-blue)]">
              Parliamone
            </Label>
            <AnimatedHeadline
              text="Raccontaci il tuo progetto."
              fontSize={96}
              tag="h1"
              className="mb-8"
            />
            <BodyLarge className="max-w-2xl text-[var(--color-gray-mid)]">
              Compila il form qui sotto o scrivici direttamente. Rispondiamo
              entro 24 ore lavorative — parliamo con te, non con un bot.
            </BodyLarge>
          </Container>
        </Section>

        {/* Prenota call via Google Calendar — opzionale (env NEXT_PUBLIC_GOOGLE_CALENDAR_URL) */}
        <Section size="sm" className="pt-0">
          <Container>
            <CalendarBooking />
          </Container>
        </Section>

        {/* Form + sidebar contatti */}
        <Section size="md" className="pt-0">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

              <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
                <ContactCard
                  label="Email"
                  value="info@girosrl.com"
                  href="mailto:info@girosrl.com"
                />
                <ContactCard
                  label="Telefono"
                  value="+39 393 274 3260"
                  href="tel:+393932743260"
                />
                <ContactCard
                  label="Ufficio"
                  value={
                    <>
                      Viale Ulisse 22
                      <br />
                      95126 Catania · Italia
                    </>
                  }
                />

                <div className="rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40 p-6">
                  <div className="text-xs tracking-widest uppercase text-[var(--color-blue)] font-semibold mb-3">
                    Come rispondiamo
                  </div>
                  <ul className="space-y-3 text-sm text-[var(--color-gray-mid)] leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--color-blue)]"
                      />
                      <span>
                        Entro 24 ore lavorative ricevi una risposta da una
                        persona vera.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--color-blue)]"
                      />
                      <span>
                        Se il tuo caso non fa per noi, te lo diciamo subito — e
                        se possiamo ti indichiamo chi può aiutarti.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--color-blue)]"
                      />
                      <span>
                        La prima call è gratuita: 30 minuti, zero slide, zero
                        obbligo.
                      </span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </Container>
        </Section>
      </main>
    </>
  )
}

function ContactCard({
  label,
  value,
  href,
}: {
  label: string
  value: React.ReactNode
  href?: string
}) {
  const inner = (
    <>
      <div className="text-xs tracking-widest uppercase text-[var(--color-blue)] font-semibold mb-2">
        {label}
      </div>
      <div className="font-display text-xl md:text-2xl font-bold text-[var(--fg)] group-hover:text-[var(--color-blue-light)] transition-colors">
        {value}
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className="group block p-6 rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40 hover:border-[var(--color-blue-dark)] transition-all duration-300"
      >
        {inner}
      </a>
    )
  }

  return (
    <div className="p-6 rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40">
      {inner}
    </div>
  )
}
