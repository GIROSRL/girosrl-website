const BASE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://girosrl.com"

/**
 * JSON-LD structured data per Google / motori di ricerca.
 * - Organization: chi siamo (LocalBusiness variant per geo targeting Catania)
 * - WebSite: identifica il sito + potenziale sitelinks searchbox
 * Renderizzato in <head> via script type="application/ld+json".
 */
export function JsonLdOrganization() {
  const org = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}#organization`,
    name: "GI.R.O. SRL",
    legalName: "GI.R.O. S.R.L.",
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    image: `${BASE_URL}/images/projects/siciliaclassica-preview.jpg`,
    description:
      "Consulenza digitale integrata per PMI italiane. Strategia, sviluppo web, AI e automazione, brand, marketing — un solo partner, cinque direzioni.",
    slogan: "Un solo partner. Infinite direzioni.",
    foundingDate: "2018",
    vatID: "IT04331240871",
    taxID: "04331240871",
    areaServed: { "@type": "Country", name: "Italy" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Catania",
      addressRegion: "CT",
      addressCountry: "IT",
    },
    knowsAbout: [
      "Consulenza strategica digitale",
      "Sviluppo web",
      "Intelligenza artificiale",
      "Brand identity",
      "Digital marketing",
      "Social media management",
      "Digital transformation",
    ],
    sameAs: [
      // Aggiungere quando disponibili: LinkedIn, Instagram, etc.
    ],
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}#website`,
    url: BASE_URL,
    name: "GI.R.O. SRL",
    inLanguage: "it-IT",
    publisher: { "@id": `${BASE_URL}#organization` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
