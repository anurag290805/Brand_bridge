import FilmLayer from './components/FilmLayer'
import Starfield from './components/Starfield'
import Nav from './components/Nav'
import Hero from './components/Hero'
import WhatIs from './components/WhatIs'
import WhoItsFor from './components/WhoItsFor'
import Matching from './components/Matching'
import Economics from './components/Economics'
import Process from './components/Process'
import Niches from './components/Niches'
import OpportunityPreview from './components/OpportunityPreview'
import TrustSection from './components/TrustSection'
import Faq from './components/Faq'
import CreatorForm from './components/CreatorForm'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import BackToTop from './components/BackToTop'
import { ToastProvider } from './lib/Toast'

/**
 * BrandBridge single-page marketing site.
 * Section order follows the brief's conversion flow: build trust + clarity,
 * then an easy low-friction actrun on for cold-emailed creators.
 */
export default function App() {
  return (
    <ToastProvider>
      {/* The persistent film world sits behind the whole page */}
      <FilmLayer />
      {/* Drifting 3D starfield — also fixed behind content, above the glows */}
      <Starfield />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:rounded-[8px] focus:bg-[--color-cta-bg] focus:px-4 focus:py-2 focus:text-[--color-cta-text] focus:text-[14px] focus:font-medium focus:shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
      >
        Skip to content
      </a>
      {/* Depth wash under the raised nav · element the CSS scroll-edge-fade
          rules drive via body.nav-raised (pure CSS, zero JS). */}
      <div id="scroll-edge-fade" aria-hidden="true" />
      <Nav />
      <main id="main-content" className="relative z-10">
        <Hero />
        <WhatIs />
        <WhoItsFor />
        <Matching />
        <Economics />
        <Process />
        <Niches />
        <OpportunityPreview />
        <TrustSection />
        <Faq />
        <CreatorForm />
      </main>
      <Footer />
      <CookieBanner />
      <BackToTop />
    </ToastProvider>
  )
}