import { HomeExperience } from "@/components/sections/home-experience"
import { Methodology } from "@/components/sections/methodology"
import { Numbers } from "@/components/sections/numbers"
import { Testimonial } from "@/components/sections/testimonial"
import { ClientLogos } from "@/components/sections/client-logos"
import { CtaFinal } from "@/components/sections/cta-final"
import { ScrollToTop } from "@/components/common/scroll-to-top"

export default function Home() {
  return (
    <>
      <main id="main" className="flex flex-col">
        <HomeExperience />
        <Methodology />
        <Numbers />
        <Testimonial />
        <ClientLogos />
        <CtaFinal />
      </main>
      {/* FAB "torna su" — appare una volta superato il primo viewport */}
      <ScrollToTop />
    </>
  )
}
