import Link from 'next/link'

import { Button } from '@/components/ui'
import { PackagePlus } from 'lucide-react'

export default function ProductsPage() {
  return (
    <div className="flex">
      <Link className="ml-auto" href="/dashboard/products/create">
        <Button>
          <PackagePlus />
          Crear producto
        </Button>
      </Link>
    </div>
  )
}
