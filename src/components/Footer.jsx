const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/919009480541' },
  { label: 'Email', href: 'mailto:ankitnoneriya616@gmail.com' },
  { label: 'Instagram', href: 'https://instagram.com/the.legendankit' },
  { label: 'YouTube', href: 'https://yt.openinapp.co/mrankitnoneriya' },
]

export default function Footer() {
  return (
    <footer className="border-t border-bone/10 px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-bone">Ankit Noneriya</p>
          <p className="mt-2 text-sm tracking-[0.2em] text-mist">AI & DIGITAL CREATIVE SPECIALIST</p>
          <p className="mt-4 text-sm text-mist">Turning ideas into digital experiences.</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-mist">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="transition-colors hover:text-brass"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-12 max-w-7xl text-xs text-mist/60">© 2026 Ankit Noneriya. All rights reserved.</p>
    </footer>
  )
}
