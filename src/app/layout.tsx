import type { Metadata } from "next"
import { fontDisplay, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { LenisProvider } from "@/providers/lenis-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "GI.R.O. SRL — Un solo partner. Infinite direzioni.",
    template: "%s | GI.R.O. SRL",
  },
  description:
    "Un solo partner per la tua trasformazione digitale. Consulenza, sviluppo web, AI e automazione, marketing per PMI italiane.",
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://girosrl.com"
  ),
  openGraph: {
    siteName: "GI.R.O. SRL",
    locale: "it_IT",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <LenisProvider>
          <Header />
          <div className="flex-1 flex flex-col pt-20 md:pt-24">{children}</div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
