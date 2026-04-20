# GI.R.O. SRL — Sito istituzionale

> Un solo partner. Infinite direzioni.
> Sito marketing di [GI.R.O. SRL](https://girosrl.com), partner per la trasformazione digitale di PMI italiane.

## Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router · React 19 · TypeScript strict · Turbopack)
- **Styling:** Tailwind CSS v4 · shadcn/ui
- **3D:** React Three Fiber + Drei (home hero)
- **Animazioni:** GSAP ScrollTrigger · Lenis · Framer Motion
- **Email:** [Resend](https://resend.com) (form `/contatti`)
- **Particles:** tsparticles slim (dynamic import, reduced-motion aware)
- **Hosting:** Vercel
- **Fonts:** Playfair Display (display) · Inter (UI/body) via `next/font`

## Sviluppo locale

```bash
npm install
cp .env.example .env.local   # compila i valori reali
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Struttura

```
src/
├── app/                       Route App Router (tutte statiche/SSG)
│   ├── (home)                 /
│   ├── chi-siamo/             /chi-siamo
│   ├── servizi/               /servizi + /servizi/[slug] (5 aree)
│   ├── percorsi/              /percorsi + /percorsi/[slug] (3 percorsi)
│   ├── contatti/              /contatti (form Resend)
│   ├── privacy/ cookie/       Legal placeholders
│   └── design-system/         QA interno (no index)
├── components/
│   ├── sections/              Sezioni high-level (home-experience, vision-mission, client-logos…)
│   ├── three/                 Scena R3F
│   ├── layout/                Header · Footer · MobileNav
│   ├── common/                Container · Typography · GiroButton · AnimatedHeadline · AuroraBackground…
│   └── ui/                    shadcn + GlowCard · Sparkles…
├── content/                   Dati statici (services, paths, projects, clients)
├── hooks/ · lib/ · providers/
└── types/
```

Documentazione estesa in [`docs/`](./docs):

- [`PLAN.md`](./docs/PLAN.md) — roadmap e storia del progetto
- [`ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — scelte architetturali
- [`DESIGN_BRIEF.md`](./docs/DESIGN_BRIEF.md) — brief cliente + identity

## Scripts

| Comando | Cosa fa |
|---------|---------|
| `npm run dev` | Dev server con Turbopack (porta 3000) |
| `npm run build` | Build di produzione |
| `npm run start` | Serve la build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

## Variabili d'ambiente

Vedi [`.env.example`](./.env.example). Su Vercel vanno configurate come
Environment Variables (Project → Settings → Environment Variables).

**Obbligatorie in produzione:**

- `RESEND_API_KEY` — chiave API Resend (il form contatti la richiede per inviare)
- `RESEND_FROM_EMAIL` · `CONTACT_FORM_TO_EMAIL` — default `info@girosrl.com`
- `NEXT_PUBLIC_SITE_URL` — `https://girosrl.com`

> Nota: se `RESEND_API_KEY` manca, il form `/contatti` risponde "ok" ma NON invia email (logga un warning). Utile in preview/staging.

## Deploy

Push su `main` → Vercel pubblica in automatico.

1. Connetti il repo GitHub a Vercel
2. Imposta le Environment Variables
3. Configura il dominio custom `girosrl.com`
4. Su Squarespace DNS punta i record A/CNAME a Vercel (istruzioni fornite dalla dashboard Vercel)

## Licenza

Codice proprietario · © GI.R.O. SRL — P.IVA 07266000872
