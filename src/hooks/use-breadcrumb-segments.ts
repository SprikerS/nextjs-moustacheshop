'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

function isUUID(segment: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(segment)
}

export function useBreadcrumbSegments() {
  const pathname = usePathname()

  return useMemo(() => {
    if (!pathname) return []

    const parts = pathname.split('/').filter(Boolean)

    const segments = parts.map((part, index) => {
      const isLast = index === parts.length - 1

      const href = '/' + parts.slice(0, index + 1).join('/')
      let label = decodeURIComponent(part)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())

      if (isLast && isUUID(part)) {
        label = 'Edit'
      }

      return {
        label,
        href: isLast ? undefined : href,
      }
    })

    return segments
  }, [pathname])
}
