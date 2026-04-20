"use client"

import Image from "next/image"
import { useState } from "react"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, Heading2 } from "@/components/common/typography"
import { Sparkles } from "@/components/ui/sparkles"
import { featuredClients, type Client } from "@/content/clients"

/**
 * Sezione "Hanno scelto GIRO" — griglia di loghi clienti su sfondo Sparkles.
 * Ispirazione: pattern "trusted by" con starfield, mascherato radialmente.
 */
export function ClientLogos() {
  return (
    <Section size="lg" className="relative overflow-hidden">
      {/* Sparkles background — mascherato al centro, fade ai bordi */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(55% 70% at 50% 60%, #000 0%, rgba(0,0,0,0.7) 55%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(55% 70% at 50% 60%, #000 0%, rgba(0,0,0,0.7) 55%, transparent 90%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(58,143,232,0.12) 0%, transparent 60%)",
          }}
        />
        <Sparkles
          className="absolute inset-0 w-full h-full"
          density={700}
          size={1.3}
          minSize={0.25}
          speed={0.55}
          opacity={0.85}
          minOpacity={0.08}
          opacitySpeed={2}
          color="#b8cfe8"
          background="transparent"
        />
      </div>

      <Container>
        <div className="relative text-center mb-14">
          <Label className="mb-4 text-[var(--color-blue)]">
            Hanno scelto GIRO
          </Label>
          <Heading2 className="mx-auto max-w-3xl">
            Clienti che ci hanno dato fiducia,
            {" "}
            <em className="not-italic text-[var(--color-blue)]">
              alcuni da più di otto anni.
            </em>
          </Heading2>
        </div>

        <ul className="relative grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-center">
          {featuredClients.map((client) => (
            <li key={client.slug} className="flex items-center justify-center">
              <ClientLogo client={client} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/**
 * Singolo logo — prova a caricare l'immagine; se manca, fallback testuale
 * così la griglia resta leggibile anche quando il file è ancora assente.
 */
function ClientLogo({ client }: { client: Client }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className="flex flex-col items-center justify-center text-center px-4 py-3 rounded-lg border border-dashed border-[var(--color-navy-light)]/60 w-full max-w-[160px] h-[72px]"
        title={client.alt}
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--color-blue-light)" }}
        >
          {client.name}
        </span>
        {client.tagline && (
          <span className="mt-1 text-[10px] text-[var(--color-gray-mid)]">
            {client.tagline}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col items-center gap-2 transition-opacity duration-300">
      <Image
        src={client.logo}
        alt={client.alt}
        width={client.width ?? 180}
        height={64}
        onError={() => setFailed(true)}
        className="max-h-14 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ height: "auto" }}
      />
      {client.tagline && (
        <span className="text-[10px] tracking-widest uppercase text-[var(--color-gray-mid)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {client.tagline}
        </span>
      )}
    </div>
  )
}
