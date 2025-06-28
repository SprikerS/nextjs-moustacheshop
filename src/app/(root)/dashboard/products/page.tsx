import Link from 'next/link'

import { AllProducts } from '@/actions/products'
import { Button } from '@/components/ui'
import { PackagePlus } from 'lucide-react'

export default async function ProductsPage() {
  const products = await AllProducts()

  return (
    <div className="flex flex-col gap-5">
      <Link className="ml-auto" href="/dashboard/products/create">
        <Button>
          <PackagePlus />
          Crear producto
        </Button>
      </Link>

      <pre>
        <code>{JSON.stringify(products, null, 2)}</code>
      </pre>
    </div>
  )
}
