"use client"

import type { AreaSlug } from "@/types/content"
import { AreaStrategia } from "./area-strategia"
import { AreaSviluppo } from "./area-sviluppo"
import { AreaIntelligenza } from "./area-intelligenza"
import { AreaBrand } from "./area-brand"
import { AreaMarketing } from "./area-marketing"

/**
 * Seleziona il componente tematico per ogni area di servizio.
 * Ogni area ha un layout VISIVAMENTE DISTINTO per evitare ripetizione.
 */
export function AreaTakeover({ slug }: { slug: AreaSlug }) {
  switch (slug) {
    case "strategia":
      return <AreaStrategia />
    case "sviluppo":
      return <AreaSviluppo />
    case "intelligenza":
      return <AreaIntelligenza />
    case "brand":
      return <AreaBrand />
    case "marketing":
      return <AreaMarketing />
  }
}
