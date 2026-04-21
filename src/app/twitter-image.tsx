// Twitter usa lo stesso formato 1200x630 dell'Open Graph.
// Next.js non supporta re-export dei route segment config (runtime, size, etc.),
// percio\u0300 ridichiariamo qui gli export direttamente e deleghiamo il render
// a una funzione helper in opengraph-image.tsx (non re-esportabile via `export ... from`).

import OpengraphImage from "./opengraph-image"

export const runtime = "edge"
export const alt = "GI.R.O. SRL — Un solo partner. Infinite direzioni."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function TwitterImage() {
  return OpengraphImage()
}
