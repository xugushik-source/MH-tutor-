"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Home is always implicit (icon + label), so callers only pass the trail
 * after it. The last item renders as plain text (current page, not a
 * link) — every other item is clickable back up the hierarchy.
 */
export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  const dict = useDictionary();

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-ink/55 sm:text-sm">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-1 font-medium transition-colors hover:text-forest"
          >
            <Home className="h-3.5 w-3.5" />
            {dict.breadcrumbs.home}
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex min-w-0 items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink/30" aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  className={cn("truncate", isLast ? "font-medium text-ink" : "")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="truncate font-medium transition-colors hover:text-forest">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
