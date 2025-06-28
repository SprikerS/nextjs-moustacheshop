import { getCategories } from '@/actions/categories'
import { NewProductForm } from './_components/form'

export default async function ProductCreatePage() {
  const categories = await getCategories()

  return (
    <>
      <NewProductForm categories={categories} />
    </>
  )
}
