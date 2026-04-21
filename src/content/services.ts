import type { ServiceArea } from "@/types/content"

/**
 * Le 5 aree di servizio GIRO SRL.
 * Copy v2 — aggiornato con risposte reali del founder (Nov 2025).
 */
export const serviceAreas: ServiceArea[] = [
  {
    slug: "strategia",
    title: "Strategia",
    tagline: "Direzione, visione, metodo",
    description:
      "Quando la tecnologia corre più veloce delle decisioni, serve qualcuno che si siede accanto a te, ascolta, e aiuta a mettere a fuoco. Partiamo da una conversazione, non da un listino.",
    items: [
      "Consulenza strategica digital",
      "Digital transformation per PMI",
      "Analisi processi aziendali",
      "Data strategy & governance",
      "Roadmap 6-18 mesi",
    ],
    icon: "strategia",
    color: "#3a8fe8",
    colorSecondary: "#5bb3f0",
    order: 1,
    href: "/servizi/strategia",
    problema: {
      title: "La tecnologia cambia ogni sei mesi. Tu non devi rincorrerla, devi dirigerla.",
      body: "Il problema reale delle PMI italiane non è scegliere tra WordPress e Webflow. È capire dove sta andando il proprio business e cosa serve davvero oggi — non fra due anni. Noi partiamo da una chiacchierata onesta e costruiamo un piano che ti rispecchia.",
      painPoints: [
        "Troppi fornitori, nessuno che guarda il quadro d'insieme",
        "Strumenti digitali che si accumulano senza integrarsi",
        "Dati in Excel, decisioni a sentimento",
        "Budget spesi senza un KPI di ritorno chiaro",
      ],
    },
    approccio: {
      title: "Ascoltiamo, studiamo, consegniamo. Poi rimaniamo.",
      body: "Seguiamo pochi clienti alla volta, volutamente. Questo ci permette di entrare nel tuo business prima di proporre soluzioni.",
      steps: [
        {
          num: "01",
          title: "Ascolto",
          description:
            "Una call conoscitiva senza costo. Capiamo chi sei, dove sei, dove vuoi andare.",
        },
        {
          num: "02",
          title: "Studio",
          description:
            "Analizziamo processi, dati e strumenti esistenti. Mappiamo cosa funziona e cosa no.",
        },
        {
          num: "03",
          title: "Roadmap",
          description:
            "Un piano 6-18 mesi con priorità chiare, KPI misurabili e budget realistici.",
        },
        {
          num: "04",
          title: "Supporto",
          description:
            "Dashboard di monitoraggio quando serve, review periodiche, correzione di rotta.",
        },
      ],
    },
    deliverables: [
      "Roadmap strategica 6-18 mesi",
      "Mappatura processi e flussi di dato",
      "KPI framework personalizzato (quando ha senso)",
      "Dashboard di supporto per monitorare l'andamento",
      "Review periodiche e correzioni di rotta",
    ],
    faq: [
      {
        question: "La call conoscitiva iniziale costa qualcosa?",
        answer:
          "No. È gratuita e senza impegno. Anche solo da una chiacchierata possono nascere idee utili al tuo business — che poi decidi tu se portare avanti con noi o da solo.",
      },
      {
        question: "Quanto dura un percorso di consulenza strategica?",
        answer:
          "Per la fase di assessment + roadmap tipicamente 4-6 settimane. Poi la governance è continua, con review quando ha senso per il tuo momento.",
      },
      {
        question: "Lavorate anche fuori da Catania?",
        answer:
          "Sì. Abbiamo sede a Catania ma lavoriamo con clienti in tutta Italia, in remoto o con trasferte dove serve.",
      },
      {
        question: "Seguite molti clienti contemporaneamente?",
        answer:
          "No, volutamente pochi. È una scelta: preferiamo dedicarci davvero invece che fare tanti progetti mediocri.",
      },
    ],
    percorsiCollegati: ["parti", "cresci", "trasforma"],
    metaTitle: "Consulenza Strategica Digital per PMI | GI.R.O. SRL Catania",
    metaDescription:
      "Consulenza strategica per la trasformazione digitale delle PMI. Roadmap, KPI, digital transformation. GI.R.O. SRL — Catania.",
  },

  {
    slug: "sviluppo",
    title: "Sviluppo",
    tagline: "Costruiamo ciò che serve",
    description:
      "Siti web, e-commerce, dashboard gestionali, web app su misura. Scegliamo la tecnologia giusta per ogni progetto — non vendiamo lo stesso stack a tutti.",
    items: [
      "Siti web e landing ad alta performance",
      "E-commerce su misura",
      "Dashboard gestionali per analisi del dato",
      "Web app e portali custom",
      "CRM integrati e sales operations",
    ],
    icon: "sviluppo",
    color: "#14d6b4",
    colorSecondary: "#5fe9cf",
    order: 2,
    href: "/servizi/sviluppo",
    problema: {
      title: "I tuoi strumenti digitali dovrebbero farti guadagnare tempo, non rubartelo.",
      body: "I nostri progetti nascono spesso da fogli Excel che sono diventati ingestibili, da siti che caricano lenti, da processi amministrativi che vengono fatti a mano ogni mese. Trasformiamo tutto questo in sistemi puliti, veloci e davvero tuoi.",
      painPoints: [
        "Sito lento che perde visite e posizionamento",
        "Dati sparsi in 5 Excel diversi e mai aggiornati",
        "Gestionali rigidi che il team non usa",
        "Processi amministrativi fatti a mano ogni mese",
      ],
    },
    approccio: {
      title: "Stack moderno, codice pulito, tutto di tua proprietà.",
      body: "Usiamo le tecnologie più mature del momento (Next.js, TypeScript, Supabase, Vercel) abbinate a strumenti AI che ci permettono di consegnare più veloce e meglio. Il codice è tuo al 100%, hosting incluso il primo anno.",
      steps: [
        {
          num: "01",
          title: "Brief",
          description:
            "Definiamo insieme flussi utente, funzionalità essenziali, priorità.",
        },
        {
          num: "02",
          title: "Design",
          description:
            "Mockup navigabili prima di scrivere una riga di codice. Zero sorprese.",
        },
        {
          num: "03",
          title: "Sviluppo",
          description:
            "Consegne settimanali, demo al venerdì, feedback continuo.",
        },
        {
          num: "04",
          title: "Lancio + cura",
          description:
            "Deploy, garanzia 30 giorni, poi manutenzione su misura.",
        },
      ],
    },
    deliverables: [
      "Sito web, e-commerce o web app performante e responsive",
      "Dashboard gestionale collegata ai tuoi dati reali",
      "CRM integrato con flussi email automatici (per BDC, operativo, management)",
      "Hosting + dominio + email professionali attivati",
      "Formazione team + garanzia 30 giorni post-lancio",
    ],
    faq: [
      {
        question: "Quanto dura un progetto?",
        answer:
          "Un sito vetrina o una web app semplice tipicamente in 15 giorni. Progetti più complessi (e-commerce strutturati, dashboard con integrazioni) da 4 a 8 settimane. Lavoriamo pochi progetti alla volta, quindi la stima è realistica.",
      },
      {
        question: "Fornite manutenzione dopo il lancio?",
        answer:
          "Sì, sempre. Il lancio include 30 giorni di garanzia su bug critici. Per l'evoluzione continua proponiamo un canone mensile su misura o interventi on-demand, decidiamo insieme in base al progetto.",
      },
      {
        question: "Il codice è nostro al 100%?",
        answer:
          "Sì. Repository, hosting, dominio, account provider: tutto intestato a te. Puoi cambiare fornitore quando vuoi, senza essere legato a noi.",
      },
      {
        question: "Che tecnologie usate?",
        answer:
          "Scegliamo in base al progetto. Per il web moderno: Next.js + TypeScript + Tailwind. Per dati e backend: Supabase (Postgres) o stack custom. Per email: Resend. Per deploy: Vercel. Nessun CMS obsoleto, nessun vendor lock-in.",
      },
    ],
    percorsiCollegati: ["parti", "cresci", "trasforma"],
    metaTitle: "Sviluppo Web, E-commerce e Web App su Misura | GI.R.O. SRL",
    metaDescription:
      "Realizziamo siti web, e-commerce, dashboard gestionali e web app su misura. Tecnologie moderne, performance garantita. GI.R.O. SRL — Catania.",
  },

  {
    slug: "intelligenza",
    title: "Intelligenza",
    tagline: "AI che lavora per te, non al posto tuo",
    description:
      "Chat integrate nelle dashboard, riconoscimento documenti via OCR, analisi dati automatizzata. Usiamo l'intelligenza artificiale per risolvere problemi concreti — con privacy garantita.",
    items: [
      "Chat AI integrate nelle dashboard aziendali",
      "OCR + AI per analisi documenti",
      "Automazione processi ripetitivi",
      "Knowledge base intelligenti su dati tuoi",
      "Agenti AI personalizzati",
    ],
    icon: "intelligenza",
    color: "#9b6dff",
    colorSecondary: "#c8a5ff",
    order: 3,
    href: "/servizi/intelligenza",
    problema: {
      title: "L'AI non è una moda. È uno strumento, se sai dove usarlo.",
      body: "Il team passa ore a ricontrollare documenti? I dati in dashboard servono 8 chiamate per essere interpretati? Le email di conferma si scrivono ancora a mano? L'AI risolve questi problemi quotidiani. Il resto è fuffa.",
      painPoints: [
        "Il team perde ore ad analizzare documenti (fatture, certificati, moduli)",
        "I dati ci sono ma nessuno li legge davvero",
        "Customer support sommerso dalle stesse domande",
        "Processi amministrativi ripetitivi che non si automatizzano mai",
      ],
    },
    approccio: {
      title: "Un caso d'uso concreto alla volta. Privacy garantita.",
      body: "Non ti vendiamo 'l'AI'. Ti proponiamo una soluzione per un problema preciso, testata su dati reali, con un proof of concept in 2-3 settimane. Tutto privato, tutto on-prem o su provider GDPR-compliant.",
      steps: [
        {
          num: "01",
          title: "Use case",
          description:
            "Identifichiamo dove l'AI fa davvero la differenza nel tuo lavoro.",
        },
        {
          num: "02",
          title: "Proof of concept",
          description:
            "Prototipo funzionante in 2-3 settimane sui tuoi dati reali.",
        },
        {
          num: "03",
          title: "Integrazione",
          description:
            "L'agente entra nei tuoi flussi (dashboard, email, gestionale).",
        },
        {
          num: "04",
          title: "Monitoraggio",
          description:
            "Controllo qualità, fine-tuning, costi API sempre sotto controllo.",
        },
      ],
    },
    deliverables: [
      "Chat AI integrata nella tua dashboard per interrogare dati",
      "Sistema OCR + AI per analisi automatica di documenti",
      "Automazioni per email, report o operazioni ripetitive",
      "Knowledge base vettoriale sui tuoi documenti aziendali",
      "Infrastruttura privacy-first (GDPR, dati non usati per training)",
    ],
    faq: [
      {
        question: "Quanto costa un progetto AI?",
        answer:
          "Dipende dalla complessità. I proof of concept entry-level partono da €1.500-2.000. Progetti medi (agente AI integrato in dashboard) €3.000-6.000. Progetti grandi custom fino a €25.000.",
      },
      {
        question: "I nostri dati restano privati?",
        answer:
          "Sì. Lavoriamo con provider GDPR-compliant (Anthropic, OpenAI enterprise) o con deployment on-premise. Nessun dato viene usato per addestrare modelli pubblici.",
      },
      {
        question: "Esempio di progetto AI reale?",
        answer:
          "Per un concessionario auto a Catania abbiamo sviluppato una web app che analizza automaticamente i documenti della legge 104 dei clienti. Prima richiedeva ore di controllo manuale, ora è fatto in secondi, in modo riservato.",
      },
      {
        question: "Da dove conviene partire?",
        answer:
          "Da un caso d'uso concreto che ti ruba tempo ogni settimana. Non da 'voglio l'AI'. In una call conoscitiva identifichiamo il punto di partenza a massimo ROI.",
      },
    ],
    percorsiCollegati: ["trasforma"],
    metaTitle: "Intelligenza Artificiale per Aziende | AI & Automazione | GI.R.O.",
    metaDescription:
      "Integriamo AI nelle aziende: chatbot, OCR, analisi dati, automazione processi. Soluzioni concrete con privacy garantita. GI.R.O. SRL — Catania.",
  },

  {
    slug: "brand",
    title: "Brand",
    tagline: "Come il valore arriva al mercato",
    description:
      "Logo, palette, tipografia, brandbook e applicazioni. Costruiamo identità visive che crescono nel tempo, coordinandoci con una rete di designer selezionati.",
    items: [
      "Logo e studio identità visiva",
      "Palette colori e tipografia",
      "Brandbook base e operativo",
      "Biglietti da visita e materiali stampa",
      "Declinazioni logo per formati diversi",
    ],
    icon: "brand",
    color: "#ff9eb1",
    colorSecondary: "#ffc3cf",
    order: 4,
    href: "/servizi/brand",
    problema: {
      title: "Il brand è quello che i clienti dicono di te quando non sei nella stanza.",
      body: "Un logo generato in 5 minuti con ChatGPT. Tre freelance che hanno fatto pezzi scollegati tra loro. Documenti aziendali con 12 font diversi. Il brand è un sistema — e un sistema non si improvvisa, si costruisce.",
      painPoints: [
        "Logo obsoleto o fatto in fretta che non convince più",
        "Materiali aziendali tutti con stili diversi",
        "Social, sito e biglietti sembrano di 3 aziende diverse",
        "Nessuna linea guida: ogni nuovo collaboratore reinventa tutto",
      ],
    },
    approccio: {
      title: "Una rete di designer selezionati. Un solo coordinatore: noi.",
      body: "Per il brand ci affidiamo a una rete di professionisti con cui collaboriamo stabilmente. Noi siamo il tuo punto di contatto unico: raccogliamo il brief, coordiniamo il lavoro, garantiamo tempi e qualità.",
      steps: [
        {
          num: "01",
          title: "Brief",
          description:
            "Capiamo chi sei, i tuoi valori, il target, il posizionamento.",
        },
        {
          num: "02",
          title: "Concept",
          description:
            "Il designer giusto sul progetto presenta 2-3 proposte motivate.",
        },
        {
          num: "03",
          title: "Sviluppo",
          description:
            "Affiniamo la direzione scelta fino al brandbook finale.",
        },
        {
          num: "04",
          title: "Applicazioni",
          description:
            "Biglietti da visita, stampa, digitale: il brand diventa operativo.",
        },
      ],
    },
    deliverables: [
      "Logo principale + varianti (orizzontale, verticale, monocromatico, favicon)",
      "Palette colori codificata (HEX, RGB, CMYK, Pantone)",
      "Tipografia gerarchica per uso web e stampa",
      "Brandbook PDF base (15-25 pagine)",
      "Biglietti da visita e materiali stampa coordinati",
    ],
    faq: [
      {
        question: "Chi realizza materialmente il logo?",
        answer:
          "Collaboriamo con una rete di designer selezionati di cui garantiamo qualità ed esperienza. Noi coordiniamo tutto: brief, timeline, revisioni, consegna. Tu parli con un solo interlocutore — noi.",
      },
      {
        question: "Fate anche stampa e materiali fisici?",
        answer:
          "Sì. Abbiamo tipografie di riferimento con cui lavoriamo da anni. Biglietti da visita, carta intestata, packaging: gestiamo anche la parte fisica, non solo il digitale.",
      },
      {
        question: "Fate anche content strategy e copywriting?",
        answer:
          "Sì, quando il progetto lo richiede. Il focus principale è l'identità visiva, ma se serve costruire anche il tono di voce o una strategia editoriale iniziale lo includiamo.",
      },
      {
        question: "Un brandbook serve davvero?",
        answer:
          "Sì: è quello che permette al tuo team (e a chiunque collabori con te in futuro) di creare materiali coerenti senza chiamarci ogni volta. Eviti che ogni post Instagram sembri fatto da un'azienda diversa.",
      },
    ],
    percorsiCollegati: ["parti", "cresci"],
    metaTitle: "Brand Identity e Logo Design per PMI | GI.R.O. SRL Catania",
    metaDescription:
      "Creiamo identità visive che crescono nel tempo: logo, palette, tipografia, brandbook. GI.R.O. SRL — web agency Catania.",
  },

  {
    slug: "marketing",
    title: "Marketing",
    tagline: "A 360°, dal contenuto alla performance",
    description:
      "Gestione Meta Ads, Google Ads, contenuti foto e video, dashboard di performance. Gestiamo l'intero funnel oppure ti affianchiamo — decidi tu il livello di coinvolgimento.",
    items: [
      "Gestione campagne Meta Ads",
      "Gestione campagne Google Ads",
      "Realizzazione contenuti foto e video",
      "Content & social media management",
      "Dashboard di performance e report mensili",
    ],
    icon: "marketing",
    color: "#fbbf24",
    colorSecondary: "#fcd34d",
    order: 5,
    href: "/servizi/marketing",
    problema: {
      title: "Se non puoi misurare il ROI, non è marketing: è intrattenimento.",
      body: "Gestiamo le campagne digitali del concessionario Ford Virauto a Catania da oltre 8 anni. Sappiamo cosa significa far generare lead qualificati e misurare ogni euro investito. Portiamo questa disciplina a ogni cliente.",
      painPoints: [
        "Spendiamo in ads ma non sappiamo se funzionano davvero",
        "I post social non generano richieste concrete",
        "Nessuna idea del CAC (costo acquisizione cliente)",
        "Foto fatte col cellulare che non convertono",
      ],
    },
    approccio: {
      title: "Creatività che converte, dati che guidano, report che si leggono.",
      body: "La creatività senza dati è decorazione. I dati senza creatività sono noiosi. Uniamo entrambi — con reportistica che puoi davvero usare.",
      steps: [
        {
          num: "01",
          title: "Audit",
          description:
            "Analizziamo benchmark, competitor, canali attuali, performance storiche.",
        },
        {
          num: "02",
          title: "Contenuti",
          description:
            "Foto, video, grafiche coerenti col brand. Non stock image generiche.",
        },
        {
          num: "03",
          title: "Campagne",
          description:
            "Setup Meta + Google, pixel, pubblico, creatività A/B testate.",
        },
        {
          num: "04",
          title: "Report",
          description:
            "Dashboard live + report mensile HTML che vedi a colpo d'occhio.",
        },
      ],
    },
    deliverables: [
      "Strategia marketing personalizzata",
      "Produzione contenuti (foto + video + grafiche)",
      "Setup e gestione Meta Ads + Google Ads",
      "Dashboard live con impression, CTR, CPA, ROAS",
      "Report mensile HTML automatizzato + call di ottimizzazione",
    ],
    faq: [
      {
        question: "Qual è il budget minimo per le campagne?",
        answer:
          "Su Meta consigliamo minimo €30/giorno di budget ads (circa €900/mese). Su Google dipende dall'obiettivo della campagna: facciamo anche microcampagne per test. Il costo di gestione da parte nostra si aggiunge ed è personalizzato.",
      },
      {
        question: "Gestite voi l'account o mi affiancate?",
        answer:
          "Entrambe le modalità, decidiamo insieme. Possiamo gestire tutto direttamente (tu ricevi dashboard + report) oppure affiancare il tuo team fornendo contenuti, strutture campagna e controllo qualità. In ogni caso l'account rimane sempre tuo.",
      },
      {
        question: "Che reportistica ricevo?",
        answer:
          "Dashboard live sempre accessibile + report mensile in formato HTML automatizzato che mostra la situazione da inizio progetto ad oggi. Niente PDF statici impossibili da leggere.",
      },
      {
        question: "Avete esperienza nel mio settore?",
        answer:
          "Gestiamo da oltre 8 anni le campagne del concessionario Ford Virauto di Catania — settore automotive, lead qualificati, sales cycle complesso. Se il tuo settore è diverso, nei primi 30 giorni studiamo competitor e benchmark specifici.",
      },
    ],
    percorsiCollegati: ["cresci"],
    metaTitle: "Marketing Digitale, Meta Ads e Google Ads | GI.R.O. SRL",
    metaDescription:
      "Gestione campagne Meta Ads, Google Ads, contenuti foto e video, funnel completo. Marketing misurabile per PMI italiane. GI.R.O. SRL — Catania.",
  },
]

/** Helper: trova area per slug */
export function getAreaBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug)
}
