"use server"

import { z } from "zod"
import { Resend } from "resend"

const contactSchema = z.object({
  nome: z.string().trim().min(2, "Inserisci un nome (min 2 caratteri).").max(100),
  email: z.string().trim().email("Email non valida."),
  azienda: z.string().trim().max(120).optional(),
  telefono: z.string().trim().max(40).optional(),
  oggetto: z.enum([
    "strategia",
    "sviluppo",
    "intelligenza",
    "brand",
    "marketing",
    "percorso",
    "altro",
  ]),
  budget: z
    .enum(["<3k", "3-10k", "10-30k", ">30k", "da-definire"])
    .optional(),
  messaggio: z
    .string()
    .trim()
    .min(10, "Scrivi almeno qualche riga (min 10 caratteri).")
    .max(5000),
  privacy: z.literal(true, {
    message: "Devi accettare l'informativa privacy.",
  }),
  /** Honeypot anti-spam. Deve essere vuoto. */
  website: z.string().max(0).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

export type ContactResult =
  | { ok: true; message: string }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof ContactInput, string>> }

const OGGETTO_LABEL: Record<ContactInput["oggetto"], string> = {
  strategia: "Strategia",
  sviluppo: "Sviluppo",
  intelligenza: "Intelligenza (AI)",
  brand: "Brand",
  marketing: "Marketing",
  percorso: "Percorso integrato",
  altro: "Altro",
}

const BUDGET_LABEL: Record<NonNullable<ContactInput["budget"]>, string> = {
  "<3k": "Sotto 3.000 €",
  "3-10k": "3.000 – 10.000 €",
  "10-30k": "10.000 – 30.000 €",
  ">30k": "Oltre 30.000 €",
  "da-definire": "Da definire",
}

export async function submitContactForm(
  raw: Record<string, unknown>,
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse({
    ...raw,
    privacy: raw["privacy"] === "on" || raw["privacy"] === true,
  })

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput | undefined
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return {
      ok: false,
      message: "Controlla i campi evidenziati.",
      fieldErrors,
    }
  }

  const data = parsed.data

  // Honeypot: se compilato → bot. Rispondiamo ok senza inviare nulla.
  if (data.website && data.website.length > 0) {
    return { ok: true, message: "Grazie, ti risponderemo al più presto." }
  }

  const apiKey = process.env["RESEND_API_KEY"]
  const toEmail = process.env["CONTACT_FORM_TO_EMAIL"] ?? "info@girosrl.com"
  const fromEmail = process.env["RESEND_FROM_EMAIL"] ?? "info@girosrl.com"

  if (!apiKey) {
    // In dev / pre-produzione senza API key non blocchiamo: logghiamo
    // (non viene inviata nessuna email ma il form risponde coerente).
    console.warn(
      "[contact-form] RESEND_API_KEY non configurata — messaggio non inviato.",
      { to: toEmail, from: data.email, oggetto: data.oggetto },
    )
    return {
      ok: true,
      message:
        "Messaggio ricevuto! Ti risponderemo entro 24 ore lavorative.",
    }
  }

  try {
    const resend = new Resend(apiKey)
    const oggettoLabel = OGGETTO_LABEL[data.oggetto]
    const budgetLabel = data.budget ? BUDGET_LABEL[data.budget] : "—"

    const subject = `[Sito GIRO] ${oggettoLabel} — ${data.nome}${data.azienda ? ` · ${data.azienda}` : ""}`

    const text = [
      `Nuovo contatto dal sito girosrl.com`,
      ``,
      `Nome: ${data.nome}`,
      `Email: ${data.email}`,
      data.telefono ? `Telefono: ${data.telefono}` : null,
      data.azienda ? `Azienda: ${data.azienda}` : null,
      `Oggetto: ${oggettoLabel}`,
      `Budget indicativo: ${budgetLabel}`,
      ``,
      `Messaggio:`,
      data.messaggio,
    ]
      .filter(Boolean)
      .join("\n")

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:600px;color:#1a2440">
        <h2 style="color:#1a5faa;font-family:Georgia,serif;margin:0 0 16px">
          Nuovo contatto dal sito
        </h2>
        <p style="color:#8a9ab5;margin:0 0 24px;font-size:14px">
          girosrl.com · ${new Date().toLocaleString("it-IT")}
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tbody>
            <tr><td style="padding:6px 0;color:#8a9ab5;width:140px">Nome</td><td style="padding:6px 0"><strong>${escapeHtml(data.nome)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#8a9ab5">Email</td><td style="padding:6px 0"><a href="mailto:${encodeURIComponent(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            ${data.telefono ? `<tr><td style="padding:6px 0;color:#8a9ab5">Telefono</td><td style="padding:6px 0">${escapeHtml(data.telefono)}</td></tr>` : ""}
            ${data.azienda ? `<tr><td style="padding:6px 0;color:#8a9ab5">Azienda</td><td style="padding:6px 0">${escapeHtml(data.azienda)}</td></tr>` : ""}
            <tr><td style="padding:6px 0;color:#8a9ab5">Oggetto</td><td style="padding:6px 0">${escapeHtml(oggettoLabel)}</td></tr>
            <tr><td style="padding:6px 0;color:#8a9ab5">Budget</td><td style="padding:6px 0">${escapeHtml(budgetLabel)}</td></tr>
          </tbody>
        </table>
        <div style="margin-top:24px;padding:16px;background:#f4f7fc;border-radius:8px;border-left:3px solid #1a5faa">
          <div style="color:#8a9ab5;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Messaggio</div>
          <div style="white-space:pre-wrap;line-height:1.6">${escapeHtml(data.messaggio)}</div>
        </div>
      </div>
    `

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: data.email,
      subject,
      text,
      html,
    })

    if (error) {
      console.error("[contact-form] Resend error:", error)
      return {
        ok: false,
        message:
          "Ops, qualcosa è andato storto nell'invio. Riprova o scrivici direttamente a info@girosrl.com.",
      }
    }

    return {
      ok: true,
      message:
        "Messaggio inviato! Ti risponderemo entro 24 ore lavorative.",
    }
  } catch (err) {
    console.error("[contact-form] Unexpected error:", err)
    return {
      ok: false,
      message:
        "Errore inatteso. Scrivici direttamente a info@girosrl.com — ce ne scusiamo.",
    }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
