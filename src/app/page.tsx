import { HomeExperience } from "@/components/sections/home-experience"
import { Methodology } from "@/components/sections/methodology"
import { Numbers } from "@/components/sections/numbers"
import { Testimonial } from "@/components/sections/testimonial"
import { ClientLogos } from "@/components/sections/client-logos"
import { CtaFinal } from "@/components/sections/cta-final"
import { ScrollToTop } from "@/components/common/scroll-to-top"
import {
  JsonLdLocalBusiness,
  JsonLdFaqPage,
} from "@/components/common/json-ld"
import { homeFaqs } from "@/content/faqs"

export default function Home() {
  return (
    <>
      <JsonLdLocalBusiness />
      <JsonLdFaqPage items={homeFaqs} />
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
