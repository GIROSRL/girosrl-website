"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, Heading2, BodyLarge } from "@/components/common/typography"

const easeOut = [0.22, 1, 0.36, 1] as const

export function VisionMission() {
  return (
    <Section size="lg" id="vision" className="relative overflow-hidden">
      {/* Orbit decoration */}
      <div
        aria-hidden
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-30"
        style={{
          border: "1px solid rgba(58, 143, 232, 0.15)",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{
          border: "40px solid rgba(58, 143, 232, 0.04)",
        }}
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left: labels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="md:col-span-4"
          >
            <Label className="mb-4 text-[var(--color-blue)]">Visione · Missione</Label>
            <div className="flex items-center gap-2 text-xs text-[var(--color-gray-mid)] tracking-widest uppercase">
              <div className="w-8 h-px bg-[var(--color-blue)]" />
              <span>Chi siamo</span>
            </div>
          </motion.div>

          {/* Right: content */}
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: easeOut }}
            >
              <Heading2 className="max-w-3xl">
                Crediamo che ogni PMI italiana meriti{" "}
                <em className="text-[var(--color-blue)] not-italic">
                  un solo interlocutore
                </em>{" "}
                competente, non dieci fornitori scollegati.
              </Heading2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: easeOut }}
              className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10"
            >
              <div>
                <Label className="mb-3 text-[var(--color-blue-light)]">
                  La nostra visione
                </Label>
                <BodyLarge className="text-[var(--color-gray-mid)]">
                  Essere il partner di riferimento per la trasformazione digitale delle
                  PMI italiane. Un centro gravitazionale unico attorno al quale ruotano
                  tutte le competenze di cui la tua azienda ha bisogno.
                </BodyLarge>
              </div>
              <div>
                <Label className="mb-3 text-[var(--color-blue-light)]">
                  La nostra missione
                </Label>
                <BodyLarge className="text-[var(--color-gray-mid)]">
                  Semplificare la complessità digitale. Portiamo strategia, sviluppo,
                  AI e marketing in un&apos;unica relazione di fiducia: progetti coerenti,
                  tempi certi, risultati misurabili.
                </BodyLarge>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
