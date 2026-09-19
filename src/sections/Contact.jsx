import { useState } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton.jsx'

const services = [
  'Website Design & Development',
  'Website Creation',
  'Video Editing',
  'Voice & Music Editing',
  'Thumbnail Design',
  'AI Solutions',
  'Content Creation',
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    whatsapp: '',
    email: '',
    service: services[0],
    budget: '',
    details: '',
  })

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const message = [
      'Hello Ankit, I would like to discuss a project.',
      '',
      `Name: ${form.name}`,
      `WhatsApp: ${form.whatsapp}`,
      `Email: ${form.email}`,
      `Service: ${form.service}`,
      `Budget: ${form.budget || 'Not specified'}`,
      '',
      'Project Details:',
      form.details,
    ].join('\n')

    window.open(`https://wa.me/919009480541?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="grid gap-16 md:grid-cols-[0.75fr_1.25fr] md:gap-24">
        <div>
          <p className="text-xs tracking-[0.3em] text-mist">CONTACT</p>
          <h2 className="mt-4 font-display text-4xl text-bone md:text-5xl">
            Let&apos;s build something great.
          </h2>
          <p className="mt-6 max-w-md text-mist">
            Have an idea, project or digital experience in mind? Send me the details and let&apos;s
            start a conversation.
          </p>

          <a
            href="https://wa.me/919009480541"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="mt-8 inline-flex text-sm uppercase tracking-[0.15em] text-brass transition-colors hover:text-bone"
          >
            Chat on WhatsApp →
          </a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid gap-8 md:grid-cols-2">
            <label className="block">
              <span className="text-xs tracking-[0.2em] text-mist">NAME</span>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-3 w-full border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition-colors placeholder:text-mist/50 focus:border-brass"
                placeholder="Your name"
              />
            </label>

            <label className="block">
              <span className="text-xs tracking-[0.2em] text-mist">WHATSAPP NUMBER</span>
              <input
                required
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="mt-3 w-full border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition-colors placeholder:text-mist/50 focus:border-brass"
                placeholder="Your WhatsApp number"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs tracking-[0.2em] text-mist">EMAIL</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-3 w-full border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition-colors placeholder:text-mist/50 focus:border-brass"
              placeholder="you@example.com"
            />
          </label>

          <div className="grid gap-8 md:grid-cols-2">
            <label className="block">
              <span className="text-xs tracking-[0.2em] text-mist">SERVICE REQUIRED</span>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="mt-3 w-full border-b border-bone/20 bg-ink py-3 text-bone outline-none transition-colors focus:border-brass"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs tracking-[0.2em] text-mist">BUDGET</span>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="mt-3 w-full border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition-colors placeholder:text-mist/50 focus:border-brass"
                placeholder="Approximate budget"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs tracking-[0.2em] text-mist">PROJECT DETAILS</span>
            <textarea
              required
              name="details"
              value={form.details}
              onChange={handleChange}
              rows={5}
              className="mt-3 w-full resize-none border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition-colors placeholder:text-mist/50 focus:border-brass"
              placeholder="Tell me about your project..."
            />
          </label>

          <MagneticButton type="submit" variant="solid">
            Send Project Inquiry
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  )
}
