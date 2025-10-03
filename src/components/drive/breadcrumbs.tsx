"use client"

import Link from "next/link"
import { cn } from "~/lib/utils"
import type { DB_FolderType } from "~/server/db/schema"
import { buildCrumbs } from "./utils"

type Props = {
  parents: DB_FolderType[]
}

export function Breadcrumbs({ parents }: Props) {
  const crumbs = buildCrumbs(parents)

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="text-muted-foreground flex flex-wrap items-center gap-2">
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
