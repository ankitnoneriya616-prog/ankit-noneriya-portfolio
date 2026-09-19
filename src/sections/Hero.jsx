import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import MagneticButton from '../components/MagneticButton.jsx'

const letter = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 1, 1] } },
}

function RevealLine({ text, className, delay = 0 }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
  }
  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={`inline-flex overflow-hidden ${className}`}
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span variants={letter} className="inline-block">
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const bgX = useTransform(mx, [-0.5, 0.5], [-24, 24])
  const bgY = useTransform(my, [-0.5, 0.5], [-24, 24])
  const bgX2 = useTransform(mx, [-0.5, 0.5], [18, -18])
  const bgY2 = useTransform(my, [-0.5, 0.5], [18, -18])

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 md:px-12"
    >
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-brass/10 blur-[120px]"
      />
      <motion.div
        style={{ x: bgX2, y: bgY2 }}
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-bone/5 blur-[120px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 text-xs tracking-[0.3em] text-mist"
        >
          AI • WEB • CREATIVE
        </motion.p>

        <h1 className="font-display font-medium leading-[0.95] text-bone">
          <RevealLine text="ANKIT" className="block text-[15vw] md:text-[7rem]" delay={0.3} />
          <RevealLine text="NONERIYA" className="block text-[15vw] md:text-[7rem]" delay={0.75} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7 }}
          className="mt-6 text-sm tracking-[0.2em] text-brass"
        >
          AI & DIGITAL CREATIVE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 max-w-2xl font-display text-2xl text-bone md:text-3xl"
        >
          I turn ideas into digital experiences.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65, duration: 0.8 }}
          className="mt-5 max-w-xl text-mist"
        >
          From premium websites and cinematic content to AI-powered creative solutions, I transform ideas
          into experiences that stand out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <MagneticButton href="#contact" variant="solid">
            Work With Me
          </MagneticButton>
          <MagneticButton href="#services" variant="outline">
            View My Services
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
        }
