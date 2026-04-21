import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GI.R.O. SRL — Consulenza digitale",
    short_name: "GI.R.O.",
    description:
      "Un solo partner per la trasformazione digitale delle PMI italiane. Strategia, sviluppo, AI, brand e marketing.",
    start_url: "/",
    display: "standalone",
    background_color: "#080d1a",
    theme_color: "#080d1a",
    lang: "it-IT",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    categories: ["business", "technology", "productivity"],
  }
}
