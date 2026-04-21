"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { GiroButton } from "@/components/common/giro-button"
import { Magnetic } from "@/components/common/magnetic"

const easeOut = [0.22, 1, 0.36, 1] as const

/**
 * CTA finale con "ricomposizione" orbitale in CSS/SVG.
 * Niente WebGL — risparmiamo il budget 3D solo per l'hero.
 */
export function CtaFinal() {
  return (
    <Section size="lg" id="cta-finale" className="relative overflow-hidden">
      {/* Orbital ring ricomposizione */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <motion.svg
          viewBox="-200 -200 400 400"
          className="w-[90vw] max-w-[700px] aspect-square"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: easeOut }}
        >
          {/* Orbital rings */}
          <motion.circle
            cx="0"
            cy="0"
            r="180"
            fill="none"
            stroke="var(--color-navy-accent)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
            animate={{ rotate: 360 }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...({ transition: { rotate: { duration: 60, ease: "linear", repeat: Infinity } } } as any)}
          />
          <motion.circle
            cx="0"
            cy="0"
            r="120"
            fill="none"
            stroke="var(--color-blue-dark)"
            strokeWidth="0.8"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />
          <circle cx="0" cy="0" r="60" fill="none" stroke="var(--color-blue-mid)" strokeWidth="0.4" opacity="0.4" />

          {/* Core */}
          <motion.circle
            cx="0"
            cy="0"
            r="26"
            fill="var(--color-blue)"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: "backOut" }}
            style={{ transformOrigin: "center" }}
          />
          {/* Core glow */}
          <motion.circle
            cx="0"
            cy="0"
            r="50"
            fill="var(--color-blue-light)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 0.2 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            style={{ transformOrigin: "center" }}
          />

          {/* 5 satelliti che tornano al centro */}
          {[
            { angle: 0, r: 180, delay: 1.0, color: "#3a8fe8", size: 6 },
            { angle: 72, r: 120, delay: 1.1, color: "#5bb3f0", size: 5 },
            { angle: 144, r: 180, delay: 1.2, color: "#7ec0f0", size: 5 },
            { angle: 216, r: 120, delay: 1.3, color: "#3a8fe8", size: 6 },
            { angle: 288, r: 180, delay: 1.4, color: "#5bb3f0", size: 5 },
          ].map((sat, i) => {
            const rad = (sat.angle * Math.PI) / 180
            const x = Math.cos(rad) * sat.r
            const y = Math.sin(rad) * sat.r
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={sat.size}
                fill={sat.color}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: sat.delay, ease: "backOut" }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            )
          })}
        </motion.svg>
      </div>

      <Container>
        {/* Niente py-X qui: lo gestisce gia\u0300 <Section size="lg">. Doppia
            padding causava ~400px wasted space su mobile. */}
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: easeOut }}
          >
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-blue)] mb-6">
              Pronto a iniziare?
            </p>
            <h2 className="font-display text-[2.25rem] sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] md:leading-[1.1] tracking-tight max-w-4xl mx-auto break-words">
              Un solo partner.{" "}
              <em className="not-italic text-[var(--color-blue)]">
                Infinite direzioni.
              </em>
            </h2>
            <p className="mt-8 text-base md:text-lg text-[var(--color-gray-mid)] max-w-xl mx-auto">
              Raccontaci il tuo progetto. In una call di 30 minuti capiamo se siamo
              la soluzione giusta per te.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: easeOut }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Magnetic>
              <GiroButton variant="primary" size="lg" href="/contatti">
                Prenota una call gratuita
              </GiroButton>
            </Magnetic>
            <GiroButton variant="ghost" size="lg" href="mailto:info@girosrl.com">
              info@girosrl.com
            </GiroButton>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
