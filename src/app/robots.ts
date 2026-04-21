import type { MetadataRoute } from "next"

const BASE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://www.girosrl.com"

/**
 * /robots.txt — Next.js App Router lo genera automaticamente da questo file.
 * Index aperta, con esclusione di rotte interne (design system, API).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/design-system", // dev-only
          "/api/",
          "/_next/", // build assets
          "/admin/", // area riservata (se/quando esistera\u0300)
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
