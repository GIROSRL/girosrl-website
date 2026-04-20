export type Locale = "it" | "en"

/** Identificativo delle 5 aree di servizio */
export type AreaSlug =
  | "strategia"
  | "sviluppo"
  | "intelligenza"
  | "brand"
  | "marketing"

/** Identificativo dei 3 percorsi integrati */
export type PathSlug = "parti" | "cresci" | "trasforma"

/** Dati di base di un'area di servizio — usato per home, scena 3D, hub, dettaglio */
export type ServiceArea = {
  slug: AreaSlug
  title: string
  tagline: string
  description: string
  /** Lista sotto-servizi esposti nella card / pagina area */
  items: string[]
  /** Keyword per icona SVG (vedi services-intro.tsx icon mapping) */
  icon: "strategia" | "sviluppo" | "intelligenza" | "brand" | "marketing"
  /** Colore accent principale dell'area (hex) */
  color: string
  /** Colore accent secondario (per gradient / glow) */
  colorSecondary: string
  /** Ordine in homepage + hub + scena 3D */
  order: number
  href: string
  /** Sezione "problema che risolviamo" nella pagina dettaglio */
  problema: {
    title: string
    body: string
    painPoints: string[]
  }
  /** Sezione "il nostro approccio" */
  approccio: {
    title: string
    body: string
    steps: Array<{ num: string; title: string; description: string }>
  }
  /** Cosa ottieni concretamente */
  deliverables: string[]
  /** Domande frequenti */
  faq: FAQ[]
  /** Percorsi (PathSlug) a cui questa area contribuisce */
  percorsiCollegati: PathSlug[]
  /** SEO: title tag e meta description specifici per questa pagina */
  metaTitle: string
  metaDescription: string
}

/** Dati base di un percorso integrato */
export type ServicePath = {
  slug: PathSlug
  title: string
  tagline: string
  description: string
  /** Aree coinvolte nel percorso */
  aree: AreaSlug[]
  /** Descrizione del target cliente */
  perChi: string
  order: number
  href: string
  /** Profili cliente tipici per chi è il percorso (3-4) */
  profiliCliente: string[]
  /** Fasi del percorso (timeline) */
  fasi: PercorsoFase[]
  /** Risultati attesi misurabili */
  risultati: Array<{ metric: string; label: string; sublabel?: string }>
  /** Budget indicativo (placeholder finché non avremo il real) */
  budgetIndicativo: string
  /** Durata indicativa */
  durataIndicativa: string
  /** SEO */
  metaTitle: string
  metaDescription: string
}

/** Frontmatter pagina servizio MDX (Fase 5) */
export type ServizioFrontmatter = {
  slug: AreaSlug
  title: string
  tagline: string
  description: string
  icon: string
  color: string
  order: number
  servizi: string[]
  problemaTitle: string
  problemaBody: string
  approcciTitle: string
  approcciBody: string
  deliverables: string[]
  faq: FAQ[]
  ctaLabel: string
  percorsiCollegati: PathSlug[]
  metaTitle: string
  metaDescription: string
}

/** Frontmatter pagina percorso MDX (Fase 5) */
export type PercorsoFrontmatter = {
  slug: PathSlug
  title: string
  tagline: string
  description: string
  aree: AreaSlug[]
  perChi: string
  risultati: string[]
  fasi: PercorsoFase[]
  ctaLabel: string
  metaTitle: string
  metaDescription: string
}

export type PercorsoFase = {
  numero: number
  titolo: string
  descrizione: string
  area: AreaSlug
}

export type FAQ = {
  question: string
  answer: string
}

/* ─── Blog / Case studies / Team (invariato da Fase 0) ──────────── */

export type BlogPost = {
  slug: string
  locale: Locale
  title: string
  subtitle: string
  description: string
  date: string
  category: string
  tags: string[]
  cover: string
  coverAlt: string
  author: string
  readingTime: number
  keyTakeaways: string[]
  instagramReady: boolean
  published: boolean
}

export type CaseStudy = {
  slug: string
  locale: Locale
  title: string
  subtitle: string
  description: string
  client: string
  sector: string
  services: string[]
  date: string
  cover: string
  coverAlt: string
  results: CaseStudyResult[]
  gallery: string[]
  published: boolean
}

export type CaseStudyResult = {
  metric: string
  value: string
  description: string
}

export type TeamMember = {
  slug: string
  name: string
  role: string
  bio: string
  avatar: string
  linkedin?: string
  order: number
}
