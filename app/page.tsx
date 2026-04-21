export const dynamic = 'force-dynamic'

import Hero from '@/components/sections/Hero'
import ServicesPreview from '@/components/sections/ServicesPreview'
import BarbersPreview from '@/components/sections/BarbersPreview'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <BarbersPreview />
      <Testimonials />
      <CTABanner />
    </>
  )
}
