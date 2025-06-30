import { CATEGORY_ACTIONS } from '@/actions'
import { ProductForm } from '@/components/products'

export default async function ProductCreatePage() {
  const categories = await CATEGORY_ACTIONS.findAll()

  return (
    <>
      <ProductForm categories={categories} />
    </>
  )
}
