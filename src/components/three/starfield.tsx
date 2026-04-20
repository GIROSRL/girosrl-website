"use client"

import { useState } from "react"
import * as THREE from "three"
import { sceneColors } from "./orbit-config"

/**
 * Starfield: N punti distribuiti su una sfera, densità ridotta.
 * Generato una sola volta via useState lazy init (evita warning impure useMemo).
 */
export function Starfield({ count = 400 }: { count?: number }) {
  const [geometry] = useState<THREE.BufferGeometry>(() =>
    buildStarGeometry(count)
  )

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color={sceneColors.starfield}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function buildStarGeometry(count: number): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    // Distribuzione sferica uniforme
    const theta = 2 * Math.PI * Math.random()
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 25 + Math.random() * 10
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = r * Math.cos(phi)
  }
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  return geo
}
