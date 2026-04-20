import Link from "next/link"
import { Container } from "@/components/common/container"
import { Sparkles } from "@/components/ui/sparkles"
import { LogoAnimated } from "./logo-animated"

const servicesLinks = [
  { label: "Strategia", href: "/servizi/strategia" },
  { label: "Sviluppo", href: "/servizi/sviluppo" },
  { label: "Intelligenza", href: "/servizi/intelligenza" },
  { label: "Brand", href: "/servizi/brand" },
  { label: "Marketing", href: "/servizi/marketing" },
]

const pathsLinks = [
  { label: "Parti", href: "/percorsi/parti" },
  { label: "Cresci", href: "/percorsi/cresci" },
  { label: "Trasforma", href: "/percorsi/trasforma" },
]

const companyLinks = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-auto border-t border-[var(--color-navy-light)] bg-[var(--color-navy-mid)] overflow-hidden">
      {/* Starfield particle layer (decorative, non-interactive) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-70"
        style={{
          maskImage:
            "radial-gradient(60% 80% at 50% 100%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(60% 80% at 50% 100%, #000 0%, rgba(0,0,0,0.6) 45%, transparent 85%)",
        }}
      >
        <Sparkles
          className="absolute inset-0 w-full h-full"
          density={900}
          size={1.4}
          minSize={0.3}
          speed={0.6}
          opacity={0.9}
          minOpacity={0.1}
          opacitySpeed={2}
          color="#9fcbff"
          background="transparent"
        />
      </div>

      {/* Decorative orbit */}
      <div
        aria-hidden
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          border: "50px solid rgba(58, 143, 232, 0.04)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{
          border: "1px solid rgba(91, 179, 240, 0.08)",
        }}
      />

      <Container>
        <div className="relative py-20 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <LogoAnimated size="md" />
            <p className="mt-6 text-sm leading-relaxed text-[var(--color-gray-mid)] max-w-sm">
              Al centro del tuo progetto, in ogni fase.
              <br />
              Un solo partner per la tua trasformazione digitale.
            </p>
            <div className="mt-8 space-y-1.5 text-sm text-[var(--color-gray-mid)]">
              <p>
                <a
                  href="mailto:info@girosrl.com"
                  className="hover:text-[var(--color-blue-light)] transition-colors"
                >
                  info@girosrl.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+393932743260"
                  className="hover:text-[var(--color-blue-light)] transition-colors"
                >
                  +39 393 274 3260
                </a>
              </p>
              <p>Viale Ulisse 22, Catania</p>
            </div>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-2 md:col-start-6">
            <FooterCol title="Servizi" links={servicesLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterCol title="Percorsi" links={pathsLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterCol title="Azienda" links={companyLinks} />
          </div>

          {/* Newsletter placeholder */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-blue)] mb-4">
              Newsletter
            </h4>
            <p className="text-xs leading-relaxed text-[var(--color-gray-mid)]">
              Prossimamente: un digest mensile con case studies e insight.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-[var(--color-navy-light)]">
          <p className="text-xs text-[var(--color-gray-mid)]">
            © {year} GI.R.O. SRL — Tutti i diritti riservati
          </p>
          <p className="text-xs text-[var(--color-gray-mid)]">
            P.IVA <span className="font-mono text-[var(--color-blue-pale)]">07266000872</span> · Catania
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-[var(--color-gray-mid)] hover:text-[var(--color-blue-light)] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookie"
              className="text-xs text-[var(--color-gray-mid)] hover:text-[var(--color-blue-light)] transition-colors"
            >
              Cookie
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-blue)] mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[var(--color-gray-mid)] hover:text-[var(--color-blue-light)] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
