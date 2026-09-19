import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  className = '',
}) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPos({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  const base =
    'relative inline-flex items-center justify-center px-8 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-colors duration-300'
  const styles =
    variant === 'solid'
      ? `${base} bg-bone text-ink hover:bg-brass`
      : `${base} border border-bone/25 text-bone hover:border-brass hover:text-brass`

  const Comp = href ? motion.a : motion.button

  return (
    <Comp
      ref={ref}
      href={href}
      type={href ? undefined : type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.2 }}
      data-cursor="link"
      className={`${styles} ${className}`}
    >
      {children}
    </Comp>
  )
}
