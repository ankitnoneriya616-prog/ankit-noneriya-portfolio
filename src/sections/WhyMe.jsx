import { motion } from 'framer-motion'

const points = [
  'Creative thinking backed by technology.',
  'Premium visual direction and attention to detail.',
  'AI-assisted workflows for faster, smarter execution.',
  'One creative partner across web, video, audio and content.',
]

export default function WhyMe() {
  return (
    <section className="border-y border-bone/10 bg-charcoal/30">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-32 md:grid-cols-[0.8fr_1.2fr] md:px-12">
        <div>
          <p className="text-xs tracking-[0.3em] text-mist">WHY WORK WITH ME</p>
          <h2 className="mt-4 font-display text-4xl text-bone md:text-5xl">
            Built around your vision.
          </h2>
        </div>

        <div className="space-y-0">
          {points.map((point, index) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex gap-6 border-t border-bone/10 py-7"
            >
              <span className="font-display text-sm text-brass/70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="max-w-xl text-lg text-mist">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
