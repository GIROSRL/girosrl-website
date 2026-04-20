import type { Metadata } from "next"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge } from "@/components/common/typography"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "Informativa sull'uso dei cookie in conformità con la normativa italiana ed europea.",
  alternates: { canonical: "/cookie" },
  robots: { index: true, follow: false },
}

export default function CookiePage() {
  return (
    <main className="flex flex-col">
      <Section size="lg">
        <Container>
          <BreadcrumbNav
            items={[{ label: "Home", href: "/" }, { label: "Cookie" }]}
          />
          <Label className="mb-4 text-[var(--color-blue)]">Legal</Label>
          <AnimatedHeadline text="Cookie policy" fontSize={88} tag="h1" className="mb-6" />
          <BodyLarge className="max-w-3xl text-[var(--color-gray-mid)] mb-10">
            Questo sito utilizza solo cookie tecnici strettamente necessari al
            funzionamento. Nessun cookie di profilazione o marketing.
          </BodyLarge>

          <div className="max-w-3xl space-y-6 text-sm md:text-base leading-relaxed text-[var(--color-gray-mid)]">
            <Block title="Cookie tecnici">
              Alcuni cookie tecnici sono essenziali per il funzionamento del sito
              (es. gestione della sessione, preferenze di lingua). Non richiedono
              consenso e non vengono utilizzati per tracciare l&apos;utente.
            </Block>
            <Block title="Analytics">
              Il sito può utilizzare strumenti di analisi anonimi e aggregati
              (es. Vercel Analytics) che non impiegano cookie di profilazione e non
              tracciano l&apos;utente individualmente.
            </Block>
            <Block title="Gestione">
              Puoi gestire i cookie direttamente dalle impostazioni del tuo browser.
              Disabilitando i cookie tecnici alcune funzionalità del sito potrebbero
              non essere disponibili.
            </Block>
            <Block title="Contatti">
              Per qualsiasi domanda sull&apos;uso dei cookie puoi scriverci a{" "}
              <a
                className="text-[var(--color-blue-light)] hover:underline"
                href="mailto:info@girosrl.com"
              >
                info@girosrl.com
              </a>
              .
              <div className="mt-3 text-xs text-[var(--color-gray-mid)]/70">
                Ultimo aggiornamento: aprile 2026.
              </div>
            </Block>
          </div>
        </Container>
      </Section>
    </main>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold mb-3 text-[var(--fg)]">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  )
}
