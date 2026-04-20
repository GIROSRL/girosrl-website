"use client"

import Link, { type LinkProps } from "next/link"
import { cn } from "@/lib/utils"

type AnimatedLinkProps = LinkProps & {
  children: React.ReactNode
  className?: string
  external?: boolean
}

export function AnimatedLink({ children, className, external, ...props }: AnimatedLinkProps) {
  const base = cn(
    "relative inline-block group",
    "after:absolute after:bottom-0 after:left-0",
    "after:h-px after:w-0 after:bg-current",
    "after:transition-all after:duration-300 after:ease-out",
    "hover:after:w-full",
    className
  )

  if (external) {
    return (
      <a
        href={props.href as string}
        className={base}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <Link {...props} className={base}>
      {children}
    </Link>
  )
}
