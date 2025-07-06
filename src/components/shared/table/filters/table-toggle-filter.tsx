'use client'

import { useQueryState } from 'nuqs'
import { useState } from 'react'

import { Badge, Button, Separator } from '@/components/ui'
import { PlusCircle } from 'lucide-react'

import { useTable } from '@/components/shared/table'

export function TableToggleFilter() {
  const { revalidate } = useTable()

  const [active, setActive] = useQueryState<'true' | 'false' | null>('active', {
    parse: v => (v === 'true' || v === 'false' ? v : null),
    serialize: v => v ?? '',
    defaultValue: null,
  })

  const [loading, setLoading] = useState(false)

  const cycleState = () => {
    let next: 'true' | 'false' | null
    if (active === null) next = 'true'
    else if (active === 'true') next = 'false'
    else next = null

    setActive(next)
    setLoading(true)

    setTimeout(() => {
      revalidate()
      setLoading(false)
    }, 300)
  }

  const badgeText = active === 'true' ? 'activo' : active === 'false' ? 'inactivo' : null

  return (
    <Button variant="outline" size="sm" className="h-8 border-dashed" onClick={cycleState} disabled={loading}>
      <PlusCircle className="mr-1 h-4 w-4" />
      Estado
      {badgeText && (
        <>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="hidden space-x-1 lg:flex">
            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
              {badgeText}
            </Badge>
          </div>
        </>
      )}
    </Button>
  )
}
