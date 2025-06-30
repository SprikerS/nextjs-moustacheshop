import { getCategories } from '@/actions/categories'
import { ProductForm } from '@/components/products'

export default async function ProductCreatePage() {
  const categories = await getCategories()

  return (
    <>
      <ProductForm categories={categories} />
    </>
  )
}
