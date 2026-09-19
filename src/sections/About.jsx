import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.3em] text-mist"
        >
          ABOUT
        </motion.p>
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl leading-tight text-bone md:text-5xl"
          >
            Creative mind. Digital builder.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 space-y-5 text-lg text-mist"
          >
            <p>
              I'm Ankit Noneriya, an AI & digital creative specialist focused on turning ideas into
              high-quality digital experiences.
            </p>
            <p>
              From modern websites and engaging videos to thumbnails, audio, music and AI-powered
              creative solutions, I combine technology with creativity to build work that looks
              professional and delivers impact.
            </p>
            <p className="text-bone">
              My goal is simple — create better, faster and smarter digital content.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
