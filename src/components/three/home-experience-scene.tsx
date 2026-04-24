"use client"

import { useRef } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { KernelSize } from "postprocessing"
import { Starfield } from "./starfield"
import { OrbitRing } from "./orbit-ring"
import { satellites, sceneColors } from "./orbit-config"

export type HomeExperienceRefs = {
  /** -1 = nessun takeover (hero o core-zoom); 0..4 = area attiva */
  activeIdxRef: React.RefObject<{ value: number }>
  /** 0..1 — intensità takeover (pianeta → gigante al centro) */
  takeoverRef: React.RefObject<{ value: number }>
  /** 0..1 — intensità zoom sul core arancione (phase core-zoom) */
  coreZoomRef: React.RefObject<{ value: number }>
  mouseX: React.RefObject<{ value: number }>
  mouseY: React.RefObject<{ value: number }>
}

/**
 * Scena 3D UNICA che attraversa tutte le fasi della home:
 *   Phase A: hero base (5 pianeti orbitanti attorno a core arancione)
 *   Phase B: core-zoom (core cresce, orbite e satelliti sfumano)
 *   Phase C: return a scena base
 *   Phase D-H: takeover uno alla volta dei 5 pianeti
 *
 * Nessun rimount — la Canvas vive per tutta la durata del pin (~1000vh scroll).
 */
export function HomeExperienceScene(props: HomeExperienceRefs) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 42, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[6, 6, 6]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, -3, -2]} intensity={0.4} color={sceneColors.core} />

      <Starfield count={240} />

      <OrbitRingsLayer {...props} />
      <CoreLayer {...props} />

      {satellites.map((s, i) => (
        <HomePlanet key={s.id} config={s} index={i} {...props} />
      ))}

      <CameraRig {...props} />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.28}
          luminanceSmoothing={0.9}
          mipmapBlur
          kernelSize={KernelSize.SMALL}
        />
      </EffectComposer>
    </Canvas>
  )
}

/* ═══════════════════════════════════════════════════════════════════
 * ORBIT RINGS — fade in base a takeover + core-zoom
 * ═══════════════════════════════════════════════════════════════════ */

function OrbitRingsLayer({
  activeIdxRef,
  takeoverRef,
  coreZoomRef,
}: HomeExperienceRefs) {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(() => {
    const takeover = takeoverRef.current?.value ?? 0
    const coreZoom = coreZoomRef.current?.value ?? 0
    const activeIdx = activeIdxRef.current?.value ?? -1

    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const m = mesh.material as THREE.MeshBasicMaterial
      if (!m || !("opacity" in m)) return

      let target: number
      if (coreZoom > 0) {
        // Core-zoom: tutte le orbite sfumano
        target = (1 - coreZoom) * 0.35
      } else if (activeIdx >= 0) {
        // Takeover attivo: orbita del pianeta attivo resta visibile (anzi, accentuata), le altre sfumano
        if (i === activeIdx) {
          target = 0.35 + takeover * 0.2 // fino a 0.55 opacity
        } else {
          target = (1 - takeover) * 0.35 * 0.4 // sfumano molto
        }
      } else {
        target = 0.35
      }
      m.opacity = THREE.MathUtils.lerp(m.opacity, target, 0.1)

      // Render order: orbite sempre dietro al pianeta protagonista
      mesh.renderOrder = i === activeIdx ? 5 : 1
    })
  })

  return (
    <group>
      {satellites.map((s, i) => (
        <OrbitRingMeshRef
          key={`ring-${s.id}`}
          config={s}
          index={i}
          ringRefs={ringRefs}
        />
      ))}
    </group>
  )
}

/** Wrapper che espone il ref del mesh al genitore via array */
function OrbitRingMeshRef({
  config,
  index,
  ringRefs,
}: {
  config: (typeof satellites)[number]
  index: number
  ringRefs: React.MutableRefObject<(THREE.Mesh | null)[]>
}) {
  return (
    <group
      // Il mesh vero è figlio di OrbitRing: lo cerchiamo dopo il mount.
      // Pattern R3F-performance: ref mutabile per evitare re-render in useFrame.
      /* eslint-disable react-hooks/immutability */
      ref={(g) => {
        if (g) {
          const mesh = g.children[0]?.children[0] as THREE.Mesh | undefined
          if (mesh) ringRefs.current[index] = mesh
        } else {
          ringRefs.current[index] = null
        }
      }}
      /* eslint-enable react-hooks/immutability */
    >
      <OrbitRing
        radius={config.radius}
        tiltX={config.tiltX}
        tiltZ={config.tiltZ}
        color={config.color}
        thickness={0.008}
        opacity={0.35}
        draw={true}
        delay={0.2}
      />
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════
 * CORE — scala in base a coreZoom, sfuma durante takeover
 * ═══════════════════════════════════════════════════════════════════ */

function CoreLayer({ takeoverRef, coreZoomRef, activeIdxRef }: HomeExperienceRefs) {
  const groupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const glowInnerRef = useRef<THREE.MeshBasicMaterial>(null)
  const glowOuterRef = useRef<THREE.MeshBasicMaterial>(null)
  // Visibility lerpato — smooth transition tra hero/manifesto (1) e journey (0)
  const coreVisibility = useRef(1)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    const takeover = takeoverRef.current?.value ?? 0
    const coreZoom = coreZoomRef.current?.value ?? 0
    const activeIdx = activeIdxRef.current?.value ?? -1

    // Target visibility: 0 se siamo nel range journey (qualsiasi area attiva),
    // 1 se siamo in hero o manifesto. Così il core NON riappare tra un takeover e l'altro.
    const targetVisibility = activeIdx === -1 ? 1 : 0
    coreVisibility.current = THREE.MathUtils.lerp(
      coreVisibility.current,
      targetVisibility,
      0.1
    )
    // Fattore combinato: riduce sia col takeover corrente sia col range journey
    const hideFactor = Math.min(coreVisibility.current, 1 - takeover)

    const pulse = 1 + Math.sin(t * 1.5) * 0.03
    const zoomScale = 1 + coreZoom * 10 // cresce fino a 11x durante manifesto
    const finalScale = pulse * zoomScale * hideFactor

    groupRef.current.scale.setScalar(Math.max(0.001, finalScale))
    groupRef.current.rotation.y = t * 0.15

    if (materialRef.current) {
      const intensity = 4.5 + coreZoom * 2.5
      materialRef.current.emissiveIntensity = intensity
      materialRef.current.opacity = hideFactor
      materialRef.current.transparent = true
    }
    if (glowInnerRef.current) {
      glowInnerRef.current.opacity = hideFactor * (0.15 + coreZoom * 0.25)
    }
    if (glowOuterRef.current) {
      glowOuterRef.current.opacity = hideFactor * (0.05 + coreZoom * 0.15)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={sceneColors.core}
          emissive={sceneColors.core}
          emissiveIntensity={4.5}
          roughness={0.2}
          metalness={0.3}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshBasicMaterial
          ref={glowInnerRef}
          color={sceneColors.coreGlow}
          transparent
          opacity={0.15}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={2.1}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshBasicMaterial
          ref={glowOuterRef}
          color={sceneColors.coreGlow}
          transparent
          opacity={0.05}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════
 * PIANETA HOME — orbita normale, può diventare protagonista
 * ═══════════════════════════════════════════════════════════════════ */

function HomePlanet({
  config,
  index,
  activeIdxRef,
  takeoverRef,
  coreZoomRef,
}: {
  config: (typeof satellites)[number]
  index: number
} & HomeExperienceRefs) {
  const tiltGroupRef = useRef<THREE.Group>(null)
  const pivotRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const glowInner = useRef<THREE.MeshBasicMaterial>(null)
  const glowOuter = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!pivotRef.current || !meshRef.current || !tiltGroupRef.current) return

    const t = clock.getElapsedTime()
    const activeIdx = activeIdxRef.current?.value ?? -1
    const takeover = takeoverRef.current?.value ?? 0
    const coreZoom = coreZoomRef.current?.value ?? 0
    const isProtagonist = activeIdx === index && takeover > 0.001

    // Il pianeta continua SEMPRE la sua orbita naturale
    const angle = THREE.MathUtils.degToRad(config.startAngleDeg) + t * config.speed
    const orbX = Math.cos(angle) * config.radius
    const orbZ = Math.sin(angle) * config.radius
    pivotRef.current.position.set(orbX, 0, orbZ)

    if (isProtagonist) {
      // Protagonista: cresce MODERATAMENTE (2.8x) e sfuma mentre cresce
      // così non copre il testo del content overlay
      const targetScale = 1 + takeover * 1.8 // da 1x a 2.8x
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      )

      // Render order: davanti alle orbite
      meshRef.current.renderOrder = 10

      if (materialRef.current) {
        // Opacità: a plateau (takeover=1) scende a 0.4 → pianeta "etereo"
        const targetOpacity = 1 - takeover * 0.6
        materialRef.current.opacity = THREE.MathUtils.lerp(
          materialRef.current.opacity,
          targetOpacity,
          0.1
        )
        materialRef.current.transparent = true
        // Emissive intensity più contenuta
        materialRef.current.emissiveIntensity = config.emissive + takeover * 0.8
      }
      // Glow più marcato compensa la trasparenza del core
      if (glowInner.current) glowInner.current.opacity = 0.08 + takeover * 0.25
      if (glowOuter.current) glowOuter.current.opacity = 0.04 + takeover * 0.18
    } else {
      // Altri pianeti: sfumano durante takeover di un altro / core-zoom
      const globalFade = Math.max(coreZoom, activeIdx !== -1 ? takeover : 0)
      const shrinkFactor = 1 - globalFade * 0.8
      const targetOpacity = 1 - globalFade * 0.95

      meshRef.current.scale.setScalar(
        Math.max(
          0.001,
          THREE.MathUtils.lerp(meshRef.current.scale.x, shrinkFactor, 0.12)
        )
      )
      meshRef.current.renderOrder = 0

      if (materialRef.current) {
        materialRef.current.transparent = true
        materialRef.current.opacity = THREE.MathUtils.lerp(
          materialRef.current.opacity,
          targetOpacity,
          0.12
        )
        materialRef.current.emissiveIntensity = config.emissive
      }
      if (glowInner.current) glowInner.current.opacity = 0.08 * (1 - globalFade)
      if (glowOuter.current) glowOuter.current.opacity = 0.04 * (1 - globalFade)
    }
  })

  return (
    <group ref={tiltGroupRef} rotation={[config.tiltX, 0, config.tiltZ]}>
      <group ref={pivotRef}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[config.size, 24, 24]} />
          <meshStandardMaterial
            ref={materialRef}
            color={config.color}
            emissive={config.color}
            emissiveIntensity={config.emissive}
            roughness={0.3}
            metalness={0.2}
            toneMapped={false}
          />
        </mesh>
        <mesh scale={1.8}>
          <sphereGeometry args={[config.size, 12, 12]} />
          <meshBasicMaterial
            ref={glowInner}
            color={config.color}
            transparent
            opacity={0.08}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
        <mesh scale={2.8}>
          <sphereGeometry args={[config.size, 12, 12]} />
          <meshBasicMaterial
            ref={glowOuter}
            color={config.color}
            transparent
            opacity={0.04}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════
 * CAMERA RIG — parallax mouse + leggero dolly durante core-zoom
 * ═══════════════════════════════════════════════════════════════════ */

function CameraRig({ mouseX, mouseY, coreZoomRef }: HomeExperienceRefs) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 8))
  const current = useRef(new THREE.Vector3(0, 0, 8))

  useFrame(() => {
    const mx = (mouseX.current?.value ?? 0) * 0.25
    const my = (mouseY.current?.value ?? 0) * 0.2
    const coreZoom = coreZoomRef.current?.value ?? 0
    // Durante core-zoom la camera si avvicina leggermente
    const targetZ = THREE.MathUtils.lerp(8, 5.5, coreZoom)
    target.current.set(mx, my, targetZ)
    current.current.lerp(target.current, 0.05)
    camera.position.copy(current.current)
    camera.lookAt(0, 0, 0)
  })

  return null
}
