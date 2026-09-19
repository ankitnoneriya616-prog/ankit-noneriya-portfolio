import ServiceCard from '../components/ServiceCard.jsx'

const services = [
  {
    title: 'Website Design & Development',
    description: 'Modern, responsive and premium websites built around your brand.',
  },
  {
    title: 'Website Creation',
    description: 'Complete digital experiences designed to turn ideas into a professional online presence.',
  },
  {
    title: 'Video Editing',
    description: 'High-retention, cinematic and engaging video edits.',
  },
  {
    title: 'Voice & Music Editing',
    description: 'Clean, balanced and polished audio for content and digital projects.',
  },
  {
    title: 'Thumbnail Design',
    description: 'High-impact thumbnails designed to capture attention.',
  },
  {
    title: 'AI Solutions',
    description: 'AI-assisted creative workflows, automation and intelligent digital solutions.',
  },
  {
    title: 'Content Creation',
    description: 'Creative content designed for modern digital platforms.',
  },
]

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <p className="text-xs tracking-[0.3em] text-mist">SERVICES</p>
      <h2 className="mt-4 font-display text-4xl text-bone md:text-5xl">What I create</h2>
      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.title} index={i} title={s.title} description={s.description} />
        ))}
      </div>
    </section>
  )
}
