import ProjectCard from '../components/ProjectCard.jsx'

const projects = [
  { category: 'Websites', title: 'Aurora Studio', description: 'Premium landing experience for a design collective.' },
  { category: 'Video', title: 'Motion Reel', description: 'Cinematic edit for a product launch campaign.' },
  { category: 'AI', title: 'Workflow Engine', description: 'AI-assisted content pipeline for a media brand.' },
  { category: 'Thumbnails', title: 'Peak Attention', description: 'High-impact thumbnail set for a creator channel.' },
  { category: 'Content', title: 'Signal', description: 'Multi-platform content series for a tech startup.' },
  { category: 'Websites', title: 'Northline', description: 'Responsive e-commerce experience with custom motion.' },
]

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.3em] text-mist">PORTFOLIO</p>
          <h2 className="mt-4 font-display text-4xl text-bone md:text-5xl">Selected work</h2>
        </div>
        <p className="max-w-sm text-sm text-mist">
          Placeholder previews — replace with live project links and screenshots.
        </p>
      </div>
      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} index={i} {...p} />
        ))}
      </div>
    </section>
  )
}
