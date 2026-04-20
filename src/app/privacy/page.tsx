import type { Metadata } from "next"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, BodyLarge } from "@/components/common/typography"
import { BreadcrumbNav } from "@/components/common/breadcrumb-nav"
import { AnimatedHeadline } from "@/components/common/animated-headline"

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: false },
}

export default function PrivacyPage() {
  return (
    <main className="flex flex-col">
      <Section size="lg">
        <Container>
          <BreadcrumbNav
            items={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
          />
          <Label className="mb-4 text-[var(--color-blue)]">Legal</Label>
          <AnimatedHeadline text="Privacy policy" fontSize={88} tag="h1" className="mb-6" />
          <BodyLarge className="max-w-3xl text-[var(--color-gray-mid)] mb-10">
            Informativa sul trattamento dei dati personali ai sensi dell&apos;art. 13
            del Regolamento UE 2016/679 (&quot;GDPR&quot;).
          </BodyLarge>

          <div className="max-w-3xl space-y-6 text-sm md:text-base leading-relaxed text-[var(--color-gray-mid)]">
            <Block title="1. Titolare del trattamento">
              Il titolare del trattamento è <strong>GI.R.O. SRL</strong>, con sede
              legale in Viale Ulisse 22, 95126 Catania, P.IVA 04331240871. Per
              qualsiasi richiesta: <a className="text-[var(--color-blue-light)] hover:underline" href="mailto:info@girosrl.com">info@girosrl.com</a>.
            </Block>
            <Block title="2. Dati raccolti">
              Tramite il form di contatto raccogliamo: nome, email, eventuale
              telefono, azienda, oggetto della richiesta, budget indicativo e
              messaggio. Il sito non utilizza cookie di profilazione.
            </Block>
            <Block title="3. Finalità">
              I dati sono usati esclusivamente per rispondere alla tua richiesta e,
              se inizi una collaborazione, per gestire il rapporto contrattuale.
              Non effettuiamo profilazione né vendita dei dati a terzi.
            </Block>
            <Block title="4. Conservazione">
              I dati di contatto restano nei nostri sistemi finché sussiste
              interesse reciproco, e comunque non oltre 24 mesi dall&apos;ultimo
              contatto. I dati contrattuali sono conservati per i termini di legge
              (10 anni per obblighi fiscali).
            </Block>
            <Block title="5. Diritti dell&apos;interessato">
              Puoi richiedere in qualsiasi momento accesso, rettifica, cancellazione,
              limitazione, portabilità o opposizione al trattamento scrivendo a
              info@girosrl.com. Puoi inoltre proporre reclamo al Garante Privacy
              (<a className="text-[var(--color-blue-light)] hover:underline" href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">garanteprivacy.it</a>).
            </Block>
            <Block title="6. Aggiornamenti">
              Questa informativa potrà essere aggiornata. La versione corrente è
              pubblicata su questa pagina con data di ultima modifica.
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
