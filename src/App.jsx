import { MotionConfig } from 'framer-motion'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Services from './sections/Services.jsx'
import Work from './sections/Work.jsx'
import WhyMe from './sections/WhyMe.jsx'
import Contact from './sections/Contact.jsx'
import FinalCTA from './sections/FinalCTA.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-ink text-bone">
        <Cursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Work />
          <WhyMe />
          <Contact />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
