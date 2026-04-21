import type { MetadataRoute } from "next"
import { serviceAreas } from "@/content/services"
import { paths as servicePaths } from "@/content/paths"

const BASE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://girosrl.com"

/**
 * Sitemap dinamica — Next.js App Router la serve come /sitemap.xml.
 * Include tutte le pagine statiche + le rotte dinamiche dai content file.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/servizi`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/percorsi`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contatti`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/chi-siamo`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/cookie`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const serviceDetailRoutes: MetadataRoute.Sitemap = serviceAreas.map((a) => ({
    url: `${BASE_URL}${a.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const pathDetailRoutes: MetadataRoute.Sitemap = servicePaths.map((p) => ({
    url: `${BASE_URL}${p.href}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceDetailRoutes, ...pathDetailRoutes]
}
