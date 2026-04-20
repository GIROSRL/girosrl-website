"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { Label, Heading2 } from "@/components/common/typography"

const easeOut = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    num: "01",
    title: "Ascolto",
    description:
      "Partiamo dal tuo business, dalle persone e dai numeri. Mappiamo obiettivi e ostacoli reali.",
  },
  {
    num: "02",
    title: "Strategia",
    description:
      "Roadmap con priorità chiare, KPI e deliverable. Senza sorprese di budget o timeline.",
  },
  {
    num: "03",
    title: "Esecuzione",
    description:
      "Un solo team, tutte le competenze. Sprint settimanali, ogni venerdì una review con demo.",
  },
  {
    num: "04",
    title: "Crescita",
    description:
      "Lanciato non è finito. Monitoraggio, iterazione, ottimizzazione. Cresciamo con te.",
  },
]

export function Methodology() {
  return (
    <Section size="lg" id="metodologia" className="relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-16 md:mb-20 max-w-3xl"
        >
          <Label className="mb-4 text-[var(--color-blue)]">Come lavoriamo</Label>
          <Heading2>
            Un metodo preciso.{" "}
            <em className="text-[var(--color-blue)] not-italic">
              Dal primo incontro al lancio.
            </em>
          </Heading2>
        </motion.div>

        {/* Steps grid */}
        <div className="relative">
          {/* Connecting orbit line (desktop) */}
          <svg
            aria-hidden
            className="hidden md:block absolute top-20 left-0 right-0 w-full pointer-events-none"
            style={{ height: "2px" }}
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <motion.line
              x1="0"
              x2="100"
              y1="1"
              y2="1"
              stroke="var(--color-blue-dark)"
              strokeWidth="0.25"
              strokeDasharray="0.5 0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: easeOut }}
                className="relative"
              >
                {/* Number badge with orbital ring */}
                <div className="relative w-16 h-16 mb-6">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-[var(--color-blue-dark)]"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(58,143,232,0.15) 0%, transparent 70%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-[-6px] rounded-full border border-[var(--color-navy-light)] opacity-60"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold"
                    style={{ color: "var(--color-blue)" }}
                  >
                    {step.num}
                  </div>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-gray-mid)]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
