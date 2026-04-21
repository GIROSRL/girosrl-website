import type { Metadata, Viewport } from "next"
import { fontDisplay, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LenisProvider } from "@/providers/lenis-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { JsonLdOrganization } from "@/components/common/json-ld"
import "./globals.css"

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://girosrl.com"

export const metadata: Metadata = {
  title: {
    default: "GI.R.O. SRL — Un solo partner. Infinite direzioni.",
    template: "%s | GI.R.O. SRL",
  },
  description:
    "Un solo partner per la trasformazione digitale delle PMI italiane. Consulenza strategica, sviluppo web, AI e automazione, brand e marketing — cinque direzioni, un solo interlocutore. Catania.",
  keywords: [
    "consulenza digitale",
    "sviluppo web",
    "intelligenza artificiale",
    "digital marketing",
    "brand identity",
    "digital transformation",
    "PMI italiane",
    "Catania",
    "Sicilia",
    "partner digitale",
  ],
  authors: [{ name: "GI.R.O. SRL", url: SITE_URL }],
  creator: "GI.R.O. SRL",
  publisher: "GI.R.O. SRL",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: SITE_URL,
    siteName: "GI.R.O. SRL",
    title: "GI.R.O. SRL — Un solo partner. Infinite direzioni.",
    description:
      "Consulenza digitale integrata per PMI. Strategia, sviluppo, AI, brand, marketing. Catania.",
    images: [
      {
        url: "/images/logo-symbol.svg",
        width: 512,
        height: 512,
        alt: "GI.R.O. SRL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GI.R.O. SRL — Un solo partner. Infinite direzioni.",
    description:
      "Consulenza digitale integrata per PMI italiane.",
    images: ["/images/logo-symbol.svg"],
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
      <body className="min-h-full flex flex-col">
        <JsonLdOrganization />
        <LenisProvider>
          <Header />
          <div className="flex-1 flex flex-col pt-20 md:pt-24">{children}</div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
