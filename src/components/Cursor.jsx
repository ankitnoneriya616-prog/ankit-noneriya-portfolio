import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 })
  const dotY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 })
  const ringX = useSpring(x, { stiffness: 160, damping: 20, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 160, damping: 20, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-cursor]')) {
        setHovering(true)
      }
    }

    const out = (e) => {
      if (e.target.closest && e.target.closest('a, button, [data-cursor]')) {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-brass"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          opacity: hovering ? 0.7 : 0.3,
          borderColor: hovering
            ? 'rgba(201,168,118,0.8)'
            : 'rgba(245,243,239,0.35)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  )
}
