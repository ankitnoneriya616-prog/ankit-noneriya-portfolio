import { motion } from 'framer-motion'

const tints = {
  Websites: 'from-[#2b2620] to-[#0A0A0B]',
  Video: 'from-[#1c2422] to-[#0A0A0B]',
  Thumbnails: 'from-[#241c22] to-[#0A0A0B]',
  AI: 'from-[#1c1f24] to-[#0A0A0B]',
  Content: 'from-[#221f24] to-[#0A0A0B]',
}

export default function ProjectCard({ index, category, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      data-cursor="link"
    >
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${tints[category] || tints.Websites}`}>
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 border border-bone/10"
        />
        <div className="absolute inset-0 flex items-end bg-ink/40 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="text-xs tracking-[0.2em] text-brass">{category.toUpperCase()}</span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg text-bone">{title}</h3>
        <span className="whitespace-nowrap text-xs tracking-widest text-mist">{category}</span>
      </div>
      <p className="mt-1 text-sm text-mist">{description}</p>
    </motion.div>
  )
}
