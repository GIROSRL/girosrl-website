import { Inter, Inter_Tight } from "next/font/google"

/**
 * Display font: Inter Tight — variante piu\u0300 stretta della famiglia Inter,
 * ottimale per heading/H1/H2 grandi. Pesi ridotti ai soli realmente usati
 * (700, 800): risparmio ~40KB di font byte al primo load.
 */
export const fontDisplay = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
})

/**
 * Body font: Inter (Google Fonts). Pesi 400 (body), 500 (medium),
 * 600 (semibold CTA), 700 (bold label). Via i 200, 300, 800, 900 non usati
 * nel CSS del sito.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
})
