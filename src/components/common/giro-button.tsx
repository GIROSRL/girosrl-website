"use client"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type GiroButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  href?: string
  external?: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const variants = {
  primary: [
    "bg-[var(--color-blue)] text-white",
    "hover:bg-[var(--color-blue-light)]",
    "shadow-[0_0_24px_rgba(58,143,232,0.3)]",
    "hover:shadow-[0_0_32px_rgba(58,143,232,0.5)]",
  ].join(" "),
  secondary: [
    "bg-[var(--color-navy-mid)] text-[var(--fg)]",
    "border border-[var(--color-navy-light)]",
    "hover:border-[var(--color-blue-dark)] hover:bg-[var(--color-navy-light)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-blue)]",
    "hover:bg-[var(--color-navy-mid)]",
  ].join(" "),
  outline: [
    "bg-transparent text-[var(--fg)]",
    "border border-[var(--color-navy-light)]",
    "hover:border-[var(--color-blue)] hover:text-[var(--color-blue)]",
  ].join(" "),
}

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
}

const GiroButton = forwardRef<HTMLButtonElement, GiroButtonProps>(
  ({ variant = "primary", size = "md", className, children, href, external, disabled, type = "button", onClick }, ref) => {
    const base = cn(
      "inline-flex items-center justify-center gap-2 font-medium tracking-wide",
      "rounded-full transition-all duration-200 cursor-pointer",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-blue)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variants[variant],
      sizes[size],
      className
    )

    if (href) {
      return (
        <motion.a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={base}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      )
    }

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={base}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.button>
    )
  }
)
GiroButton.displayName = "GiroButton"

export { GiroButton }
