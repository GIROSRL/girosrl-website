"use client"

import { useMemo, useRef, useEffect } from "react"
import * as THREE from "three"
import { gsap } from "@/lib/gsap"

type OrbitRingProps = {
  radius: number
  tiltX: number
  tiltZ: number
  color: string
  /** Spessore tube (default 0.006 — sottile) */
  thickness?: number
  opacity?: number
  /** Se true, fade-in dell'opacità all'ingresso */
  draw?: boolean
  delay?: number
}

/**
 * Traccia orbitale statica — il satellite corrispondente ci si muove sopra.
 * Geometria: ellisse sul piano XZ ruotata poi di (tiltX, 0, tiltZ) — IDENTICA
 * alla trasformazione applicata al pivot del Satellite. Nessuna rotazione
 * runtime per evitare disallineamenti visivi.
 */
export function OrbitRing({
  radius,
  tiltX,
  tiltZ,
  color,
  thickness = 0.006,
  opacity = 0.35,
  draw = true,
  delay = 0,
}: OrbitRingProps) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0)
    const points = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y))
    const path = new THREE.CatmullRomCurve3(points, true)
    return new THREE.TubeGeometry(path, 256, thickness, 8, true)
  }, [radius, thickness])

  useEffect(() => {
    if (!materialRef.current) return
    if (!draw) {
      materialRef.current.opacity = opacity
      return
    }
    materialRef.current.opacity = 0
    gsap.to(materialRef.current, {
      opacity,
      duration: 1.4,
      delay,
      ease: "power2.out",
    })
  }, [draw, delay, opacity])

  return (
    <mesh geometry={geometry} rotation={[tiltX, 0, tiltZ]}>
      <meshBasicMaterial ref={materialRef} color={color} transparent opacity={0} toneMapped={false} />
    </mesh>
  )
}
