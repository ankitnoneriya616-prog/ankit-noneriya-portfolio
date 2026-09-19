import { motion } from 'framer-motion'

export default function ServiceCard({ index, title, description }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden border border-bone/10 bg-charcoal/60 p-8 transition-colors duration-500 hover:border-brass/40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(201,168,118,0.08), transparent 70%)',
        }}
      />
      <span className="font-display text-sm text-brass/70">{String(index + 1).padStart(2, '0')}</span>
      <h3 className="mt-6 font-display text-xl text-bone md:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mist">{description}</p>
    </motion.div>
  )
}
