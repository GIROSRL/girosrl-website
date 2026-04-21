import { Inter, Inter_Tight } from "next/font/google"

/**
 * Display font: Inter Tight — variante piu\u0300 stretta della famiglia Inter,
 * ottimale per heading/H1/H2 grandi. Mantiene coerenza col body Inter ma
 * offre un contrasto tipografico netto grazie al tracking piu\u0300 stretto.
 */
export const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
})

/**
 * Body font: Inter (Google Fonts). Pesi 200-700 coprono hairline, body,
 * semibold e bold. Usato come font-sans in tutta l'app.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})
