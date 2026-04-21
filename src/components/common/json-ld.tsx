/**
 * JSON-LD structured data per Google / motori di ricerca.
 * Ogni export ritorna un <script type="application/ld+json"> inline — montabile
 * ovunque, ma tipicamente nel body della pagina/layout. Zero dipendenze client.
 *
 * Schemi disponibili:
 *   - JsonLdOrganization   → ProfessionalService (root layout, tutte le pagine)
 *   - JsonLdWebSite        → WebSite + SearchAction (root layout)
 *   - JsonLdLocalBusiness  → LocalBusiness con geo Catania (home + contatti)
 *   - JsonLdFaqPage        → FAQPage (home + servizi)
 *   - JsonLdBreadcrumb     → BreadcrumbList (tutte le sub-route)
 *   - JsonLdService        → Service (servizi/[slug] + percorsi/[slug])
 */

const BASE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://girosrl.com"

function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════
 * Organization (ProfessionalService) — identità GIRO SRL
 * ═══════════════════════════════════════════════════════════════════ */

export function JsonLdOrganization() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}#organization`,
    name: "GI.R.O. SRL",
    legalName: "GI.R.O. S.R.L.",
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    image: `${BASE_URL}/opengraph-image`,
    description:
      "Consulenza digitale integrata per PMI italiane. Strategia, sviluppo web, AI e automazione, brand, marketing — un solo partner, cinque direzioni.",
    slogan: "Un solo partner. Infinite direzioni.",
    foundingDate: "2018",
    vatID: "IT04331240871",
    taxID: "04331240871",
    areaServed: { "@type": "Country", name: "Italy" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Viale Ulisse 22",
      addressLocality: "Catania",
      addressRegion: "CT",
      postalCode: "95126",
      addressCountry: "IT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+39-393-274-3260",
      contactType: "customer service",
      email: "info@girosrl.com",
      availableLanguage: "Italian",
    },
    knowsAbout: [
      "Consulenza strategica digitale",
      "Sviluppo web",
      "E-commerce",
      "Intelligenza artificiale",
      "Brand identity",
      "Digital marketing",
      "Social media management",
      "Digital transformation",
    ],
    sameAs: [] as string[],
  }
  return <Script data={data} />
}

/* ═══════════════════════════════════════════════════════════════════
 * WebSite + SearchAction
 * ═══════════════════════════════════════════════════════════════════ */

export function JsonLdWebSite() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}#website`,
    url: BASE_URL,
    name: "GI.R.O. SRL",
    inLanguage: "it-IT",
    publisher: { "@id": `${BASE_URL}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
  return <Script data={data} />
}

/* ═══════════════════════════════════════════════════════════════════
 * LocalBusiness — Catania, geo coords, opening hours
 * ═══════════════════════════════════════════════════════════════════ */

export function JsonLdLocalBusiness() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#localbusiness`,
    name: "GI.R.O. SRL",
    image: `${BASE_URL}/opengraph-image`,
    url: BASE_URL,
    telephone: "+393932743260",
    email: "info@girosrl.com",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Viale Ulisse 22",
      addressLocality: "Catania",
      addressRegion: "CT",
      postalCode: "95126",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.5079,
      longitude: 15.083,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  }
  return <Script data={data} />
}

/* ═══════════════════════════════════════════════════════════════════
 * FAQPage — array di Q&A
 * ═══════════════════════════════════════════════════════════════════ */

export type FaqItem = { q: string; a: string }

export function JsonLdFaqPage({ items }: { items: readonly FaqItem[] }) {
  if (!items || items.length === 0) return null
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }
  return <Script data={data} />
}

/* ═══════════════════════════════════════════════════════════════════
 * BreadcrumbList — array di {name, path}
 * ═══════════════════════════════════════════════════════════════════ */

export type BreadcrumbItem = { name: string; path: string }

export function JsonLdBreadcrumb({ items }: { items: readonly BreadcrumbItem[] }) {
  if (!items || items.length === 0) return null
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${BASE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  }
  return <Script data={data} />
}

/* ═══════════════════════════════════════════════════════════════════
 * Service — per /servizi/[slug] e /percorsi/[slug]
 * ═══════════════════════════════════════════════════════════════════ */

export function JsonLdService({
  name,
  description,
  serviceType,
  path,
}: {
  name: string
  description: string
  serviceType: string
  path: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
    areaServed: { "@type": "Country", name: "Italy" },
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}#organization`,
      name: "GI.R.O. SRL",
      url: BASE_URL,
    },
  }
  return <Script data={data} />
}
