"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { gsap, ScrollTrigger, Observer } from "@/lib/gsap"
import { useLenis } from "@/providers/lenis-provider"
import { Container } from "@/components/common/container"
import { GiroButton } from "@/components/common/giro-button"
import { Magnetic } from "@/components/common/magnetic"
import { ProjectPreviewCard } from "@/components/common/project-preview-card"
import { serviceAreas } from "@/content/services"
import { projects } from "@/content/projects"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { AreaTakeover } from "./takeovers"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

const HomeExperienceScene = dynamic(
  () =>
    import("@/components/three/home-experience-scene").then(
      (m) => m.HomeExperienceScene
    ),
  { ssr: false, loading: () => null }
)

const easeOut = [0.22, 1, 0.36, 1] as const

/**
 * PHASE STATE MACHINE
 * -1 = hero (iniziale)
 * -2 = core-zoom (manifesto)
 * 0..4 = takeover area[i]
 * "outro" = fuori sezione
 */
type VisibleContent = "hero" | "manifesto" | "area" | "none"

/**
 * Home experience unificata — una sola sezione pinned con Canvas 3D persistente.
 * Progress timeline (0..1):
 *   0.00-0.10  phase "hero"     — pianeti orbitanti, testo claim
 *   0.10-0.14  transizione A→B (coreZoom 0→1, hero fade out)
 *   0.14-0.20  phase "manifesto" — core-zoom gigante + testo manifesto
 *   0.20-0.24  transizione B→C (coreZoom 1→0)
 *   0.24-0.36  takeover Strategia
 *   0.36-0.48  takeover Sviluppo
 *   0.48-0.60  takeover Intelligenza
 *   0.60-0.72  takeover Brand
 *   0.72-0.84  takeover Persone
 *   0.84-1.00  outro — scena base, fade out
 */
export function HomeExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const bgOverlayRef = useRef<HTMLDivElement>(null)

  const activeIdxRef = useRef({ value: -1 })
  const takeoverRef = useRef({ value: 0 })
  const coreZoomRef = useRef({ value: 0 })
  const mouseX = useRef({ value: 0 })
  const mouseY = useRef({ value: 0 })

  const [visible, setVisible] = useState<VisibleContent>("hero")
  const [visibleAreaIdx, setVisibleAreaIdx] = useState<number>(-1)
  const reducedMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  const sviluppoMotionProgress = useMotionValue(0)
  const lenis = useLenis()

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    const handle = (e: MouseEvent) => {
      mouseX.current.value = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY.current.value = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", handle, { passive: true })
    return () => window.removeEventListener("mousemove", handle)
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop || reducedMotion) return
    if (!sectionRef.current || !pinRef.current || !bgOverlayRef.current) return

    const section = sectionRef.current
    const pin = pinRef.current
    const overlay = bgOverlayRef.current

    const ctx = gsap.context(() => {
      /**
       * PHASE WINDOWS (progress 0..1) — allineate agli snap points:
       *   hero       : 0.00 - 0.09  (snap 0.00)
       *   manifesto  : 0.13 - 0.21  (snap 0.16, coreZoom peak 0.12-0.22)
       *   takeover i : 0.24 + i*0.14 → 0.24 + (i+1)*0.14   [5 aree × 0.14 = 0.70]
       *                snap ai plateau 0.30, 0.44, 0.58, 0.72, 0.86
       *   outro      : 0.94 - 1.00  (snap 1.00)
       */
      const takeoverCell = 0.14
      const takeoverStart = 0.24

      /** Deriva lo state UI dal progress — unica fonte di verità */
      function phaseFromProgress(p: number): { vis: VisibleContent; areaIdx: number } {
        if (p < 0.09) return { vis: "hero", areaIdx: -1 }
        if (p < 0.13) return { vis: "none", areaIdx: -1 } // dissolve hero → manifesto
        if (p < 0.21) return { vis: "manifesto", areaIdx: -1 }
        if (p < takeoverStart) return { vis: "none", areaIdx: -1 } // dissolve manifesto → area 0
        // Takeover windows
        const relative = p - takeoverStart
        const cellIdx = Math.floor(relative / takeoverCell)
        if (cellIdx >= 0 && cellIdx < serviceAreas.length) {
          const within = relative - cellIdx * takeoverCell
          // Finestra visibile ampia: fade-in/out solo nei primi/ultimi 1.5% del cell
          // — cosi' il contenuto resta visibile anche se lo snap non atterra esatto
          if (within < 0.015) return { vis: "none", areaIdx: -1 }
          if (within > takeoverCell - 0.015) return { vis: "none", areaIdx: -1 }
          return { vis: "area", areaIdx: cellIdx }
        }
        return { vis: "none", areaIdx: -1 }
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "home-exp",
          trigger: section,
          start: "top top",
          end: "+=900%",
          scrub: 1.1,
          pin: pin,
          pinType: "transform",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Niente snap nativo: sotto c'è un Observer che blocca lo scroll a step
          onUpdate: (self) => {
            const p = self.progress

            // CORE ZOOM — peak plateau 0.13-0.21 (manifesto window)
            let coreZoom = 0
            if (p >= 0.09 && p < 0.13) coreZoom = (p - 0.09) / 0.04
            else if (p >= 0.13 && p < 0.21) coreZoom = 1
            else if (p >= 0.21 && p < 0.24) coreZoom = 1 - (p - 0.21) / 0.03
            coreZoomRef.current.value = coreZoom

            // TAKEOVER
            let takeover = 0
            let activeIdx = -1
            if (p >= takeoverStart) {
              const relative = p - takeoverStart
              const cellIdx = Math.floor(relative / takeoverCell)
              if (cellIdx >= 0 && cellIdx < serviceAreas.length) {
                const within = relative - cellIdx * takeoverCell
                activeIdx = cellIdx
                if (within < 0.015) takeover = within / 0.015
                else if (within > takeoverCell - 0.015)
                  takeover = (takeoverCell - within) / 0.015
                else takeover = 1
                takeover = Math.max(0, Math.min(1, takeover))

                // BG overlay color
                const area = serviceAreas[cellIdx]!
                const alpha = Math.round(takeover * 0xcc)
                  .toString(16)
                  .padStart(2, "0")
                overlay.style.backgroundColor = `${area.color}${alpha}`

                // Sub-progress for Sviluppo (cellIdx 1) — drives ContainerScroll
                if (cellIdx === 1) {
                  sviluppoMotionProgress.set(Math.max(0, Math.min(1, within / takeoverCell)))
                }
              }
            } else {
              overlay.style.backgroundColor = "transparent"
              sviluppoMotionProgress.set(0)
            }
            takeoverRef.current.value = takeover
            activeIdxRef.current.value = activeIdx

            // UI STATE (setState only on change — performance)
            const { vis, areaIdx } = phaseFromProgress(p)
            setVisible((prev) => (prev !== vis ? vis : prev))
            setVisibleAreaIdx((prev) => (prev !== areaIdx ? areaIdx : prev))
          },
        },
      })

      // Track vuoto: lasciamo che onUpdate gestisca tutto
      tl.to({}, { duration: 1 })
    }, section)

    return () => ctx.revert()
  }, [isDesktop, reducedMotion])

  /**
   * SCROLL A STEP — Observer intercetta ogni wheel/touch e fa scrollTo allo snap
   * successivo (o precedente). Niente "salto di piu' sezioni con uno scroll".
   * Snap points al CENTRO visibile di ogni area (non ai bordi dove la fade e' a 0).
   */
  useEffect(() => {
    if (!isDesktop || reducedMotion || !lenis || !sectionRef.current) return

    // Centri visibili: hero, manifesto, Strategia, Sviluppo×3 tab, Intelligenza, Brand, Persone, outro
    const SNAP_POINTS = [0, 0.17, 0.30, 0.405, 0.455, 0.492, 0.59, 0.73, 0.87, 0.97]
    const EPSILON = 0.002
    let isAnimating = false
    let observer: Observer | undefined

    const killObserver = () => {
      observer?.kill()
      observer = undefined
    }

    const advance = (dir: 1 | -1) => {
      if (isAnimating) return
      const st = ScrollTrigger.getById("home-exp")
      if (!st) return

      const currentProgress = st.progress

      // Trova prossimo snap nella direzione di scroll (mai skippa: sempre quello adiacente)
      let targetIdx = -1
      if (dir > 0) {
        for (let i = 0; i < SNAP_POINTS.length; i++) {
          if (SNAP_POINTS[i]! > currentProgress + EPSILON) {
            targetIdx = i
            break
          }
        }
      } else {
        for (let i = SNAP_POINTS.length - 1; i >= 0; i--) {
          if (SNAP_POINTS[i]! < currentProgress - EPSILON) {
            targetIdx = i
            break
          }
        }
      }

      // Oltre i confini — esci dal pin e lascia scrollare normalmente
      if (targetIdx === -1) {
        killObserver()
        const exit = dir > 0 ? st.end + 200 : Math.max(0, st.start - 200)
        lenis.scrollTo(exit, { duration: 0.4, lock: true })
        return
      }

      const targetProgress = SNAP_POINTS[targetIdx]!
      const targetScroll = st.start + (st.end - st.start) * targetProgress

      isAnimating = true
      lenis.scrollTo(targetScroll, {
        // Transizione volutamente LENTA: l'utente percepisce un passaggio deliberato.
        // Durante i 1.8s isAnimating blocca ulteriori wheel → serve riscrollare dopo.
        duration: 1.8,
        // easeInOutCubic — graduale, non scattante
        easing: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        lock: true,
        force: true,
        onComplete: () => {
          // Cooldown di 250ms — non accetta altri wheel immediatamente dopo lo snap:
          // cosi' un gesto di trackpad con inertia residua non salta un secondo step.
          setTimeout(() => {
            isAnimating = false
          }, 250)
        },
      })
    }

    const createObserver = () => {
      if (observer) return
      observer = Observer.create({
        target: window,
        type: "wheel,touch",
        // Tolerance 25 = serve un wheel/swipe "deciso" per contare come step.
        // Cosi' il tap piano / coda di inertia del trackpad non fa scattare uno step.
        tolerance: 25,
        dragMinimum: 40,
        preventDefault: true,
        // onDown = utente scrolla in giu' (wheel forward / swipe up) → avanti
        // onUp = utente scrolla in su (wheel back / swipe down) → indietro
        onDown: () => advance(1),
        onUp: () => advance(-1),
      })
    }

    const gate = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onEnter: createObserver,
      onEnterBack: createObserver,
      onLeave: killObserver,
      onLeaveBack: killObserver,
    })

    return () => {
      killObserver()
      gate.kill()
    }
  }, [isDesktop, reducedMotion, lenis])

  /* ═══ Fallback ═══ */

  if (isDesktop === null) return <HomeExperienceFallback />
  if (!isDesktop || reducedMotion) return <HomeExperienceFallback />

  return (
    <section
      ref={sectionRef}
      id="home-experience"
      className="relative"
      style={{ height: "1000vh" }}
      aria-label="Il viaggio tra le aree GIRO"
    >
      <div
        ref={pinRef}
        className="h-screen w-full relative overflow-hidden"
        style={{ backgroundColor: "#080d1a" }}
      >
        {/* Canvas 3D UNICA — vive per tutto il pin */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <HomeExperienceScene
            activeIdxRef={activeIdxRef}
            takeoverRef={takeoverRef}
            coreZoomRef={coreZoomRef}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </div>

        {/* Gradient overlay per leggibilità del testo hero */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(8,13,26,0.7) 0%, rgba(8,13,26,0) 28%, rgba(8,13,26,0) 70%, rgba(8,13,26,0.75) 100%)",
          }}
          aria-hidden
        />

        {/* Background overlay colore takeover */}
        <div
          ref={bgOverlayRef}
          className="absolute inset-0 pointer-events-none z-20"
          style={{ mixBlendMode: "multiply" }}
          aria-hidden
        />

        {/* Content overlays */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <AnimatePresence mode="wait">
            {visible === "hero" && <HeroContent key="hero" />}
            {visible === "manifesto" && <ManifestoContent key="manifesto" />}
            {visible === "area" && visibleAreaIdx >= 0 && serviceAreas[visibleAreaIdx] && (
              <AreaTakeover
                key={serviceAreas[visibleAreaIdx].slug}
                slug={serviceAreas[visibleAreaIdx].slug}
                motionProgress={visibleAreaIdx === 1 ? sviluppoMotionProgress : undefined}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicator globale */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
          {serviceAreas.map((area, i) => (
            <div
              key={area.slug}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: visibleAreaIdx === i ? "36px" : "12px",
                background:
                  visibleAreaIdx === i ? "#ffffff" : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════
 * CONTENT OVERLAYS
 * ═══════════════════════════════════════════════════════════════════ */

function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute inset-0 flex flex-col"
    >
      {/* Top */}
      <Container className="relative pt-16 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="text-[11px] tracking-[0.4em] uppercase text-[var(--color-blue-light)] text-center mb-5"
        >
          Consulenza digitale · Catania
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-center max-w-5xl mx-auto"
        >
          Un solo partner.
          <br />
          <em className="not-italic" style={{ color: "var(--color-blue)" }}>
            Infinite direzioni.
          </em>
        </motion.h1>
      </Container>

      <div className="flex-1" aria-hidden />

      {/* Bottom */}
      <Container className="relative pb-20 md:pb-24 pointer-events-auto">
        <div className="flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: easeOut }}
            className="max-w-xl text-sm md:text-base text-[var(--color-gray-mid)] leading-relaxed mb-8"
          >
            Al centro del tuo progetto, in ogni fase. Strategia, sviluppo e AI per
            la trasformazione digitale delle PMI italiane.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Magnetic>
              <GiroButton variant="primary" size="lg" href="/contatti">
                Prenota una call
              </GiroButton>
            </Magnetic>
            <GiroButton variant="outline" size="lg" href="/servizi">
              Scopri i servizi
            </GiroButton>
          </motion.div>
        </div>
      </Container>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gray-mid)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--color-blue)] to-transparent"
        />
      </motion.div>
    </motion.div>
  )
}

function ManifestoContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Gradient arancione radiale animato (respiro) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.85, 1, 0.85],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at center, #ff8a3d 0%, rgba(255,138,61,0.8) 25%, rgba(255,138,61,0.35) 55%, rgba(8,13,26,0.2) 80%, transparent 100%)",
        }}
      />
      {/* Noise overlay sottile per texture cinematografica */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          mixBlendMode: "overlay",
        }}
      />

      <Container>
        <div className="relative text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut }}
            className="text-[11px] tracking-[0.4em] uppercase mb-6 font-semibold"
            style={{ color: "#2a1810" }}
          >
            Il nostro manifesto
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: easeOut }}
            className="font-display font-bold leading-[1.08] tracking-tight text-4xl md:text-6xl lg:text-7xl mb-6"
            style={{
              color: "#0d1424",
              textShadow: "0 2px 24px rgba(255, 255, 255, 0.3)",
            }}
          >
            Al centro del tuo progetto,
            <br />
            <em className="not-italic" style={{ color: "#4a1a0a" }}>
              in ogni fase.
            </em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: easeOut }}
            className="max-w-xl mx-auto text-base md:text-lg leading-relaxed font-medium"
            style={{ color: "#1a0f08" }}
          >
            Dal 2018 affianchiamo PMI italiane nella trasformazione digitale.
            <br />
            Una relazione di fiducia, non un fornitore.
          </motion.p>
        </div>
      </Container>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
 * FALLBACK — mobile / reduced-motion
 * ═══════════════════════════════════════════════════════════════════ */

function HomeExperienceFallback() {
  return (
    <>
      {/* Hero statico semplificato */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: "#080d1a" }}>
        <Container>
          <div className="text-center">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[var(--color-blue-light)] mb-5">
              Consulenza digitale · Catania
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-8 max-w-3xl mx-auto">
              Un solo partner.{" "}
              <em className="not-italic" style={{ color: "var(--color-blue)" }}>
                Infinite direzioni.
              </em>
            </h1>
            <p className="max-w-xl mx-auto text-base text-[var(--color-gray-mid)] leading-relaxed mb-8">
              Al centro del tuo progetto, in ogni fase. Strategia, sviluppo e AI per
              la trasformazione digitale delle PMI italiane.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GiroButton variant="primary" size="lg" href="/contatti">
                Prenota una call
              </GiroButton>
              <GiroButton variant="outline" size="lg" href="/servizi">
                Scopri i servizi
              </GiroButton>
            </div>
          </div>
        </Container>
      </section>

      {/* Manifesto statico */}
      <section className="py-20" style={{ backgroundColor: "#0d1424" }}>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color: "#ffb57a" }}>
              Il nostro manifesto
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.1] mb-5">
              Al centro del tuo progetto,{" "}
              <em className="not-italic" style={{ color: "#ffb57a" }}>
                in ogni fase.
              </em>
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-gray-mid)]">
              Dal 2018 affianchiamo PMI italiane nella trasformazione digitale.
              Una relazione di fiducia, non un fornitore.
            </p>
          </div>
        </Container>
      </section>

      {/* Aree — carosello verticale statico */}
      <section className="py-20 relative" style={{ backgroundColor: "#080d1a" }}>
        <Container>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--color-blue)] mb-4">
              Le cinque direzioni
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Un viaggio tra le nostre aree
            </h2>
          </div>
          <div className="space-y-5">
            {serviceAreas.map((area) => {
              const areaProjects = projects.filter((p) => p.areaSlug === area.slug)
              return (
                <div
                  key={area.slug}
                  className="p-6 md:p-8 rounded-2xl border"
                  style={{
                    borderColor: `${area.color}44`,
                    background: `${area.color}12`,
                  }}
                >
                  <div
                    className="text-[10px] tracking-[0.35em] uppercase font-semibold mb-2"
                    style={{ color: area.color }}
                  >
                    {area.tagline}
                  </div>
                  <h3 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--fg)" }}>
                    {area.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-gray-mid)] mb-4">
                    {area.description}
                  </p>
                  {area.slug === "sviluppo" ? (
                    <ContainerScroll />
                  ) : areaProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {areaProjects.map((p) => (
                        <ProjectPreviewCard key={p.id} project={p} />
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    </>
  )
}
