import type { AreaSlug } from "@/types/content"

/**
 * Configurazione scena orbitale hero GIRO SRL.
 * Ogni satellite rappresenta una delle 5 aree di servizio.
 * Le posizioni (radius, angle, tilt) sono visivamente bilanciate — i colori
 * seguono la palette per-area definita in `src/content/services.ts`.
 */
export type Satellite = {
  id: AreaSlug
  label: string
  href: string
  /** Raggio orbitale (unità scena) */
  radius: number
  /** Posizione angolare iniziale in gradi (0 = est, 90 = nord) */
  startAngleDeg: number
  /** Velocità orbitale (rad/s) — positiva = antioraria */
  speed: number
  /** Dimensione sfera satellite */
  size: number
  /** Inclinazione orbita sull'asse X (rad) */
  tiltX: number
  /** Inclinazione orbita sull'asse Z (rad) */
  tiltZ: number
  /** Colore principale satellite (coerente con serviceAreas[].color) */
  color: string
  /** Intensità emissive per bloom */
  emissive: number
}

export const satellites: Satellite[] = [
  {
    id: "strategia",
    label: "Strategia",
    href: "/servizi/strategia",
    radius: 2.2,
    startAngleDeg: 0,
    speed: 0.18,
    size: 0.18,
    tiltX: 0.15,
    tiltZ: 0,
    color: "#3a8fe8", // blu brand
    emissive: 3.2,
  },
  {
    id: "sviluppo",
    label: "Sviluppo",
    href: "/servizi/sviluppo",
    radius: 2.9,
    startAngleDeg: 72,
    speed: 0.12,
    size: 0.22,
    tiltX: -0.1,
    tiltZ: 0.2,
    color: "#14d6b4", // teal saturo — distinto da Strategia (blu) e Persone (verde pastello)
    emissive: 3.5,
  },
  {
    id: "intelligenza",
    label: "Intelligenza",
    href: "/servizi/intelligenza",
    radius: 3.6,
    startAngleDeg: 144,
    speed: 0.09,
    size: 0.18,
    tiltX: 0.25,
    tiltZ: -0.15,
    color: "#9b6dff", // viola elettrico — AI
    emissive: 4.0,
  },
  {
    id: "brand",
    label: "Brand",
    href: "/servizi/brand",
    radius: 2.5,
    startAngleDeg: 216,
    speed: 0.15,
    size: 0.2,
    tiltX: -0.2,
    tiltZ: 0.1,
    color: "#ff9eb1", // rosa-pesca — creatività
    emissive: 3.2,
  },
  {
    id: "marketing",
    label: "Marketing",
    href: "/servizi/marketing",
    radius: 3.2,
    startAngleDeg: 288,
    speed: 0.11,
    size: 0.2,
    tiltX: 0.1,
    tiltZ: -0.25,
    color: "#fbbf24", // giallo-ambra — amplificazione, energia
    emissive: 3.5,
  },
]

/** Colori della scena base (non per-area) */
export const sceneColors = {
  bg: "#080d1a",
  core: "#ff8a3d", // arancione caldo — centro gravitazionale del cliente
  coreGlow: "#ffb57a",
  orbitLine: "#3a8fe8",
  orbitLineDim: "#1a3a6e",
  starfield: "#8a9ab5",
}
