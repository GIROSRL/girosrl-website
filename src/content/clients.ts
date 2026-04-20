/**
 * Clienti di punta da mostrare nella sezione "Hanno scelto GIRO".
 * Ordine deliberato: Virauto per primo (8+ anni di partnership = proof point).
 *
 * `logo`: path relativo a /public/logos/ (.svg preferito, .png accettato)
 * `alt`: descrizione accessibile
 * `width`: larghezza nativa in px (determina ratio nella grid)
 */

export type Client = {
  slug: string
  name: string
  logo: string
  alt: string
  width?: number
  /** Testo breve sotto il logo (opzionale) */
  tagline?: string
}

export const featuredClients: Client[] = [
  {
    slug: "virauto",
    name: "Virauto Ford Catania",
    logo: "/logos/virauto.png",
    alt: "Virauto Ford Catania — concessionaria ufficiale",
    width: 180,
    tagline: "8+ anni di partnership",
  },
  {
    slug: "sicilia-classica",
    name: "Sicilia Classica",
    logo: "/logos/sicilia-classica.png",
    alt: "Sicilia Classica — tour operator Sicilia",
    width: 180,
  },
  {
    slug: "south-unconventional",
    name: "South Unconventional",
    logo: "/logos/south-unconventional.png",
    alt: "South Unconventional",
    width: 180,
  },
  {
    slug: "sicilery",
    name: "Sicilery",
    logo: "/logos/sicilery.png",
    alt: "Sicilery — prodotti tipici siciliani",
    width: 180,
  },
  {
    slug: "helme",
    name: "Helmè",
    logo: "/logos/helme.png",
    alt: "Helmè",
    width: 180,
  },
]
