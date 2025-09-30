"use client"

import Link from "next/link"
import { cn } from "~/lib/utils"

type Props = {
  path: string[] // normalized segments
}

export function Breadcrumbs({ path }: Props) {
  const crumbs = [
    { label: "My Drive", href: "/drive" },
    ...path.map((_, idx) => {
      const subPath = path.slice(0, idx + 1)
      const href = "/drive/" + subPath.join("/")
      const currentPath = subPath[idx] ?? ""
      const label = decodeURIComponent(currentPath).replace(/-/g, " ")
      return { label, href }
    }),
  ]

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 ? (
              <span aria-hidden="true" className="text-muted-foreground/70">
                /
              </span>
            ) : null}
            <Link
              href={c.href}
              className={cn(
                "hover:text-foreground transition-colors",
                i === crumbs.length - 1 ? "text-foreground" : "",
              )}
              aria-current={i === crumbs.length - 1 ? "page" : undefined}
            >
              <span className="text-pretty">{c.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
