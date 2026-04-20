# ARCHITECTURE.md — GI.R.O. SRL Technical Decisions

> Documento di architettura. Ogni scelta è motivata.
> **Ultimo aggiornamento:** Fase 5 done (scaffolding servizi/percorsi + copy reale integrato).

## 🔴 Issue tecnici aperti (da affrontare prossima sessione)

1. **VaporizeTextCycle troppo heavy per titoli**: canvas pixel-level non eredita Playfair Display, crea flash di font cambio durante dissolvenza. Sostituire con reveal word-by-word Framer Motion nelle pagine servizi/percorsi. File: `src/components/common/vaporize-heading.tsx` (da eliminare/sostituire) e `src/components/ui/vapour-text-effect.tsx` (conservato come riferimento).

2. **Footer non visibile su `/percorsi`**: debug richiesto. Sospetto height/overflow su `<main>` della percorsi hub. Vedi PLAN.md.

3. **Sfondo pagine servizi/percorsi statico**: serve `AuroraBackground` (CSS gradient animato con accent color per area).

---

## 1. Framework: Next.js 15 (App Router)

Server Components di default (meno JS client-side), streaming SSR, PPR in arrivo, route segment config granulare.
SSG per pagine statiche (blog, servizi), Server Actions per form. Un'unica codebase.

Alternative scartate: Remix (ecosistema 3D meno maturo), Astro (islands complicano un sito animation-heavy).

---

## 2. TypeScript strict

`tsconfig.json` ha: `strict`, `noImplicitAny`, `strictNullChecks`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`.
Tipi dei dati MDX definiti in `src/types/content.ts` + validazione Zod runtime.

---

## 3. Styling: Tailwind v4

CSS-first (niente `tailwind.config.js`), Lightning CSS integrato. Palette in `:root` come CSS custom properties.
shadcn/ui copiato in `src/components/ui/` e rimappato sui token GIRO (non dipendenza runtime).

---

## 4. Animazione: gerarchia delle librerie

```
GSAP ScrollTrigger  → scroll-driven storytelling (scrub, pin) ← PRIMARIO
Framer Motion       → micro-interazioni UI (hover, reveal singolo)
CSS transitions     → ovunque sia sufficiente
```

**Regola ferma:**
- Se l'animazione coinvolge più di un componente o è scroll-driven → **GSAP**
- Se è hover/toggle su un singolo elemento → Framer Motion
- Framer Motion **mai** per scroll timeline complesse

**Caso speciale TextReveal Magic UI:** usa `useScroll` di Framer Motion su un `targetRef` → eccezione accettata ma confinata a sezioni standalone (fuori da `pin`). In Fase 4d.2 è stato testato nella Methodology ma rimosso per conflitti con la scena pinned precedente; disponibile per futuro uso in sezioni indipendenti.

---

## 5. 3D: R3F + Drei (una sola Canvas in home)

Scelta chiave in Fase 4d: **Canvas persistente unica** per tutto l'hero journey (no rimount tra hero e takeover aree).

- `src/components/three/home-experience-scene.tsx` — la Canvas della home
- State machine tramite **ref mutabili** (`activeIdxRef`, `takeoverRef`, `coreZoomRef`) → **zero re-render React** durante scroll
- `useFrame` R3F legge i ref ogni tick e aggiorna:
  - scale pianeti (cresce sulla sua orbita, 1x → 2.8x)
  - opacity pianeta (fade a 0.4 durante takeover per non coprire il testo)
  - emissive intensity (lieve boost quando protagonista)
  - glow layers (più marcati per compensare la trasparenza del core)
  - opacity orbite (quella del pianeta attivo resta, altre fade)
  - `renderOrder` (pianeta attivo davanti alle orbite)
- Core arancione `#ff8a3d` cresce fino a 11x durante `coreZoom` (phase manifesto), poi sfuma

**Postprocessing:** Bloom + Vignette. Mobile: disabilitato (fallback statico).

**Spline:** non usato come runtime (~1MB). Se in futuro serviranno modelli 3D complessi, esportati in glTF compresso e caricati via `useGLTF`.

---

## 6. Smooth scroll: Lenis

Normalizza lo scroll cross-browser, easing cinematografico.
- Singleton in `src/providers/lenis-provider.tsx`
- Sync con GSAP: `lenis.on("scroll", ScrollTrigger.update)`
- ScrollTrigger usa `pinType: "transform"` per compatibilità con smooth scroll (niente `position: fixed` che crea conflitti con Lenis)

**⚠️ Issue noto:** `window.scrollTo({behavior: 'instant'})` programmatic non è sempre rispettato da Lenis durante test di preview_screenshot. Per debugging usare `lenis.scrollTo()` API o test manuale con wheel.

---

## 7. ScrollTrigger: timeline scrub pura, NO snap

**Fase 4d.1 → snap points ogni fase** (scartato in 4d.2)
- Problema: snap + scrub + Lenis creava salti imprevedibili e bloccava l'utente tra fasi
- Risultato peggiore dell'attesa

**Fase 4d.2 → scrub 1.1 puro**, timeline 900vh
- L'utente controlla la velocità con la rotella
- Transizioni morbide senza "catch"
- Total pin = 10 viewport (9 viewport di scroll + 1 di pin initial)

**Stato pin/progress:**
- `0.00–0.09` hero content
- `0.13–0.21` manifesto visibile (coreZoom plateau)
- `0.24 + i*0.14 ± 0.035` takeovers area `i`
- `0.94–1.00` outro

`onUpdate` legge `self.progress` e:
1. Calcola `coreZoom` (ramp + plateau + ramp)
2. Calcola `takeover` + `activeIdx` per la fase takeover corrente
3. Applica alpha hex al bg overlay
4. setState condizionato (`setVisible`, `setVisibleAreaIdx`) — re-render solo se cambia fase

---

## 8. Contenuti: MDX locale

Motivazione: team gestisce i contenuti, SSG pura (no API runtime), i18n via `.it.mdx`/`.en.mdx` con diff git chiaro.
Migrazione futura a Keystatic (file-based CMS con UI visuale) rimane aperta — zero refactor.

**Sistema scelto:** `next-mdx-remote/rsc` + `gray-matter`. Contentlayer scartato (deprecato 2024).

Tipi forti in `src/types/content.ts`:
- `ServiceArea`, `ServicePath` — per home + hub
- `ServizioFrontmatter`, `PercorsoFrontmatter` — per MDX pagine dettaglio (Fase 5)
- `BlogPost`, `CaseStudy`, `TeamMember` — per Fase 6-7

---

## 9. i18n: next-intl

- Routing `/[locale]/...`
- Server Components-first
- Autocomplete message keys
- MDX multilingua con suffisso file

File: `src/messages/it.json` (popolato), `en.json` (stub). Verrà completato in Fase 9.

---

## 10. Form + Email: RHF + Zod + Resend (Fase 8)

- React Hook Form per UX (zero re-render per keystroke)
- Zod per schema validation client + server (stessa definizione)
- Server Actions Next.js 15 per submit
- Resend con React Email per template branded

---

## 11. Performance strategy

### Code splitting
```
Bundle principale (initial load home):
  Next runtime + React + Tailwind + next-intl + layout + Lenis
  TOTALE target: < 200KB gzip

Chunk lazy (home-experience-scene):
  R3F + Three.js cherry-pick
  Drei (useGLTF, postprocessing)
  GSAP ScrollTrigger
  Caricato solo quando HomeExperience entra in viewport (ssr: false)
```

### Immagini
- `next/image` per immagini statiche
- Screenshot dinamici via **thum.io** (free tier, cachato lato servizio)
- Fallback SVG locale in `public/images/projects/` per affidabilità

### Font
- `next/font` con `display: swap`, `preload: true`
- Subsetting latin + italic
- Zero Google Fonts runtime fetch

### 3D
- **Una sola Canvas** in home (non più 2 come in 4c)
- `dynamic(() => import(...), { ssr: false })` con loader silente
- Refs mutabili → zero re-render React su scroll
- Mobile (< 1024px): fallback statico `HomeExperienceFallback` (no WebGL)
- `prefers-reduced-motion`: stesso fallback

### `prefers-reduced-motion`
- Rispettato globalmente via `useReducedMotion` hook
- Se attivo: fallback statico (come mobile)
- Film grain texture disabilitata

---

## 12. SEO / Struttura metadata

Ogni pagina esporta `generateMetadata()`:
```ts
{ title, description, openGraph, alternates: { canonical, languages } }
```

JSON-LD per tipo pagina:
- Home → `Organization` + `LocalBusiness`
- Servizi → `Service` + `BreadcrumbList`
- Blog → `Article` + `BreadcrumbList`
- Case study → `Article`
- Contatti → `LocalBusiness` + `ContactPage`

OG images dinamiche con `next/og` (Fase 10).

---

## 13. Struttura cartelle (stato aggiornato Fase 4d.2)

```
giro-srl-website/
├── src/
│   ├── app/
│   │   ├── layout.tsx           (root, Lenis, fonts, metadata)
│   │   ├── page.tsx             (home compose)
│   │   ├── globals.css          (design tokens + shadcn vars map)
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts           (Fase 10)
│   │   └── robots.ts            (Fase 10)
│   │
│   ├── components/
│   │   ├── ui/                         # shadcn primitives + Magic UI
│   │   │   ├── button.tsx
│   │   │   └── text-reveal.tsx
│   │   ├── layout/                     # Header, Footer, Nav, Logo
│   │   ├── sections/                   # Sezioni pagina (home-experience, methodology, etc.)
│   │   ├── three/                      # Scene R3F ("use client")
│   │   └── common/                     # Componenti riutilizzabili brand
│   │
│   ├── content/
│   │   ├── services.ts, paths.ts, projects.ts, stats.ts
│   │   └── (blog, case-studies, servizi, team — MDX, Fase 5-7)
│   │
│   ├── lib/
│   │   ├── fonts.ts, gsap.ts, utils.ts
│   │
│   ├── providers/
│   │   └── lenis-provider.tsx
│   │
│   ├── types/
│   │   └── content.ts
│   │
│   ├── hooks/
│   │   ├── use-reduced-motion.ts
│   │   └── use-mouse-parallax.ts
│   │
│   └── messages/
│       ├── it.json
│       └── en.json
│
├── public/
│   ├── images/
│   │   ├── logo-header-dark.svg, logo-header-light.svg, ...
│   │   └── projects/*.svg          (fallback SVG per thum.io)
│   ├── fonts/                       (Fase 9 se self-hosted)
│   └── models/                      (glTF se serviranno)
│
├── PLAN.md
├── ARCHITECTURE.md
├── DESIGN_BRIEF.md
├── .env.example
└── next.config.ts, tsconfig.json, eslint.config.mjs
```

---

## 14. Scelte fatte / aperte

### Chiuse (non torniamo indietro)
- ✅ Playfair + Inter (brandbook ufficiale)
- ✅ Dark mode default, light predisposto ma non prioritario
- ✅ Core arancione `#ff8a3d` (rappresenta cliente)
- ✅ 5 aree: **Strategia / Sviluppo / Intelligenza / Brand / Marketing** (Persone rimosso in 4d.3)
- ✅ 3 percorsi: Parti / Cresci / Trasforma
- ✅ Slug URL italiani
- ✅ Scena 3D unica persistente (1 Canvas in home)
- ✅ Scrub puro senza snap per home journey
- ✅ Pianeta takeover resta sulla sua orbita (scala 1x→2.8x + fade opacity)
- ✅ thum.io per preview screenshot + SVG fallback
- ✅ TabletMockup statico (no ContainerScroll con useScroll in contesto pinned)
- ✅ **No MDX body** — tutto frontmatter in TypeScript (overkill MDX per dati strutturati)
- ✅ Pagine servizi/percorsi con `generateStaticParams` + `generateMetadata` + JSON-LD `Service`
- ✅ Breadcrumb semantico su tutte le pagine dettaglio

### Aperte / da valutare prossima sessione
- 🔴 `AuroraBackground` per pagine servizi/percorsi (CSS gradient animato, accent per area)
- 🔴 `AnimatedHeadline` al posto di VaporizeHeading (Framer Motion word-by-word)
- 🔴 Debug footer `/percorsi`
- ⏳ Sfondo animato manifesto: gradient pulsante va ora, valuteremo se potenziare
- ⏳ TextReveal Magic UI disponibile per sezioni future (blog article, about)
- ⏳ FeatureCarousel Aceternity (salvato) — candidato per `/servizi` hub ma per ora usato grid statica
- ⏳ Database: no per il sito marketing. Supabase raccomandato se serve area clienti in futuro

## 15. Librerie componenti salvati per riuso

Tutti in `src/components/ui/`:
- `accordion.tsx` (shadcn base-ui)
- `button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `label.tsx`, `separator.tsx`, `textarea.tsx`
- `sonner.tsx` (toast)
- `text-reveal.tsx` — **Magic UI** word-by-word reveal via scroll
- `feature-carousel.tsx` — **Aceternity** adattato con Lucide icons + colori brand
- `vapour-text-effect.tsx` — **21st.dev** particle vaporize (⚠️ NON usare come default per titoli — troppo heavy)

## 16. Proof point narrativi (usabili ovunque)

- **8+ anni con Virauto Ford Catania** — partnership di punta (marketing + AI + lead)
- **Case Sicilia Classica** — sito + CRM + dashboard + email automation BDC/operativo/management
- **Case AI Virauto** — web app analisi documenti legge 104 (primo use case AI PMI locale)
- Sicilery + South Unconventional + Helme — portfolio clienti attivi
