# DESIGN_BRIEF.md — GI.R.O. SRL Creative Direction

> Documento di riferimento creativo. **Ultimo aggiornamento:** Fase 5 done.

## 🔴 Decisioni di design aperte (da affrontare prossima sessione)

1. **Dissolvenza titoli servizi/percorsi**: rimuovere VaporizeTextCycle (canvas heavy, cambio font fastidioso, non brand-coherent). Sostituire con **reveal word-by-word Framer Motion** (fade + slide-up, stagger 0.08s) — più Apple/Vercel, più leggibile, preserva Playfair.

2. **Background statico pagine servizi/percorsi**: implementare **Aurora Background** CSS-only:
   - 3 blob gradient radiali con `background-position` animato (20s cicli)
   - Accent color dinamico per area (blu Strategia, teal Sviluppo, viola Intelligenza, rosa Brand, giallo Marketing)
   - Respiro lento, non distraente
   - `prefers-reduced-motion`: disabilitato

3. **Footer /percorsi**: investigazione visibilità.

---

## 1. Filosofia visiva

**Una parola: Gravità.**

Il sito trasmette che le cose orbitano attorno a te — tu sei al centro, e il partner giusto organizza tutto intorno a te con precisione orbitale. Non è un sito che "mostra" servizi. È un sito che ti mette al centro di un sistema.

**Riferimenti:**
- `apple.com/vision-pro` · `apple.com/airpods-pro/` — scroll storytelling, keynote intro
- `linear.app` · `vercel.com` — dark UI premium, glow selettivi
- Mood cinematografico, non digitale

---

## 2. Il concept "Orbita" — definitivo

### Metafora
Il cerchio nel logo è il **sistema solare della tua azienda**:
- **Core arancione** `#ff8a3d` al centro = **tu, il cliente**
- **5 pianeti orbitanti** = le 5 aree di servizio che ruotano attorno a te
- Ogni pianeta ha il suo **colore tematico**, la sua **inclinazione orbitale**, la sua **velocità**

"Un solo partner" = un solo centro gravitazionale.
"Infinite direzioni" = le traiettorie orbitali che toccano ogni area di business.

### Implementazione home (flow completo)

```
┌── Hero base ─────────────────────────────────────────┐
│   Core arancione grande, 5 pianeti orbitanti,        │
│   orbite colorate allineate ai pianeti.              │
│   Testo claim "Un solo partner. Infinite direzioni." │
└──────────────────────────────────────────────────────┘
                     ↓ (scroll)
┌── Manifesto ─────────────────────────────────────────┐
│   Core cresce e riempie il viewport.                 │
│   Radial gradient arancione animato (respiro).       │
│   Manifesto breve: "Al centro del tuo progetto,      │
│   in ogni fase."                                     │
└──────────────────────────────────────────────────────┘
                     ↓ (scroll)
┌── 5 Takeovers cinematografici ──────────────────────┐
│   Il pianeta di ogni area (sulla sua orbita)         │
│   cresce fino a 2.8x e diventa etereo (opacity 0.4). │
│   Background fullscreen del colore area.             │
│   Ogni area ha LAYOUT TEMATICO DIVERSO (Fase 4d.3):  │
│   - Strategia:   Bussola editoriale                  │
│   - Sviluppo:    IDE / code editor                   │
│   - Intelligenza: Chat AI live                       │
│   - Brand:       Moodboard magazine                  │
│   - Marketing:   Campaign dashboard Meta + Google    │
└──────────────────────────────────────────────────────┘
                     ↓ (scroll)
┌── Outro ─────────────────────────────────────────────┐
│   Pin si libera, torna la scena base.                │
│   Transizione verso Methodology.                     │
└──────────────────────────────────────────────────────┘
```

### Perché il pianeta resta sulla sua orbita (decisione Fase 4d.2)
Rispetta la metafora: ogni area ha la sua traiettoria attorno a te. Non "viene al centro" — tu resti il centro. Il pianeta si presenta, racconta la sua area, torna in orbita. Il pianeta che cresce + sfuma diventa una presenza atmosferica, non invade il testo.

### Riprese del concept in altre pagine
- Header: logo orbitale SVG con micro-animazione on-hover
- Pagine servizi (Fase 5): microscene 3D tematiche per area
- Case studies (Fase 7): card con orbit ring decorativo on-hover
- Footer: traccia orbitale sottile decorativa

---

## 3. Palette cromatica (confermata dal brandbook 2025)

### Primari
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-navy` | `#080d1a` | BG primario dark |
| `--color-blue` | `#3a8fe8` | Accento primario, CTA |

### Full scale (dal brandbook)
| Token | Hex |
|-------|-----|
| `--color-navy-mid` | `#0d1424` |
| `--color-navy-light` | `#1a2a4a` |
| `--color-navy-accent` | `#1a3a6e` |
| `--color-blue-dark` | `#1a5faa` |
| `--color-blue-mid` | `#2d6abf` |
| `--color-blue-light` | `#5bb3f0` |
| `--color-blue-pale` | `#7ec0f0` |
| `--color-blue-ghost` | `#b8cfe8` |
| `--color-blue-ice` | `#e6f1fb` |
| `--color-off-white` | `#f4f7fc` |
| `--color-gray-light` | `#dce5f0` |
| `--color-gray-mid` | `#8a9ab5` |
| `--color-text-body` | `#1a2440` |

### Colori del core (Fase 4c)
- **Core scena**: `#ff8a3d` arancione caldo — cliente al centro (metafora)
- **Glow core**: `#ffb57a` — arancione chiaro

### Palette per area di servizio (Fase 4b–d)

Ogni area ha un **colore primary** (satellite + takeover bg) e un **secondary** (glow, hover states).

| Area | Primary | Secondary | Perché |
|------|---------|-----------|--------|
| Strategia | `#3a8fe8` blu brand | `#5bb3f0` | Cuore del brand, direzione |
| Sviluppo | `#14d6b4` teal saturo | `#5fe9cf` | Costruzione, tech, diverso dal blu |
| Intelligenza | `#9b6dff` viola elettrico | `#c8a5ff` | AI, innovazione, futuro |
| Brand | `#ff9eb1` rosa-pesca caldo | `#ffc3cf` | Creatività, identità, "respiro" caldo |
| Marketing | `#fbbf24` giallo-ambra | `#fcd34d` | Amplificazione, energia, performance |

**Principio:** tutti i 5 colori sono saturi ma armonici col navy bg. Brand e Marketing sono i due colori caldi (rosa + giallo) per distinguerli dai 3 blu/teal/viola tecnologici.

**Nota Fase 4d.3:** l'area "Persone" è stata sostituita con "Marketing a 360°" (foto/video, strategia, Meta Ads, Google Ads, content). Il colore giallo-ambra evoca la "call-to-action" commerciale senza entrare in conflitto col core arancione.

### Proporzioni d'uso (brandbook)
```
Navy deep 35%  |  Brand blue 25%  |  Blue light 20%  |  Off white 20%
```

---

## 4. Tipografia — decisione finale

**Conferma da brandbook 2025:**
- **Display / H1 / H2 / quote:** Playfair Display (Google Fonts) — pesi 400, 700, 900, italic
- **UI / Body / H3+:** Inter (Google Fonts) — pesi 200, 300, 400, 500, 600, 700
- **Wordmark "GIRO":** Inter/Helvetica Neue weight 200, letter-spacing 14px

### Gerarchia (dal brandbook)
| Livello | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Playfair | 36px | 700 |
| H2 | Playfair | 24px | 700 |
| H3 | Inter | 16px | 600 |
| Body | Inter | 14px | 400 (line-height 1.7) |

Nel sito mobile-first abbiamo scalato queste dimensioni con Tailwind `text-4xl → lg:text-8xl` per hero.

---

## 5. Spaziatura e respiro

```
Section padding: py-32 → py-48 (desktop) / py-20 (mobile)
Heading margin: mb-6 h1, mb-4 h2
Stack verticale: gap-24 tra sezioni macro
Grid gap: gap-8 per card grid
Max content width: 1280px (xl), 5% padding laterale
Reading width: 65ch per body lungo
```

---

## 6. Microinterazioni

| Elemento | Comportamento | Lib |
|----------|--------------|-----|
| CTA primario | Glow + scale 1.02 on hover | Framer Motion |
| Link testuale | Underline left-to-right | CSS |
| Card servizio | Border accent color on hover + reveal glow | Framer Motion |
| Nav link | Underline animato | CSS |
| Logo header | Orbit stroke animato | SVG + Framer |
| Magnetic button | Attrazione ±20px cursor | Custom hook |
| Scroll indicator | Pulse arrow | Framer |
| Menu mobile | Slide + stagger links | Framer |
| Toast | Slide bottom | shadcn Sonner |

---

## 7. Film grain texture

SVG filter `feTurbulence` applicato a `body::after` con `mix-blend-mode: overlay`, opacity 0.035. Zero impact performance.
Disabilitato con `prefers-reduced-motion`.

---

## 8. Cursore custom — rimandato

Decisione: **non prioritario**. Eventualmente in Fase 1+ post-launch se richiesto.

---

## 9. Dark / Light mode

- **Default: dark** — focus assoluto
- **Light**: token predisposti in `[data-theme="light"]`, non prioritario in v1

---

## 10. Icone e grafiche

- **Icone UI:** Lucide React
- **Icone servizi (card home):** SVG custom tematici (orbite, browser, neural nodes, forme creative, sfere connesse)
- **Logo:** SVG brandbook ufficiale
- **OG:** next/og (Fase 10)

---

## 11. Accessibilità visiva

- Contrasto ≥ 4.5:1 body, ≥ 3:1 large text (WCAG AA)
- `#f0f4ff` su `#080d1a` → 14.8:1 ✅
- `#3a8fe8` su `#080d1a` → 4.7:1 ✅
- Focus ring: outline 2px `--color-blue` + offset 2px
- Mai solo colore per informazioni (sempre icona/pattern)

### Contrasti nuovi (Fase 4d.2) — manifesto

Il manifesto vive su un bg arancione `#ff8a3d` (radial gradient). Testo:
- Titolo: `#0d1424` navy — contrasto eccellente
- "in ogni fase" (em): `#4a1a0a` marrone scuro — contrasto ottimo
- Label: `#2a1810` bruno scuro
- Body: `#1a0f08` quasi nero

Tutti ben leggibili. Lo shadow bianco aiuta lettering su zone più luminose del gradient.

---

## 12. Responsive breakpoints

```
xs: 375px    iPhone SE
sm: 640px    phablet
md: 768px    tablet (soglia disabilitazione 3D heavy)
lg: 1024px   laptop (soglia scena journey)
xl: 1280px   desktop standard
2xl: 1536px  large display (max layout)
```

**Regola 3D:**
- `< 1024px (lg)` → fallback statico `HomeExperienceFallback` (sezioni tradizionali scrollabili)
- `>= 1024px` → scena 3D unica pinned

---

## 13. Scelte creative Fase 4d.2 (recenti)

### Cambio paradigma: "scena unica persistente"
Prima: hero separato + sezione journey separata → stacco visivo
Ora: una sola Canvas R3F dalla hero alla fine dei takeovers — continuità totale

### Ragionamento pianeta "etereo"
Il pianeta in takeover non diventa un solid gigante che schiaccia il testo, ma un **presenza luminosa trasparente** (opacity 0.4 + glow espanso). Il testo convive con l'atmosfera del pianeta.

### Snap rimosso
Tentato in 4d.1, rimosso in 4d.2: l'utente deve avere controllo continuo dello scroll, non salti forzati che possono "perdersi" fasi.

### TextReveal rimandato
Bello come effetto ma crea overlap in combinazione col pin GSAP precedente. Torneremo in sezioni standalone future (blog, about page) dove non c'è pin attivo prima.

---

## Decisioni creative ancora aperte

- Se l'utente vuole uno **sfondo animato più forte** per il manifesto (es. shader noise, particle flow arancioni, aberrazione cromatica)
- Se il **pianeta Brand (rosa)** è troppo vicino percettivamente al core arancione → eventualmente cambiare in magenta più saturo (`#ff5fa3`)
- Cursore custom sì/no post-launch
