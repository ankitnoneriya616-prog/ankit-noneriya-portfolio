import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton.jsx'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-40 md:px-12">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(201,168,118,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl leading-tight text-bone md:text-6xl"
        >
          Your idea deserves a better digital experience.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <MagneticButton href="#contact" variant="solid">
            Start a Project
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
