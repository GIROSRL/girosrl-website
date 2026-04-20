import type { ServicePath } from "@/types/content"

/**
 * I 3 percorsi integrati GIRO.
 * Ogni percorso combina più aree di servizio per rispondere
 * a un momento di vita specifico dell'azienda cliente.
 */
export const paths: ServicePath[] = [
  {
    slug: "parti",
    title: "Parti",
    tagline: "Da zero a presenza digitale",
    description:
      "Per chi sta nascendo o vuole ricominciare con basi solide. Identità, sito, primi contenuti, strategia iniziale. Tutto quello che serve per esistere bene nel digitale.",
    aree: ["strategia", "sviluppo", "brand"],
    perChi:
      "Startup in lancio, aziende che rifondano la propria presenza digitale, imprenditori che partono con un nuovo progetto.",
    order: 1,
    href: "/percorsi/parti",
    profiliCliente: [
      "Startup pre-seed / seed con primo round in mano",
      "PMI storiche che non hanno mai avuto un sito decente",
      "Imprenditori che aprono una seconda azienda o un brand figlio",
      "Professionisti che vogliono posizionarsi sul mercato digitale",
    ],
    fasi: [
      {
        numero: 1,
        titolo: "Brand + strategia",
        descrizione:
          "Brief, identità visiva, voce, positioning. Gettiamo le fondamenta su cui tutto poggerà.",
        area: "brand",
      },
      {
        numero: 2,
        titolo: "Sito web",
        descrizione:
          "Sito vetrina o landing con Next.js. Performance, SEO base, form contatti operativi.",
        area: "sviluppo",
      },
      {
        numero: 3,
        titolo: "Contenuti di lancio",
        descrizione:
          "Primi 10 contenuti editoriali, piano social 30gg, foto prodotto base.",
        area: "brand",
      },
      {
        numero: 4,
        titolo: "Roadmap 6 mesi",
        descrizione:
          "Piano strategico per i prossimi 6 mesi: cosa fare, cosa rimandare, KPI minimi.",
        area: "strategia",
      },
    ],
    risultati: [
      {
        metric: "100%",
        label: "Pronto al lancio",
        sublabel: "sito, identità, primi contenuti",
      },
      {
        metric: "6-8",
        label: "Settimane totali",
        sublabel: "dal brief al go-live",
      },
      {
        metric: "€5k+",
        label: "Budget indicativo",
        sublabel: "scalabile per dimensione",
      },
    ],
    budgetIndicativo: "da €5.000",
    durataIndicativa: "6-8 settimane",
    metaTitle: "Percorso Parti: da zero a presenza digitale | GIRO SRL",
    metaDescription:
      "Pacchetto completo per startup e PMI che partono: brand, sito, contenuti, strategia. 6-8 settimane, da €5k.",
  },

  {
    slug: "cresci",
    title: "Cresci",
    tagline: "Da presenza a performance",
    description:
      "Per chi c'è già ma vuole crescere in modo misurabile. Marketing che genera lead, CRM che non lascia perdere nessuno, dati che guidano le decisioni.",
    aree: ["marketing", "brand", "strategia", "sviluppo"],
    perChi:
      "PMI consolidate che vogliono passare dalla visibilità alla conversione. Aziende pronte a investire in processi commerciali e marketing misurabili.",
    order: 2,
    href: "/percorsi/cresci",
    profiliCliente: [
      "E-commerce con traffico ma bassa conversione",
      "PMI B2B con sales cycle lunghi da efficientare",
      "Aziende che hanno rifatto il sito ma non vedono risultati",
      "Brand che investono in marketing ma non misurano ROAS",
    ],
    fasi: [
      {
        numero: 1,
        titolo: "Audit performance",
        descrizione:
          "Analisi canali attuali, benchmark, competitor, setup analytics corretto.",
        area: "strategia",
      },
      {
        numero: 2,
        titolo: "Marketing engine",
        descrizione:
          "Campagne Meta + Google Ads, pixel setup, audience, creatività A/B testate.",
        area: "marketing",
      },
      {
        numero: 3,
        titolo: "CRM + sales ops",
        descrizione:
          "CRM integrato, automazioni nurture, segmentazione lead, hand-off al team vendite.",
        area: "sviluppo",
      },
      {
        numero: 4,
        titolo: "Dashboard + review",
        descrizione:
          "Dashboard live KPI (CAC, LTV, ROAS). Review settimanale di ottimizzazione.",
        area: "strategia",
      },
    ],
    risultati: [
      {
        metric: "+30%",
        label: "Conversion rate",
        sublabel: "target medio progetti 6 mesi",
      },
      {
        metric: "4-5×",
        label: "ROAS benchmark",
        sublabel: "Meta + Google Ads ottimizzati",
      },
      {
        metric: "€1.5k+",
        label: "Gestione mensile",
        sublabel: "+ budget ads a tua discrezione",
      },
    ],
    budgetIndicativo: "da €1.500/mese",
    durataIndicativa: "minimo 6 mesi (consigliato 12)",
    metaTitle: "Percorso Cresci: marketing misurabile per PMI | GIRO SRL",
    metaDescription:
      "Marketing + sviluppo + strategia per crescere davvero: ads, CRM, dashboard, ottimizzazione continua. Minimo 6 mesi, ROAS benchmark 4-5×.",
  },

  {
    slug: "trasforma",
    title: "Trasforma",
    tagline: "Da azienda a organizzazione digitale",
    description:
      "Per chi vuole ripensare l'intera operatività. AI e automazione, ridisegno dei processi, strumenti interni su misura.",
    aree: ["strategia", "intelligenza", "sviluppo"],
    perChi:
      "Aziende strutturate che vogliono introdurre AI, automatizzare processi ripetitivi, e allineare strumenti e workflow attorno a una nuova visione digitale.",
    order: 3,
    href: "/percorsi/trasforma",
    profiliCliente: [
      "PMI 50+ dipendenti con processi ripetitivi da automatizzare",
      "Aziende manifatturiere che vogliono integrare AI in qualità/logistica",
      "Studi professionali con knowledge aziendale sparso in mille cartelle",
      "Servizi B2B che devono scalare senza assumere il doppio del team",
    ],
    fasi: [
      {
        numero: 1,
        titolo: "Assessment AI-readiness",
        descrizione:
          "Audit processi, identificazione 3-5 use case ad alto ROI, mappa dipendenze.",
        area: "strategia",
      },
      {
        numero: 2,
        titolo: "Proof of concept AI",
        descrizione:
          "Primo agente AI o automazione critica, testato su dati reali in 3 settimane.",
        area: "intelligenza",
      },
      {
        numero: 3,
        titolo: "Strumenti interni custom",
        descrizione:
          "Dashboard, CRM evoluti, knowledge base, sistemi di collaborazione ridisegnati.",
        area: "sviluppo",
      },
      {
        numero: 4,
        titolo: "Rollout + change",
        descrizione:
          "Formazione team, change management, review trimestrale dei processi trasformati.",
        area: "strategia",
      },
    ],
    risultati: [
      {
        metric: "8-20h",
        label: "Risparmiate / settimana",
        sublabel: "a valle di automazioni AI",
      },
      {
        metric: "3-6",
        label: "Mesi al primo ROI",
        sublabel: "misurabile sui processi",
      },
      {
        metric: "€15k+",
        label: "Investimento iniziale",
        sublabel: "progetti pilota",
      },
    ],
    budgetIndicativo: "da €15.000 (progetto pilota)",
    durataIndicativa: "3-6 mesi pilota, poi roadmap 12-24 mesi",
    metaTitle: "Percorso Trasforma: AI e automazione per PMI | GIRO SRL",
    metaDescription:
      "Trasformazione digitale end-to-end: AI, automazione processi, strumenti interni custom. Da €15k per un pilota, 3-6 mesi al primo ROI misurabile.",
  },
]

export function getPathBySlug(slug: string): ServicePath | undefined {
  return paths.find((p) => p.slug === slug)
}
