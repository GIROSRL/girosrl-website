"use client"

/**
 * Dashboard mock fittizia compatta — usata come preview progetto per area Intelligenza.
 * (Estratto dal project-preview.tsx rimosso nel cleanup Fase 4b, versione scalata).
 */
export function DashboardMock({ accent }: { accent: string }) {
  return (
    <div
      className="w-full h-full flex bg-[#0b1020] text-white overflow-hidden text-[6px] leading-none"
      style={{ fontFamily: "var(--font-sans), Inter, sans-serif" }}
    >
      <aside className="w-12 bg-[#070c1a] border-r border-[#1a2a4a] flex flex-col py-2 px-1.5 shrink-0 gap-0.5">
        <div className="flex items-center gap-1 mb-1.5">
          <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <span className="font-bold tracking-widest">GIRO</span>
        </div>
        {["Dash", "Clienti", "Team", "Report"].map((item, i) => (
          <div
            key={item}
            className="px-1 py-0.5 rounded"
            style={{
              background: i === 0 ? `${accent}22` : "transparent",
              color: i === 0 ? "#fff" : "#8a9ab5",
            }}
          >
            {item}
          </div>
        ))}
      </aside>

      <div className="flex-1 flex flex-col min-w-0 p-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="font-semibold text-[7px]">Overview</div>
          <div className="flex gap-0.5">
            {["7d", "30d", "90d"].map((r, i) => (
              <div
                key={r}
                className="px-1 rounded"
                style={{
                  background: i === 1 ? accent : "#1a2a4a",
                  color: i === 1 ? "#fff" : "#8a9ab5",
                }}
              >
                {r}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 mb-1.5">
          {[
            { l: "REV", v: "128k", d: "+12%" },
            { l: "SESS", v: "48.2k", d: "+8%" },
            { l: "CR", v: "3.8%", d: "+0.6" },
          ].map((k) => (
            <div
              key={k.l}
              className="p-1 rounded bg-[#0f172e] border border-[#1a2a4a]"
            >
              <div className="text-[5px] uppercase text-[#8a9ab5]">{k.l}</div>
              <div className="font-bold text-[8px]">{k.v}</div>
              <div className="text-[5px]" style={{ color: accent }}>
                {k.d}
              </div>
            </div>
          ))}
        </div>

        <div className="p-1 rounded bg-[#0f172e] border border-[#1a2a4a] flex-1">
          <div className="text-[6px] font-semibold mb-1">Revenue trend</div>
          <svg viewBox="0 0 100 30" className="w-full h-auto" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chart-fill-mini" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
                <stop offset="100%" stopColor={accent} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 22 L 12 18 L 25 20 L 37 14 L 50 12 L 62 15 L 75 9 L 87 7 L 100 5 L 100 30 L 0 30 Z"
              fill="url(#chart-fill-mini)"
            />
            <path
              d="M 0 22 L 12 18 L 25 20 L 37 14 L 50 12 L 62 15 L 75 9 L 87 7 L 100 5"
              fill="none"
              stroke={accent}
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
