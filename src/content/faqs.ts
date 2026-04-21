/**
 * FAQ content — single source of truth usato sia dal JSON-LD FAQPage schema
 * sia (opzionalmente) da una UI accordion futura. Tutte le risposte sono
 * pensate per il tone-of-voice GIRO: diretto, concreto, zero corporate-speak.
 */

import type { FaqItem } from "@/components/common/json-ld"

/** FAQ montata sulla home — copre le domande piu\u0300 generali sul brand. */
export const homeFaqs: readonly FaqItem[] = [
  {
    q: "Cosa fa GI.R.O. SRL?",
    a: "GI.R.O. SRL è una società di consulenza digitale integrata con sede a Catania. Affianchiamo le PMI italiane nella trasformazione digitale attraverso cinque aree: strategia, sviluppo web, intelligenza artificiale, brand identity e marketing. Un solo partner, infinite direzioni.",
  },
  {
    q: "Dove si trova GI.R.O. SRL?",
    a: "Siamo a Catania, in Viale Ulisse 22 (CAP 95126). Lavoriamo con clienti in tutta Italia sia in presenza sia da remoto.",
  },
  {
    q: "Con che tipo di aziende lavorate?",
    a: "Ci concentriamo su PMI italiane e startup che vogliono crescere con un metodo chiaro. Pochi clienti, seguiti con attenzione: preferiamo una relazione profonda a tanti progetti superficiali.",
  },
  {
    q: "Quanto dura un progetto tipico?",
    a: "Dipende dal percorso scelto. Il percorso Parti (lancio della presenza digitale) copre 6-12 settimane. Cresci (performance e marketing) è un affiancamento continuativo. Trasforma (AI e automazione) parte da 3-6 mesi.",
  },
  {
    q: "Posso avere una consulenza gratuita?",
    a: "Sì. La prima call dura 30 minuti, è completamente gratuita e si prenota direttamente dalla pagina Contatti. Include link Google Meet automatico, zero slide, zero obbligo di continuare.",
  },
  {
    q: "Integrate davvero l'AI nei processi aziendali?",
    a: "Sì. Integriamo AI in modo concreto e privacy-first: chatbot per supporto clienti, OCR per digitalizzare documenti, analisi dati per decisioni data-driven, automazione dei processi ripetitivi. Niente hype, solo soluzioni misurabili.",
  },
]

/** FAQ specifiche per la pagina /servizi — differenze tra aree, costi, tecnologie. */
export const serviziFaqs: readonly FaqItem[] = [
  {
    q: "Qual è la differenza tra un'area di servizio e un percorso?",
    a: "Le 5 aree (strategia, sviluppo, intelligenza, brand, marketing) sono competenze verticali. I 3 percorsi (Parti, Cresci, Trasforma) sono combinazioni di aree studiate per il momento di vita della tua azienda. Puoi ingaggiarci su una singola area o su un percorso integrato.",
  },
  {
    q: "Posso scegliere solo una delle cinque aree?",
    a: "Certo. Ogni area può essere ingaggiata singolarmente: ad esempio solo sviluppo web per un sito, solo branding per un refresh di identità, solo AI per un chatbot. La forza sta nell'averle tutte sotto un unico interlocutore, ma non sei obbligato a comprarle tutte.",
  },
  {
    q: "Che tecnologie usate per sviluppo e AI?",
    a: "Sviluppo: stack moderno (Next.js, TypeScript, Supabase, Vercel) con performance e SEO garantite. AI: LLM leader del mercato integrati in modo sicuro, con gestione privacy GDPR-compliant e guardrail su dati sensibili.",
  },
  {
    q: "Quanto costa un progetto?",
    a: "Dipende da scope e complessità. Dopo la call gratuita di 30 minuti ti mandiamo un preventivo chiaro con milestone e tempi. Nessun pricing nascosto, nessuna sorpresa in corso d'opera.",
  },
]
