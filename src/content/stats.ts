export type Stat = {
  value: number
  suffix: string
  label: string
  sublabel?: string
}

export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Progetti completati", sublabel: "dal 2018" },
  { value: 8, suffix: "+", label: "Anni di esperienza", sublabel: "nel digitale" },
  { value: 20, suffix: "+", label: "Clienti attivi", sublabel: "PMI e startup" },
  { value: 5, suffix: "", label: "Aree di competenza", sublabel: "un solo partner" },
]
