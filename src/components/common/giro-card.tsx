"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type GiroCardProps = {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function GiroCard({ children, className, hover = true, glow = false }: GiroCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl bg-[var(--color-navy-mid)] border border-[var(--color-navy-light)]",
        "transition-colors duration-300",
        hover && "hover:border-[var(--color-blue-dark)]",
        glow && "hover:shadow-[0_0_40px_rgba(58,143,232,0.15)]",
        className
      )}
      {...(hover ? { whileHover: { y: -4 } } : {})}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
