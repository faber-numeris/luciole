import { Navigation } from './Navigation'
import { Hero } from './Hero'
import { Features } from './Features'
import { CallToAction } from './CallToAction'
import { Footer } from './Footer'

export function Landing() {
  return (
    <div className="landing">
      <Navigation />
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  )
}