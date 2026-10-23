import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const views = [
  { p: [4.8, 1.9, -12.5], t: [0, 0, 0] },
  { p: [3.8, 1.5, -12.2], t: [0, 0, 0] },
  { p: [2.5, 1.2, -12.8], t: [0, 0, 0] },
  { p: [3.6, 1.7, -12.4], t: [0, 0, 0] },
  { p: [4.6, 2.0, -12.7], t: [0, 0, 0] },
  { p: [3.7, 1.4, -12.3], t: [0, 0, 0] },
]
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const smooth = (t) => t * t * (3 - 2 * t)

function makeJet() {
  const jet = new THREE.Group()
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0xe8edf1, metalness: 0.45, roughness: 0.24, clearcoat: 0.7, clearcoatRoughness: 0.2 })
  const wingMat = new THREE.MeshPhysicalMaterial({ color: 0xbcc8d2, metalness: 0.52, roughness: 0.3, clearcoat: 0.45 })
  const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x0b1b2b, metalness: 0.3, roughness: 0.1, clearcoat: 1 })
  const engineMat = new THREE.MeshStandardMaterial({ color: 0x252d35, metalness: 0.82, roughness: 0.24 })

  // Fuselage: tapered sections make the silhouette smoother than a single cylinder.
  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.49, 5.8, 40, 1, false), bodyMat)
  fuselage.rotation.x = Math.PI / 2
  fuselage.scale.x = 0.82
  jet.add(fuselage)
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 20), bodyMat)
  nose.scale.set(0.78, 0.72, 2.65)
  nose.position.z = -3.0
  jet.add(nose)
  const tailFairing = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.15, 32), bodyMat)
  tailFairing.rotation.x = Math.PI / 2
  tailFairing.position.z = 3.05
  tailFairing.scale.x = 0.78
  jet.add(tailFairing)

  const wingShape = new THREE.Shape()
  wingShape.moveTo(-0.22, -0.35); wingShape.lineTo(-4.25, 1.1); wingShape.lineTo(-3.52, 1.65)
  wingShape.lineTo(-0.12, 0.82); wingShape.lineTo(0.12, 0.82); wingShape.lineTo(3.52, 1.65)
  wingShape.lineTo(4.25, 1.1); wingShape.lineTo(0.22, -0.35); wingShape.closePath()
  const wing = new THREE.Mesh(new THREE.ShapeGeometry(wingShape), wingMat)
  wing.rotation.x = -Math.PI / 2
  wing.position.z = -0.25
  wing.material.side = THREE.DoubleSide
  jet.add(wing)

  const tailShape = new THREE.Shape()
  tailShape.moveTo(-0.15, 1.35); tailShape.lineTo(-1.2, 2.15); tailShape.lineTo(-1.02, 2.48)
  tailShape.lineTo(0, 2.02); tailShape.lineTo(1.02, 2.48); tailShape.lineTo(1.2, 2.15)
  tailShape.lineTo(0.15, 1.35); tailShape.closePath()
  const tailWing = new THREE.Mesh(new THREE.ShapeGeometry(tailShape), wingMat)
  tailWing.rotation.x = -Math.PI / 2; tailWing.position.z = 2.1; tailWing.material.side = THREE.DoubleSide
  jet.add(tailWing)
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.08, 1.42), bodyMat)
  fin.position.set(0, 0.6, 2.35); fin.rotation.x = -0.18; jet.add(fin)

  for (const side of [-1, 1]) {
    const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 1.5, 32, 1), engineMat)
    engine.rotation.x = Math.PI / 2; engine.position.set(side * 1.0, -0.3, 1.25); jet.add(engine)
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.035, 12, 32), wingMat)
    rim.position.set(side * 1.0, -0.3, 0.49); jet.add(rim)
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.17, 0.035), glassMat)
    glass.position.set(side * 0.17, 0.22, -2.05); glass.rotation.y = side * -0.13; jet.add(glass)
  }
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.045, 4.5), new THREE.MeshBasicMaterial({ color: 0x6ea9d0 }))
  stripe.position.set(0.24, 0.21, 0); jet.add(stripe)
  jet.scale.setScalar(0.78)
  return jet
}

export default function CinematicFlightScene() {
  const hostRef = useRef(null)
  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.innerWidth > 700, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.15 : 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0a121d, 0.012)
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 220)
    scene.add(new THREE.HemisphereLight(0xd8eaff, 0x17202a, 2.0))
    const key = new THREE.DirectionalLight(0xf0f7ff, 3.1); key.position.set(-5, 8, 5); scene.add(key)
    const rim = new THREE.DirectionalLight(0x79bce7, 2.4); rim.position.set(6, 2, -7); scene.add(rim)
    const fill = new THREE.PointLight(0x477fa9, 12, 35); fill.position.set(-3, -1, 4); scene.add(fill)
    const jet = makeJet(); scene.add(jet)

    const count = window.innerWidth < 700 ? 420 : 900
    const positions = new Float32Array(count * 3), drift = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - .5) * 155
      positions[i * 3 + 1] = (Math.random() - .5) * 70
      positions[i * 3 + 2] = (Math.random() - .5) * 180
      drift[i] = .07 + Math.random() * .18
    }
    const cloudGeo = new THREE.BufferGeometry()
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const cloudMat = new THREE.PointsMaterial({ color: 0xa7c3da, size: .12, transparent: true, opacity: .27, depthWrite: false })
    scene.add(new THREE.Points(cloudGeo, cloudMat))

    let raf = 0, active = true, lastTime = 0
    const visibility = () => { active = !document.hidden; if (active) lastTime = performance.now() }
    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.15 : 1.5))
    }
    document.addEventListener('visibilitychange', visibility)
    window.addEventListener('resize', resize)

    const render = (now) => {
      raf = requestAnimationFrame(render)
      if (!active) return
      const time = now * 0.00012
      // Continuous orbital camera: it loops forever and never captures scroll input.
      const segment = (time % views.length)
      const i = Math.floor(segment), next = (i + 1) % views.length
      const blend = smooth(segment - i)
      const a = views[i], b = views[next]
      camera.position.set(
        a.p[0] + (b.p[0] - a.p[0]) * blend + Math.sin(time * 1.7) * .04,
        a.p[1] + (b.p[1] - a.p[1]) * blend + Math.sin(time * 1.2) * .025,
        a.p[2] + (b.p[2] - a.p[2]) * blend
      )
      camera.lookAt(0, 0, 0)
      jet.position.x = Math.sin(time * 1.25) * .32
      jet.position.y = Math.sin(time * 5.5) * .10
      jet.rotation.z = Math.sin(time * 1.25) * .025
      jet.rotation.x = Math.sin(time * 1.6) * .018
      const pos = cloudGeo.attributes.position.array
      for (let j = 0; j < count; j++) {
        const idx = j * 3
        pos[idx + 2] += drift[j]
        if (pos[idx + 2] > 90) pos[idx + 2] = -90
      }
      cloudGeo.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    render(0)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('resize', resize)
      cloudGeo.dispose(); cloudMat.dispose()
      scene.traverse((o) => {
        o.geometry?.dispose()
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
      })
      renderer.dispose(); renderer.domElement.remove()
    }
  }, [])

  return <div className="flight-scene flight-scene-global" ref={hostRef} aria-hidden="true" />
}
