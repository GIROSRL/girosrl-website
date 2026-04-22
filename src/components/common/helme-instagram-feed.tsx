import { helmeInstagram } from "@/content/helme-instagram"

/**
 * Helme\u0300 Instagram feed — profilo + grid 2x3 dei post REALI di @helmestore.
 * Usato sia nel takeover Marketing desktop (dentro CampaignDashboard) sia
 * nel fallback mobile home-experience. Lo screenshot del feed reale viene
 * catturato da scripts/capture-previews.mjs (Playwright), salvato in
 * /images/projects/helme-instagram-preview.jpg. Per aggiornare:
 *   `node scripts/capture-previews.mjs`
 */
export function HelmeInstagramFeed() {
  return (
    <div
      className="rounded-lg overflow-hidden border flex flex-col"
      style={{
        borderColor: "rgba(255,255,255,0.12)",
        background: "#0a0e1a",
      }}
    >
      {/* Profile header — dati reali da @helmestore */}
      <div className="flex items-center gap-2 px-2 py-2 border-b border-white/10">
        {/* Avatar reale con ring stile Instagram story */}
        <div
          className="relative p-[2px] rounded-full"
          style={{
            background:
              "conic-gradient(from 140deg, #f09433, #bc1888, #cc2366, #e6683c, #f09433)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={helmeInstagram.avatar}
            alt={`Avatar ${helmeInstagram.displayName}`}
            className="w-7 h-7 rounded-full object-cover"
            style={{ boxShadow: "inset 0 0 0 2px #0a0e1a" }}
            draggable={false}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold text-white truncate">
            @{helmeInstagram.handle}
          </div>
          <div className="text-[7px] text-white/50 truncate">
            {helmeInstagram.displayName} · Luxury lifestyle
          </div>
        </div>
        <div
          className="px-1.5 py-0.5 rounded text-[7px] font-bold"
          style={{ background: "#fbbf24", color: "#0d1424" }}
        >
          SEGUI
        </div>
      </div>

      {/* Stats strip — numeri reali */}
      <div className="grid grid-cols-3 text-center border-b border-white/10 py-1.5">
        <div>
          <div className="text-[9px] font-bold text-white leading-none">
            {helmeInstagram.posts}
          </div>
          <div className="text-[6px] uppercase tracking-wider text-white/40 mt-0.5">
            Post
          </div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-white leading-none">
            {helmeInstagram.followers}
          </div>
          <div className="text-[6px] uppercase tracking-wider text-white/40 mt-0.5">
            Follower
          </div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-white leading-none">
            {helmeInstagram.following}
          </div>
          <div className="text-[6px] uppercase tracking-wider text-white/40 mt-0.5">
            Seguiti
          </div>
        </div>
      </div>

      {/* Grid 2x3 dei post REALI — screenshot dal feed @helmestore */}
      <div className="flex-1 overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/helme-instagram-preview.jpg"
          alt="Feed Instagram @helmestore — post editoriali luxury lifestyle"
          className="w-full h-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Footer: engagement rate */}
      <div className="px-2 py-1.5 border-t border-white/10 flex items-center gap-2">
        <span className="text-[7px] uppercase tracking-widest text-[#fbbf24] font-semibold">
          Engagement
        </span>
        <span className="ml-auto text-[8px] font-bold text-white">6.2%</span>
        <span className="text-[7px] font-semibold" style={{ color: "#34d399" }}>
          +2.1pt
        </span>
      </div>
    </div>
  )
}
