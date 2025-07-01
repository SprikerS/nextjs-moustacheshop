'use client'

import { createContext, useContext } from 'react'

type RevalidateContextType = {
  revalidate: () => void
}

const RevalidateContext = createContext<RevalidateContextType | undefined>(undefined)

export function TableProvider({ children, revalidate }: { children: React.ReactNode; revalidate: () => void }) {
  return <RevalidateContext value={{ revalidate }}>{children}</RevalidateContext>
}

export function useTable() {
  const context = useContext(RevalidateContext)
  if (!context) {
    throw new Error('useTable must be used within a TableProvider')
  }

  return context
}
