"use client"

import { useState } from "react"

/**
 * Default URL del Programma appuntamenti GI.R.O SRL (Google Calendar).
 * Lun-Ven 09-13 e 16-20 (slot 30 min), auto Google Meet link.
 * L'URL e\u0300 intenzionalmente pubblico (e\u0300 la pagina di booking condivisibile).
 */
const DEFAULT_CALENDAR_URL = "https://calendar.app.google/E1ySGmv5GCrXXm6H9"

/**
 * Embed Google Calendar Appointment Scheduling.
 * Override possibile via env var `NEXT_PUBLIC_GOOGLE_CALENDAR_URL` (utile se
 * un domani si cambia pagina senza toccare il codice).
 */
export function CalendarBooking() {
  const url = process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_URL"] || DEFAULT_CALENDAR_URL
  const [expanded, setExpanded] = useState(false)

  if (!url) return null

  // L'URL "...?gv=true" forza il rendering embed-friendly di Google Calendar
  const embedUrl = url.includes("?") ? `${url}&gv=true` : `${url}?gv=true`

  return (
    <div className="rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40 overflow-hidden">
      <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="text-xs tracking-widest uppercase text-[var(--color-blue)] font-semibold mb-1">
            Prenota direttamente
          </div>
          <div className="font-display text-xl md:text-2xl font-bold leading-tight">
            Call gratuita di 30 minuti
          </div>
          <div className="text-sm text-[var(--color-gray-mid)] mt-1">
            Scegli un orario dal nostro calendario Google, confermi e basta.
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--color-blue)] text-white hover:brightness-110 transition"
          >
            {expanded ? "Nascondi calendario" : "Apri calendario"}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--color-navy-light)] hover:border-[var(--color-blue-dark)] transition"
          >
            Apri in Google →
          </a>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-[var(--color-navy-light)]">
          <iframe
            src={embedUrl}
            title="Prenota una call — Google Calendar"
            className="w-full"
            style={{ height: "720px", border: 0, colorScheme: "light" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  )
}
