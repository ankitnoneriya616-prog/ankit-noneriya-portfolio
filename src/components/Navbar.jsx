
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? 'border-b border-bone/10 bg-ink/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" data-cursor="link" className="font-display text-lg text-bone">
          AN
        </a>
        <nav className="hidden gap-10 text-sm text-mist md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-cursor="link" className="transition-colors hover:text-bone">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          data-cursor="link"
          className="hidden border border-bone/25 px-5 py-2.5 text-sm text-bone transition-colors hover:border-brass hover:text-brass md:inline-block"
        >
          Start a Project
        </a>
      </div>
    </motion.header>
  )
}
