'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export function useBreadcrumbSegments() {
  const pathname = usePathname()

  return useMemo(() => {
    if (!pathname) return []

    const parts = pathname.split('/').filter(Boolean)

    const segments = parts.map((part, index) => {
      const href = '/' + parts.slice(0, index + 1).join('/')
      const label = decodeURIComponent(part)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())

      return {
        label,
        href: index === parts.length - 1 ? undefined : href,
      }
    })

    return segments
  }, [pathname])
}
