import type { Metadata, Viewport } from "next"
import { fontDisplay, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LenisProvider } from "@/providers/lenis-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JsonLdOrganization, JsonLdWebSite } from "@/components/common/json-ld"
import { ScrollRestorationReset } from "@/components/common/scroll-restoration-reset"
import "./globals.css"

// Vercel redirige girosrl.com → www.girosrl.com (307). Host canonico e\u0300 il www
// per allineare canonical/sitemap/JSON-LD con quello che Google trova dopo il redirect.
const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://www.girosrl.com"

export const metadata: Metadata = {
  title: {
    default: "GI.R.O. SRL — Consulenza Digitale, Web & AI a Catania",
    template: "%s | GI.R.O. SRL",
  },
  description:
    "Dal 2018 affianchiamo PMI italiane nella trasformazione digitale. Strategia, sviluppo web, AI e marketing. Un solo partner. Infinite direzioni. Catania.",
  keywords: [
    "consulenza digitale",
    "web agency Catania",
    "sviluppo web",
    "intelligenza artificiale aziende",
    "AI automazione",
    "digital marketing",
    "brand identity",
    "digital transformation",
    "PMI italiane",
    "Meta Ads",
    "Google Ads",
    "e-commerce Sicilia",
    "consulenza strategica",
    "lead generation",
    "Catania",
  ],
  authors: [{ name: "GI.R.O. SRL", url: SITE_URL }],
  creator: "GI.R.O. SRL",
  publisher: "GI.R.O. SRL",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "it-IT": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "GI.R.O. SRL",
    title: "GI.R.O. SRL — Consulenza Digitale, Web & AI a Catania",
    description:
      "Dal 2018 affianchiamo PMI italiane nella trasformazione digitale. Strategia, sviluppo web, AI e marketing. Un solo partner. Infinite direzioni.",
    // images sono auto-iniettate da app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "GI.R.O. SRL — Consulenza Digitale, Web & AI a Catania",
    description:
      "Dal 2018 affianchiamo PMI italiane nella trasformazione digitale. Un solo partner. Infinite direzioni.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: "#080d1a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={cn("h-full antialiased", fontDisplay.variable, fontSans.variable)}
    >
      <head>
        {/* Preconnect a Google Fonts — next/font lo gestisce gia\u0300 in auto
            ma l'esplicita dichiarazione previene eventuali edge case di
            preload mancante su qualche browser/crawler. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLdOrganization />
        <JsonLdWebSite />
        <ScrollRestorationReset />
        <LenisProvider>
          <Header />
          <div className="flex-1 flex flex-col pt-20 md:pt-24">{children}</div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
