import { redirect } from 'next/navigation'

import { PRODUCT_ACTIONS } from '@/actions'
import { getCategories } from '@/actions/categories'
import { ProductForm } from '@/components/products'

interface EditProductPageProps {
  params: { id: string }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const categories = await getCategories()
  const { data, error } = await PRODUCT_ACTIONS.findOneById(params.id)
  if (!data || error) {
    redirect('/dashboard/products')
  }

  return (
    <>
      <ProductForm categories={categories} product={data} />
    </>
  )
}
