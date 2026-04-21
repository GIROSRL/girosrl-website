"use client"

/**
 * Default URL del Programma appuntamenti GI.R.O SRL (Google Calendar).
 * Lun-Ven 09-13 e 16-20 (slot 30 min), auto Google Meet link.
 * L'URL e\u0300 intenzionalmente pubblico (e\u0300 la pagina di booking condivisibile).
 */
const DEFAULT_CALENDAR_URL = "https://calendar.app.google/E1ySGmv5GCrXXm6H9"

/**
 * Bottone prenotazione Google Calendar.
 *
 * NB: Google imposta `X-Frame-Options: SAMEORIGIN` sulle pagine di
 * appointment scheduling → iframe embed IMPOSSIBILE da qualsiasi dominio
 * che non sia calendar.google.com.
 *
 * Soluzione: click apre un popup window (top-level, non iframe) con la
 * pagina di booking — funziona sempre, feel modale. Fallback link in
 * nuova tab se popup bloccati dal browser.
 */
export function CalendarBooking() {
  const url = process.env["NEXT_PUBLIC_GOOGLE_CALENDAR_URL"] || DEFAULT_CALENDAR_URL

  if (!url) return null

  const openPopup = () => {
    const w = Math.min(960, window.innerWidth - 40)
    const h = Math.min(780, window.innerHeight - 40)
    const left = Math.round((window.screen.width - w) / 2)
    const top = Math.round((window.screen.height - h) / 2)
    const popup = window.open(
      url,
      "giro-booking",
      `width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes,status=no,menubar=no,toolbar=no,location=yes`
    )
    // Se il browser blocca i popup fallback a nuova tab
    if (!popup || popup.closed) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      popup.focus()
    }
  }

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
            Scegli uno slot dal calendario · link Google Meet incluso automaticamente.
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={openPopup}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--color-blue)] text-white hover:brightness-110 transition inline-flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Prenota una call
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--color-navy-light)] hover:border-[var(--color-blue-dark)] transition"
          >
            Apri in nuova tab →
          </a>
        </div>
      </div>
    </div>
  )
}
