import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const views = [
  { p: [4.2, 1.5, 6.3], t: [0, 0, 0], label: '01 / APPROACH' },
  { p: [0.2, 0.45, 7.8], t: [0, 0, 0], label: '02 / PROFILE' },
  { p: [3.6, 4.5, 5.2], t: [0, 0, 0], label: '03 / WING' },
  { p: [-3.8, 0.8, 3.2], t: [0, 0, 0], label: '04 / FLIGHT DECK' },
  { p: [1.6, 0.2, -6.2], t: [0, 0, 0], label: '05 / POWER' },
  { p: [-4.3, 2.1, -5.5], t: [0, 0, 0], label: '06 / ONWARD' },
]

function makeJet() {
  const jet = new THREE.Group()
  const pearl = new THREE.MeshStandardMaterial({ color: 0xe7edf2, metalness: 0.62, roughness: 0.28 })
  const wingMat = new THREE.MeshStandardMaterial({ color: 0xb8c5d0, metalness: 0.58, roughness: 0.34 })
  const glass = new THREE.MeshStandardMaterial({ color: 0x172d40, metalness: 0.6, roughness: 0.17 })
  const dark = new THREE.MeshStandardMaterial({ color: 0x283747, metalness: 0.7, roughness: 0.3 })

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.5, 5.9, 24, 1, false), pearl)
  body.rotation.x = Math.PI / 2
  body.scale.set(0.72, 1, 1)
  jet.add(body)

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.27, 1.45, 24), pearl)
  nose.rotation.x = -Math.PI / 2
  nose.position.z = -3.55
  nose.scale.x = 0.78
  jet.add(nose)

  const tailCone = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.15, 24), pearl)
  tailCone.rotation.x = Math.PI / 2
  tailCone.position.z = 3.05
  tailCone.scale.x = 0.72
  jet.add(tailCone)

  const wingShape = new THREE.Shape()
  wingShape.moveTo(-0.25, -0.4)
  wingShape.lineTo(-4.0, 1.05)
  wingShape.lineTo(-3.45, 1.62)
  wingShape.lineTo(-0.12, 0.8)
  wingShape.lineTo(0.12, 0.8)
  wingShape.lineTo(3.45, 1.62)
  wingShape.lineTo(4.0, 1.05)
  wingShape.lineTo(0.25, -0.4)
  wingShape.closePath()
  const wing = new THREE.Mesh(new THREE.ShapeGeometry(wingShape), wingMat)
  wing.rotation.x = -Math.PI / 2
  wing.position.z = -0.3
  wing.position.y = -0.05
  wing.material.side = THREE.DoubleSide
  jet.add(wing)

  const tailShape = new THREE.Shape()
  tailShape.moveTo(-0.18, 1.4)
  tailShape.lineTo(-1.35, 2.25)
  tailShape.lineTo(-1.15, 2.55)
  tailShape.lineTo(0, 2.0)
  tailShape.lineTo(1.15, 2.55)
  tailShape.lineTo(1.35, 2.25)
  tailShape.lineTo(0.18, 1.4)
  tailShape.closePath()
  const tailWing = new THREE.Mesh(new THREE.ShapeGeometry(tailShape), wingMat)
  tailWing.rotation.x = -Math.PI / 2
  tailWing.position.z = 2.1
  tailWing.material.side = THREE.DoubleSide
  jet.add(tailWing)

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.05, 1.45), pearl)
  fin.position.set(0, 0.62, 2.35)
  fin.rotation.x = -0.18
  jet.add(fin)

  for (const side of [-1, 1]) {
    const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.34, 1.55, 24), dark)
    engine.rotation.x = Math.PI / 2
    engine.position.set(side * 1.0, -0.25, 1.25)
    jet.add(engine)
    const intake = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.045, 8, 24), wingMat)
    intake.position.set(side * 1.0, -0.25, 0.46)
    jet.add(intake)
    const window = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.18, 0.04), glass)
    window.position.set(side * 0.17, 0.2, -2.0)
    window.rotation.y = side * -0.14
    jet.add(window)
  }

  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.055, 4.5), new THREE.MeshBasicMaterial({ color: 0x7eb4d7 }))
  stripe.position.set(0.23, 0.2, 0.0)
  jet.add(stripe)
  jet.scale.setScalar(0.78)
  return jet
}

export default function CinematicFlightScene() {
  const hostRef = useRef(null)
  const stageRef = useRef(0)
  const labelRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.innerWidth > 700, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.7))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a121d, 0.025)
    const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.1, 180)
    camera.position.set(...views[0].p)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.HemisphereLight(0xc7e3f7, 0x18212d, 2.0))
    const key = new THREE.DirectionalLight(0xe7f4ff, 3.2)
    key.position.set(-5, 8, 5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x76b9e5, 2.3)
    rim.position.set(6, 2, -7)
    scene.add(rim)
    const jet = makeJet()
    scene.add(jet)

    const cloudCount = window.innerWidth < 700 ? 520 : 1100
    const cloudPositions = new Float32Array(cloudCount * 3)
    const cloudDrift = new Float32Array(cloudCount)
    for (let i = 0; i < cloudCount; i++) {
      cloudPositions[i * 3] = (Math.random() - 0.5) * 150
      cloudPositions[i * 3 + 1] = (Math.random() - 0.5) * 70
      cloudPositions[i * 3 + 2] = (Math.random() - 0.5) * 150
      cloudDrift[i] = 0.06 + Math.random() * 0.22
    }
    const cloudGeometry = new THREE.BufferGeometry()
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3))
    const cloudMaterial = new THREE.PointsMaterial({ color: 0x9bb9d0, size: 0.11, transparent: true, opacity: 0.28, depthWrite: false, sizeAttenuation: true })
    const clouds = new THREE.Points(cloudGeometry, cloudMaterial)
    scene.add(clouds)

    const clock = new THREE.Clock()
    let raf = 0
    let current = { ...views[0], p: [...views[0].p] }
    let target = 0
    let moving = false
    let moveStart = 0
    let from = views[0]
    const duration = reduced ? 0 : 2600
    let active = true

    const setStage = (next) => {
      target = clamp(next, 0, 5)
      if (target === stageRef.current) return
      from = { p: [...current.p], t: [...current.t] }
      stageRef.current = target
      moveStart = performance.now()
      moving = true
      if (labelRef.current) labelRef.current.textContent = views[target].label
      if (progressRef.current) progressRef.current.style.width = `${((target + 1) / 6) * 100}%`
    }

    const wheel = (event) => {
      const rect = host.getBoundingClientRect()
      const inside = rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.35
      if (!inside || event.ctrlKey) return
      if (event.deltaY > 0 && stageRef.current < 5) {
        event.preventDefault()
        setStage(stageRef.current + 1)
      } else if (event.deltaY < 0 && stageRef.current > 0) {
        event.preventDefault()
        setStage(stageRef.current - 1)
      }
    }
    let touchStartY = 0
    const touchStart = (e) => { touchStartY = e.touches[0]?.clientY || 0 }
    const touchEnd = (e) => {
      const delta = touchStartY - (e.changedTouches[0]?.clientY || touchStartY)
      const rect = host.getBoundingClientRect()
      if (rect.top > window.innerHeight * 0.65 || rect.bottom < window.innerHeight * 0.35 || Math.abs(delta) < 28) return
      if (delta > 0 && stageRef.current < 5) setStage(stageRef.current + 1)
      if (delta < 0 && stageRef.current > 0) setStage(stageRef.current - 1)
    }
    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.7))
    }
    const visibility = () => { active = !document.hidden }

    window.addEventListener('wheel', wheel, { passive: false })
    host.addEventListener('touchstart', touchStart, { passive: true })
    host.addEventListener('touchend', touchEnd, { passive: true })
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', visibility)

    const render = () => {
      raf = requestAnimationFrame(render)
      if (!active) return
      const time = clock.getElapsedTime()
      if (moving) {
        const progress = duration === 0 ? 1 : clamp((performance.now() - moveStart) / duration, 0, 1)
        const e = ease(progress)
        const nextView = views[target]
        current.p = from.p.map((v, i) => v + (nextView.p[i] - v) * e)
        current.t = from.t.map((v, i) => v + (nextView.t[i] - v) * e)
        if (progress >= 1) moving = false
      }
      camera.position.set(...current.p)
      camera.position.x += Math.sin(time * 0.32) * 0.035
      camera.position.y += Math.sin(time * 0.7) * 0.025
      camera.lookAt(...current.t)
      jet.position.y = Math.sin(time * 0.8) * 0.035
      jet.rotation.z = Math.sin(time * 0.55) * 0.008
      jet.rotation.x = Math.sin(time * 0.4) * 0.006
      const pos = cloudGeometry.attributes.position.array
      for (let i = 0; i < cloudCount; i++) {
        const index = i * 3
        pos[index + 2] += cloudDrift[i]
        if (pos[index + 2] > 75) pos[index + 2] = -75
      }
      cloudGeometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    if (labelRef.current) labelRef.current.textContent = views[0].label
    render()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', wheel)
      host.removeEventListener('touchstart', touchStart)
      host.removeEventListener('touchend', touchEnd)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', visibility)
      cloudGeometry.dispose()
      cloudMaterial.dispose()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="flight-scene" ref={hostRef} aria-label="Animated 3D private jet scene">
      <div className="flight-scene-vignette" />
      <div className="flight-scene-caption"><span ref={labelRef}>01 / APPROACH</span><span>SCROLL TO EXPLORE</span></div>
      <div className="flight-progress"><i ref={progressRef} /></div>
    </div>
  )
}
