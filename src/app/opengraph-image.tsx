import { ImageResponse } from "next/og"

/**
 * Open Graph image generata dinamicamente a build time (edge runtime).
 * Next la inietta automaticamente in <meta property="og:image"> per ogni pagina
 * che non dichiara una sua OG image custom. Dimensione 1200x630, brand navy
 * con accent blu.
 */

export const runtime = "edge"
export const alt = "GI.R.O. SRL — Un solo partner. Infinite direzioni."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 25% 25%, rgba(58,143,232,0.30) 0%, transparent 55%), radial-gradient(circle at 80% 85%, rgba(91,179,240,0.15) 0%, transparent 60%), #080d1a",
          color: "#f0f4ff",
          fontFamily: "system-ui, -apple-system, 'Helvetica Neue', sans-serif",
        }}
      >
        {/* Top row: logo + brand badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Planet + orbit logo */}
          <svg
            width="96"
            height="96"
            viewBox="0 0 96 96"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff8a3d" stopOpacity="1" />
                <stop offset="60%" stopColor="#ff8a3d" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse
              cx="48"
              cy="48"
              rx="44"
              ry="16"
              fill="none"
              stroke="#3a8fe8"
              strokeWidth="2.5"
              transform="rotate(-18 48 48)"
              opacity="0.85"
            />
            <circle cx="48" cy="48" r="11" fill="url(#core)" />
            <circle cx="48" cy="48" r="6" fill="#ff8a3d" />
            <circle cx="86" cy="38" r="4.5" fill="#5bb3f0" />
          </svg>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.35em",
                color: "#8a9ab5",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Consulenza digitale
            </span>
            <span
              style={{
                fontSize: 22,
                color: "#5bb3f0",
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              Catania · dal 2018
            </span>
          </div>
        </div>

        {/* Middle: wordmark + claim */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            GI.R.O. SRL
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: 16,
              fontSize: 42,
              fontWeight: 500,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "#ffffff" }}>Un solo partner.</span>
            <span style={{ color: "#5bb3f0" }}>Infinite direzioni.</span>
          </div>
          <div
            style={{
              marginTop: 32,
              height: 5,
              width: 132,
              background: "#3a8fe8",
              borderRadius: 3,
            }}
          />
        </div>

        {/* Bottom row: url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#8a9ab5",
            fontWeight: 500,
            letterSpacing: "0.04em",
          }}
        >
          <span>girosrl.com</span>
          <span>Strategia · Sviluppo · AI · Brand · Marketing</span>
        </div>
      </div>
    ),
    size
  )
}
