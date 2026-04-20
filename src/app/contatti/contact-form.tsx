"use client"

import { useState, useTransition } from "react"
import { submitContactForm, type ContactInput } from "./actions"
import { GiroButton } from "@/components/common/giro-button"
import { cn } from "@/lib/utils"

type FieldErrors = Partial<Record<keyof ContactInput, string>>

const OGGETTI: { value: string; label: string }[] = [
  { value: "percorso", label: "Un percorso integrato" },
  { value: "strategia", label: "Strategia / consulenza" },
  { value: "sviluppo", label: "Sviluppo web / app" },
  { value: "intelligenza", label: "AI & automazione" },
  { value: "brand", label: "Brand & identità" },
  { value: "marketing", label: "Marketing & performance" },
  { value: "altro", label: "Altro" },
]

const BUDGETS: { value: string; label: string }[] = [
  { value: "da-definire", label: "Da definire insieme" },
  { value: "<3k", label: "Sotto 3.000 €" },
  { value: "3-10k", label: "3.000 – 10.000 €" },
  { value: "10-30k", label: "10.000 – 30.000 €" },
  { value: ">30k", label: "Oltre 30.000 €" },
]

export function ContactForm() {
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "success"; message: string }
    | { kind: "error"; message: string; fieldErrors?: FieldErrors }
  >({ kind: "idle" })

  async function handleSubmit(formData: FormData) {
    const raw: Record<string, unknown> = {}
    formData.forEach((value, key) => {
      raw[key] = value
    })

    startTransition(async () => {
      const res = await submitContactForm(raw)
      if (res.ok) {
        setStatus({ kind: "success", message: res.message })
      } else {
        setStatus({
          kind: "error",
          message: res.message,
          ...(res.fieldErrors ? { fieldErrors: res.fieldErrors } : {}),
        })
      }
    })
  }

  if (status.kind === "success") {
    return (
      <div className="relative rounded-2xl border border-[var(--color-blue-dark)]/40 bg-[var(--color-navy-mid)]/70 p-8 md:p-12 text-center">
        <div className="mx-auto mb-6 w-14 h-14 rounded-full flex items-center justify-center bg-[var(--color-blue)]/15 border border-[var(--color-blue)]/40">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-blue-light)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
          Grazie! Messaggio ricevuto.
        </h3>
        <p className="text-base md:text-lg text-[var(--color-gray-mid)] max-w-lg mx-auto">
          {status.message}
        </p>
      </div>
    )
  }

  const fieldErrors =
    status.kind === "error" && status.fieldErrors ? status.fieldErrors : {}

  return (
    <form
      action={handleSubmit}
      noValidate
      className="space-y-6 rounded-2xl border border-[var(--color-navy-light)] bg-[var(--color-navy-mid)]/40 p-6 md:p-10"
    >
      {/* Honeypot (invisibile agli umani, visibile ai bot) */}
      <div aria-hidden className="absolute left-[-10000px] opacity-0 pointer-events-none">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Nome e cognome"
          name="nome"
          required
          autoComplete="name"
          error={fieldErrors.nome}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={fieldErrors.email}
        />
        <Field
          label="Azienda"
          name="azienda"
          autoComplete="organization"
          error={fieldErrors.azienda}
        />
        <Field
          label="Telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          error={fieldErrors.telefono}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SelectField
          label="Di cosa vorresti parlarci?"
          name="oggetto"
          required
          options={OGGETTI}
          error={fieldErrors.oggetto}
        />
        <SelectField
          label="Budget indicativo"
          name="budget"
          options={BUDGETS}
          error={fieldErrors.budget}
        />
      </div>

      <TextAreaField
        label="Raccontaci qualcosa in più"
        name="messaggio"
        required
        rows={6}
        placeholder="Dimmi il contesto, cosa vuoi costruire, cosa ti sta frenando oggi..."
        error={fieldErrors.messaggio}
      />

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm text-[var(--color-gray-mid)] leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            name="privacy"
            required
            className="mt-1 w-4 h-4 rounded border border-[var(--color-navy-light)] bg-[var(--color-navy)] accent-[var(--color-blue)] shrink-0"
          />
          <span>
            Ho letto l&apos;
            <a
              href="/privacy"
              className="text-[var(--color-blue-light)] hover:underline underline-offset-2"
            >
              informativa privacy
            </a>{" "}
            e acconsento al trattamento dei miei dati per essere ricontattato.
          </span>
        </label>
        {fieldErrors.privacy && (
          <p className="text-xs text-red-400 pl-7">{fieldErrors.privacy}</p>
        )}
      </div>

      {status.kind === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200"
        >
          {status.message}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <GiroButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={pending}
          className="w-full sm:w-auto"
        >
          {pending ? "Invio in corso…" : "Invia messaggio"}
        </GiroButton>
        <p className="text-xs text-[var(--color-gray-mid)]">
          Ti rispondiamo entro 24 ore lavorative — niente risposte automatiche.
        </p>
      </div>
    </form>
  )
}

// ─── Field primitives ─────────────────────────────────────────────────

type FieldProps = {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  error?: string | undefined
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
}: FieldProps) {
  return (
    <label className="block">
      <LabelRow label={label} required={required} />
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={inputClasses(!!error)}
      />
      <ErrorLine error={error} />
    </label>
  )
}

function SelectField({
  label,
  name,
  required,
  options,
  error,
}: {
  label: string
  name: string
  required?: boolean
  options: { value: string; label: string }[]
  error?: string | undefined
}) {
  return (
    <label className="block">
      <LabelRow label={label} required={required} />
      <select
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={!!error}
        className={inputClasses(!!error)}
      >
        <option value="" disabled>
          Seleziona…
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorLine error={error} />
    </label>
  )
}

function TextAreaField({
  label,
  name,
  required,
  rows = 5,
  placeholder,
  error,
}: {
  label: string
  name: string
  required?: boolean
  rows?: number
  placeholder?: string
  error?: string | undefined
}) {
  return (
    <label className="block">
      <LabelRow label={label} required={required} />
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cn(inputClasses(!!error), "resize-y min-h-[120px]")}
      />
      <ErrorLine error={error} />
    </label>
  )
}

function LabelRow({
  label,
  required,
}: {
  label: string
  required?: boolean | undefined
}) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--color-gray-mid)] mb-2">
      <span>{label}</span>
      {required && (
        <span aria-hidden className="text-[var(--color-blue-light)]">
          *
        </span>
      )}
    </span>
  )
}

function ErrorLine({ error }: { error?: string | undefined }) {
  if (!error) return null
  return <p className="mt-1.5 text-xs text-red-400">{error}</p>
}

function inputClasses(hasError: boolean) {
  return cn(
    "w-full px-4 py-3 rounded-lg text-sm text-[var(--fg)] placeholder:text-[var(--color-gray-mid)]/60",
    "bg-[var(--color-navy)]/60 border transition-colors duration-200",
    "focus:outline-none focus:border-[var(--color-blue)] focus:bg-[var(--color-navy)]/80",
    hasError
      ? "border-red-400/60"
      : "border-[var(--color-navy-light)] hover:border-[var(--color-navy-accent)]",
  )
}
