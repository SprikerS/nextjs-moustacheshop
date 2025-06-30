import { redirect } from 'next/navigation'

import { CATEGORY_ACTIONS, PRODUCT_ACTIONS } from '@/actions'
import { ProductForm } from '@/components/products'

interface EditProductPageProps {
  params: { id: string }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const categories = await CATEGORY_ACTIONS.findAll()
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
