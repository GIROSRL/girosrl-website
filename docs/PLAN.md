# PLAN.md — GI.R.O. SRL Website Roadmap

> **Ultimo aggiornamento:** fine Fase 5 — copy reale integrato
> **Stack:** Next.js 15 · TypeScript strict · Tailwind v4 · shadcn/ui · R3F + Drei · GSAP ScrollTrigger · Lenis · Framer Motion · MDX (non usato per frontmatter-only) · Resend · Vercel

---

## 🔴 ISSUE APERTI — DA AFFRONTARE NELLA PROSSIMA SESSIONE

Ordine di priorità per chi riparte:

### 1. Rimuovere VaporizeHeading dalle pagine servizi/percorsi
**Perché:** l'effetto "vaporize canvas" renderizza il testo via canvas pixel-per-pixel, il che
- non eredita il font Playfair (cambio font visibile durante dissolvenza)
- rompe la leggibilità SEO-first del titolo
- non è coerente con il brand (siamo orbite/pianeti, non vapore)

**Cosa fare:** creare `<AnimatedHeadline />` in `src/components/common/` con reveal word-by-word via Framer Motion (fade + slide-up, stagger 0.08s, ease `[0.22,1,0.36,1]`). Sostituire `<VaporizeHeading />` nelle 4 pagine:
- `src/app/servizi/page.tsx`
- `src/app/servizi/[slug]/page.tsx`
- `src/app/percorsi/page.tsx`
- `src/app/percorsi/[slug]/page.tsx`

Conservare `src/components/ui/vapour-text-effect.tsx` e `vaporize-heading.tsx` come riferimento (potrebbero servire in futuro per un effetto accento specifico, ma NON come default).

### 2. Aurora background per pagine servizi/percorsi
**Perché:** sfondo scuro piatto statico — contrasta troppo con la ricchezza cinematografica della home. L'utente lo ha segnalato esplicitamente.

**Cosa fare:** creare `<AuroraBackground accent={area.color} />` in `src/components/common/`:
- CSS-only (zero WebGL) — gradient blob che si spostano lentamente
- 3 blob radiali con `background-position` animato (20+ sec per ciclo)
- Prop `accent` prende il colore dell'area → aurora personalizzata per area
- Usa `position: fixed inset-0 -z-10 overflow-hidden pointer-events-none`
- Rispetta `prefers-reduced-motion`

Usarlo in: `/servizi` (blu brand), `/servizi/[slug]` (color area), `/percorsi` (blu brand), `/percorsi/[slug]` (derivato dalle aree coinvolte del percorso).

### 3. Footer mancante su `/percorsi`
**Sintomo:** utente dice che il footer non appare su `/percorsi`.
**Sospetto:** layout root ha `<Footer />` condizionato dal flex (`flex-col` con `<main>` `flex-1`). Potrebbe essere un issue di height/overflow sulla pagina percorsi hub dovuto a `min-h-screen` implicito o ad elementi absolute che coprono.

**Cosa fare:**
1. Ispezione DOM via preview_eval: verificare che `<footer>` esista nel body ma sia pushed out of viewport
2. Verificare che `<main>` su percorsi non abbia `min-h-screen` o height fisso
3. Eventualmente aggiungere `pb-20` al layout per dare respiro
4. Se issue persiste: rebuild cache (`.next`) + restart server pulito

---

## Milestone overview

| Fase | Titolo | Status |
|------|--------|--------|
| 0 | Setup & planning | ✅ Done |
| 1 | Design system | ✅ Done |
| 2 | Layout globale | ✅ Done |
| 3 | Scena 3D hero | ✅ Done |
| 4a-b-c-d | Home completa (scena unica + 5 takeover tematici) | ✅ Done |
| 4d.3 | Marketing al posto di Persone | ✅ Done |
| 5 | Pagine Servizi + Percorsi scaffolding + copy | ✅ Done |
| 5.1 | AnimatedHeadline + Aurora bg + footer + GlowCard + Sparkles + ClientLogos | ✅ Done |
| 6 | Chi siamo (vision-mission riuso, team placeholder per foto+bio) | ✅ Done |
| 7 | Blog + Case studies | ⏳ Rimossi da nav/footer pre-launch — riaggiungere in Fase 7 |
| 8 | Contatti (form + Resend) | ✅ Done — form funzionante, manca RESEND_API_KEY in prod |
| 8.1 | /privacy + /cookie placeholder | ✅ Done (testo generico, da rifinire con legale) |
| 9 | i18n IT/EN | ⏳ Pending |
| 10 | SEO, performance, a11y, testing | ⏳ Pending |
| 11 | Deploy | 🟡 **Next — pronti a go-live** |

---

## Brand identity (confermato da brandbook 2025)

**Tipografia:** Playfair Display (display) + Inter (UI/body)

**Palette base:**
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-navy` | `#080d1a` | BG primario dark |
| `--color-navy-mid` | `#0d1424` | Card BG |
| `--color-navy-light` | `#1a2a4a` | Bordi |
| `--color-blue` | `#3a8fe8` | Accento primario |
| `--color-blue-dark` | `#1a5faa` | Accenti su light |
| `--color-blue-light` | `#5bb3f0` | Hover, dettagli |
| `--color-gray-mid` | `#8a9ab5` | Testo secondario |

**Core scena 3D:** `#ff8a3d` arancione caldo (cliente al centro — metafora gravitazionale)

**Palette per area servizio:**
| Area | Primary | Secondary | Mood |
|------|---------|-----------|------|
| Strategia | `#3a8fe8` blu brand | `#5bb3f0` | Direzione, visione |
| Sviluppo | `#14d6b4` teal saturo | `#5fe9cf` | Ingegneria, tech |
| Intelligenza | `#9b6dff` viola elettrico | `#c8a5ff` | AI, innovazione |
| Brand | `#ff9eb1` rosa-pesca caldo | `#ffc3cf` | Identità, creatività |
| Marketing | `#fbbf24` giallo-ambra | `#fcd34d` | Amplificazione, performance |

---

## Architettura servizi (definitiva)

### 5 aree di servizio
1. **Strategia** — Direzione, visione, metodo (copy: "La tecnologia cambia ogni sei mesi. Tu non devi rincorrerla, devi dirigerla.")
2. **Sviluppo** — Costruiamo ciò che serve (15 giorni per sito standard, stack moderno Next.js+TS+Supabase, codice tuo al 100%)
3. **Intelligenza** — AI che lavora per te (POC in 2-3 settimane, da €1.500; case reale: legge 104 per Virauto Ford)
4. **Brand** — Come il valore arriva al mercato (rete designer selezionati coordinati da GIRO, stampa inclusa)
5. **Marketing** — A 360° (8+ anni con Virauto Ford Catania — proof point di punta; Meta €30/giorno min)

### 3 percorsi integrati
1. **Parti** — Da zero a presenza digitale. Aree: Strategia + Sviluppo + Brand. Budget €3.500-5.500. Durata 8-12 settimane.
2. **Cresci** — Da presenza a performance. Aree: Marketing + Brand + Strategia + Sviluppo. Budget €4.500-7.500. Durata ~3 mesi.
3. **Trasforma** — Da azienda a organizzazione digitale. Aree: Strategia + Intelligenza + Sviluppo. Digitalizzazione strutture interne.

---

## Clienti reali (portfolio attuale GIRO)

| Progetto | Slug | Area | Note |
|----------|------|------|------|
| **Sicilia Classica** | `siciliaclassica` | Sviluppo | Sito + CRM + dashboard prenotazioni + email automation BDC/operativo/management. `siciliaclassica.it` live |
| **South Unconventional** | `south-unconventional` | Sviluppo | Sito istituzionale + brand digitale. `southunconventional.com` live |
| **Sicilery** | `sicilery` | Sviluppo | Brand identity + sito + packaging prodotti siciliani. SVG placeholder elegante (oro/nero) |
| **Virauto Ford Catania** | `virauto` | Marketing | **8+ anni** gestione marketing + lead + web app AI legge 104. Proof point di punta |
| **Helme** | `helme` | Marketing | Social management + contenuti. Mockup Instagram |
| Dashboard operativa | `dashboard-analytics` | Intelligenza | Mockup fittizio (dashboard riservata) |

**File:** `src/content/projects.ts`
**Preview screenshot live via thum.io** (domini pubblici) + **SVG fallback locali** in `public/images/projects/*.svg`.

---

## Nav definitivo

```
Home · Chi siamo · Percorsi · Servizi · Case studies · Blog · Contatti
```

---

## Flow home attuale

```
┌─────────────────────────────────────────────────────────────┐
│ <HomeExperience /> — SEZIONE UNICA PINNED 900vh              │
│   Canvas R3F persistente con state machine scroll-driven     │
│   Phase 0: Hero — 5 pianeti orbitanti + claim                │
│   Phase 1: Manifesto — core zoom + BG arancione              │
│   Phase 2-6: Takeover Strategia → Sviluppo → Intelligenza    │
│              → Brand → Marketing (5 layout tematici distinti) │
│   Phase 7: Outro — pin si libera                             │
└─────────────────────────────────────────────────────────────┘
<Methodology />    — 4 step numerati reveal on scroll
<Numbers />        — 4 counter animati (placeholder)
<Testimonial />    — quote ruotanti
<CtaFinal />       — orbite ricomposte SVG + CTA
```

### Layout tematici takeover (Fase 4d.3)
- **Strategia** — Bussola editoriale (titolo centrale + 4 principi ai punti cardinali + linee convergenti SVG)
- **Sviluppo** — IDE / code editor (file tree + tab bar con 3 progetti + preview switchable)
- **Intelligenza** — Chat AI live (conversation UI + typing indicator + neural network bg)
- **Brand** — Moodboard magazine (grid creativa: palette + typography + shape + quote)
- **Marketing** — Campaign dashboard (IG Ad preview + Google Ad + KPI Panel ROAS/CAC)

---

## Pagine Servizi + Percorsi (Fase 5 done)

### Route generate
```
✓ / (home)
✓ /design-system (QA privato)
✓ /servizi (hub con grid 5 card + teaser percorsi)
  ├─ /servizi/strategia
  ├─ /servizi/sviluppo
  ├─ /servizi/intelligenza
  ├─ /servizi/brand
  └─ /servizi/marketing
✓ /percorsi (hub con comparatore 3 colonne)
  ├─ /percorsi/parti
  ├─ /percorsi/cresci
  └─ /percorsi/trasforma
```

### Template dettaglio `/servizi/[slug]`
Struttura: Breadcrumb → Hero (pianetino + tagline + titolo + desc + chips + CTA) → Problema (title + body + pain points) → Approccio (4 steps) → Deliverables (lista numerata) → Percorsi collegati (card) → FAQ accordion → CTA finale.

### Template dettaglio `/percorsi/[slug]`
Struttura: Breadcrumb → Hero (verbo imperativo gigante + chips aree) → Budget+Durata badge → Per chi (4 profili cliente) → Fasi timeline verticale → Risultati (3 metric cards) → Aree coinvolte (grid 5 card con disattivate in gray) → CTA finale.

### JSON-LD + SEO
Ogni pagina dettaglio ha:
- `generateMetadata` dinamico da frontmatter (title, description, OG)
- Schema `Service` JSON-LD
- Breadcrumb semantico

---

## Struttura file rilevanti

```
src/
├── app/
│   ├── layout.tsx                     (root, Lenis, fonts, Header, Footer)
│   ├── page.tsx                       (home)
│   ├── globals.css                    (token brand + shadcn vars)
│   ├── servizi/
│   │   ├── page.tsx                   (hub)
│   │   └── [slug]/page.tsx            (dettaglio area)
│   └── percorsi/
│       ├── page.tsx                   (hub)
│       └── [slug]/page.tsx            (dettaglio percorso)
│
├── content/
│   ├── services.ts                    ✅ v2 copy reale (5 aree complete)
│   ├── paths.ts                       ✅ v2 copy reale (3 percorsi)
│   ├── projects.ts                    ✅ 6 progetti reali + mapping area
│   └── stats.ts                       (da aggiornare con numeri reali)
│
├── types/
│   └── content.ts                     (ServiceArea + ServicePath estesi)
│
├── components/
│   ├── sections/
│   │   ├── home-experience.tsx        🟢 scena unica pinned
│   │   ├── takeovers/
│   │   │   ├── index.tsx              (dispatcher area → componente)
│   │   │   ├── area-strategia.tsx     (Bussola)
│   │   │   ├── area-sviluppo.tsx      (IDE)
│   │   │   ├── area-intelligenza.tsx  (Chat AI)
│   │   │   ├── area-brand.tsx         (Moodboard)
│   │   │   └── area-marketing.tsx     (Campaign dashboard)
│   │   ├── methodology.tsx
│   │   ├── numbers.tsx
│   │   ├── testimonial.tsx
│   │   ├── cta-final.tsx
│   │   └── vision-mission.tsx         💤 riusabile per Fase 6 /chi-siamo
│   │
│   ├── three/
│   │   ├── home-experience-scene.tsx  (Canvas unica)
│   │   ├── orbit-config.ts            (5 satelliti + colori per area)
│   │   ├── orbit-ring.tsx
│   │   ├── starfield.tsx
│   │   └── (cleanup ok, zero file dormienti)
│   │
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx                 ⚠️ verifica visibilità su /percorsi
│   │   ├── logo-animated.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── language-switcher.tsx
│   │   └── nav-items.ts
│   │
│   ├── common/
│   │   ├── container.tsx, section.tsx, typography.tsx
│   │   ├── giro-button.tsx, giro-card.tsx
│   │   ├── orbit-badge.tsx, magnetic.tsx, animated-link.tsx
│   │   ├── planet-badge.tsx           (mini pianeta SVG)
│   │   ├── tablet-mockup.tsx          (iPad stylish)
│   │   ├── project-preview-card.tsx   (card progetto con thum.io + fallback)
│   │   ├── dashboard-mock.tsx         (dashboard AI fittizia)
│   │   ├── breadcrumb-nav.tsx
│   │   └── vaporize-heading.tsx       🔴 TO REMOVE (sostituire con AnimatedHeadline)
│   │
│   └── ui/
│       ├── (shadcn: button, card, badge, accordion, input, label, etc.)
│       ├── text-reveal.tsx            (Magic UI — salvato per future)
│       ├── feature-carousel.tsx       (Aceternity adattato — salvato)
│       └── vapour-text-effect.tsx     🔴 SOURCE del VaporizeTextCycle
│
├── lib/
│   ├── fonts.ts, gsap.ts, utils.ts
│
├── providers/
│   └── lenis-provider.tsx             (smooth scroll + ScrollTrigger sync)
│
├── hooks/
│   ├── use-reduced-motion.ts          (useSyncExternalStore, R19-ready)
│   └── use-mouse-parallax.ts
│
└── messages/
    ├── it.json
    └── en.json                        (Fase 9)
```

---

## Proof point forti (da usare in marketing/chi siamo/home)

1. **8+ anni con Virauto Ford Catania** — partnership più duratura, gestione marketing + AI + lead
2. **Case Sicilia Classica** — sito + CRM + dashboard prenotazioni + email automation (BDC/operativo/management)
3. **Case AI Virauto** — web app analisi documenti legge 104 via AI privata/riservata (primo use case AI in PMI automotive locale)
4. **Portfolio** — 3 siti live + 2 progetti marketing + 1 progetto AI (tutti reali)

---

## Asset ancora necessari dal cliente

| # | Asset | Bloccante per | Stato |
|---|-------|---------------|-------|
| 1 | Screenshot reali alta-res Sicilery/Helme/Virauto | Rimpiazzo SVG placeholder | Non urgente |
| 2 | Foto team (6 persone) + bio | Fase 6 | |
| 3 | Link Cal.com embed | Fase 8 | |
| 4 | Resend API key + verifica dominio `@girosrl.com` | Fase 8+11 | |
| 5 | Accesso DNS `girosrl.com` | Fase 11 | |
| 6 | Numeri reali stats (ora "5+ progetti", "8+ anni", etc.) | Fase 4 refinement home | |
| 7 | Logo SVG originali | ✅ Ricevuti (brandbook) | Done |

---

## Decisioni architetturali confermate

- **No database** per il sito marketing — tutto static
- **Slug URL italiani** per SEO locale (`/servizi/strategia`, `/percorsi/parti`)
- **Scena 3D UNICA** dalla hero alla fine dei takeovers (no stacchi visivi)
- **Scrub puro senza snap** per home journey (snap rimosso dopo test)
- **Preview progetti** via thum.io live + SVG fallback locale
- **NO MDX body** — tutto frontmatter in TS (overkill MDX per dati strutturati)
- **VaporizeTextCycle fuori dalla home** — canvas pixel-level troppo heavy per titoli
- **Aurora background** — pattern di base per pagine servizi/percorsi (non ancora implementato)

---

## Come riprendere nella prossima sessione

**Step by step:**

1. Leggere questo PLAN.md + `ARCHITECTURE.md` + `DESIGN_BRIEF.md`
2. Affrontare i 3 issue aperti (in ordine):
   a. Rimuovere `VaporizeHeading` dalle 4 pagine servizi/percorsi → sostituire con `AnimatedHeadline` Framer Motion
   b. Creare `AuroraBackground` component + integrare con accent color per area
   c. Debug footer `/percorsi` (preview_screenshot + DOM inspect)
3. Testing: `npx tsc --noEmit && npx eslint src && npm run build`
4. Se tutto verde, chiedere all'utente se passare alla **Fase 6 (Chi siamo + Team)**

**Comandi utili per ripresa:**
```bash
cd "/Users/rocco/Library/CloudStorage/GoogleDrive-rocco.leone@girosrl.com/Il mio Drive/GI.R.O./Documenti GIRO/SItoWeb GIRO.SRL/giro-srl-website"
npx tsc --noEmit
npm run dev
# oppure preview_start via MCP
```

File launch.json: `.claude/launch.json` — name "GI.R.O. SRL — Next.js dev"
