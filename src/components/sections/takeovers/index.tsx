"use client"

import type { MotionValue } from "framer-motion"
import type { AreaSlug } from "@/types/content"
import { AreaStrategia } from "./area-strategia"
import { AreaSviluppo } from "./area-sviluppo"
import { AreaIntelligenza } from "./area-intelligenza"
import { AreaBrand } from "./area-brand"
import { AreaMarketing } from "./area-marketing"

type AreaTakeoverProps = {
  slug: AreaSlug
  motionProgress?: MotionValue<number> | undefined
}

export function AreaTakeover({ slug, motionProgress }: AreaTakeoverProps) {
  switch (slug) {
    case "strategia":
      return <AreaStrategia />
    case "sviluppo":
      return <AreaSviluppo motionProgress={motionProgress} />
    case "intelligenza":
      return <AreaIntelligenza />
    case "brand":
      return <AreaBrand />
    case "marketing":
      return <AreaMarketing />
  }
}
