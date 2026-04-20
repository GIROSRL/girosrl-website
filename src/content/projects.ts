import type { AreaSlug } from "@/types/content"

export type ProjectType = "iframe" | "image" | "dashboard-mock"

export type Project = {
  id: string
  type: ProjectType
  title: string
  client: string
  tagline: string
  /** Area di servizio a cui il progetto appartiene */
  areaSlug: AreaSlug
  url?: string
  /** Immagine preview (URL esterno thum.io o path locale /public) */
  image?: string
  tags: string[]
  /** Colore accent della card (hex) */
  accent: string
}

/**
 * Screenshot preview dinamico via thum.io (gratis, cachato lato servizio).
 */
const screenshotOf = (url: string) =>
  `https://image.thum.io/get/width/1440/noanimate/fullpage/${url}`

export const projects: Project[] = [
  // ── SVILUPPO ───────────────────────────────────────────────
  {
    id: "siciliaclassica",
    type: "image",
    title: "Sicilia Classica",
    client: "Sicilia Classica",
    tagline: "Sito + CRM + dashboard gestionale prenotazioni",
    areaSlug: "sviluppo",
    url: "https://siciliaclassica.it",
    image: screenshotOf("https://siciliaclassica.it"),
    tags: ["E-commerce", "Dashboard", "Email automation"],
    accent: "#14d6b4",
  },
  {
    id: "south-unconventional",
    type: "image",
    title: "South Unconventional",
    client: "South Unconventional",
    tagline: "Sito istituzionale + brand identity digitale",
    areaSlug: "sviluppo",
    url: "https://southunconventional.com",
    image: screenshotOf("https://southunconventional.com"),
    tags: ["Sito istituzionale", "Brand digitale"],
    accent: "#14d6b4",
  },
  {
    id: "sicilery",
    type: "image",
    title: "Sicilery",
    client: "Sicilery",
    tagline: "Brand identity + sito + packaging per prodotti siciliani",
    areaSlug: "sviluppo",
    url: "https://www.sicilery.com",
    image: screenshotOf("https://www.sicilery.com"),
    tags: ["Brand", "Sito web", "Packaging"],
    accent: "#14d6b4",
  },

  // ── INTELLIGENZA ───────────────────────────────────────────
  {
    id: "dashboard-analytics",
    type: "dashboard-mock",
    title: "Dashboard operativa",
    client: "Progetto riservato",
    tagline: "Dashboard gestionale custom con AI insights",
    areaSlug: "intelligenza",
    tags: ["Dashboard", "AI", "Automazione"],
    accent: "#9b6dff",
  },

  // ── MARKETING ──────────────────────────────────────────────
  {
    id: "virauto",
    type: "image",
    title: "Virauto Ford Catania",
    client: "Virauto",
    tagline: "8+ anni di gestione marketing, lead e AI su misura",
    areaSlug: "marketing",
    image: "/images/projects/virauto-preview.svg",
    tags: ["Meta Ads", "Google Ads", "Lead gen", "AI custom"],
    accent: "#fbbf24",
  },
  {
    id: "helme",
    type: "image",
    title: "Helmè",
    client: "Helmè",
    tagline: "Content editoriale e social management per uno store luxury lifestyle",
    areaSlug: "marketing",
    image: "/images/projects/helme-preview.svg",
    tags: ["Social management", "Contenuti editoriali", "Luxury lifestyle"],
    accent: "#fbbf24",
  },
]

/** Helper: filtra progetti per area slug */
export function getProjectsByArea(areaSlug: AreaSlug): Project[] {
  return projects.filter((p) => p.areaSlug === areaSlug)
}
