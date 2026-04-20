import { HomeExperience } from "@/components/sections/home-experience"
import { Methodology } from "@/components/sections/methodology"
import { Numbers } from "@/components/sections/numbers"
import { Testimonial } from "@/components/sections/testimonial"
import { ClientLogos } from "@/components/sections/client-logos"
import { CtaFinal } from "@/components/sections/cta-final"

export default function Home() {
  return (
    <main id="main" className="flex flex-col">
      <HomeExperience />
      <Methodology />
      <Numbers />
      <Testimonial />
      <ClientLogos />
      <CtaFinal />
    </main>
  )
}
