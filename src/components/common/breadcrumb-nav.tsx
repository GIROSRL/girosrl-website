import Link from "next/link"

export type BreadcrumbCrumb = {
  label: string
  href?: string
}

export function BreadcrumbNav({ items }: { items: BreadcrumbCrumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center flex-wrap gap-2 text-xs tracking-wider uppercase text-[var(--color-gray-mid)]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-blue-light)] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-[var(--fg)]" : ""}>{item.label}</span>
              )}
              {!isLast && <span className="text-[var(--color-navy-light)]">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
