import { redirect } from 'next/navigation'

import { CATEGORY_ACTIONS, PRODUCT_ACTIONS } from '@/actions'
import { ProductForm } from '@/components/products'

type Params = Promise<{ id: string }>

export default async function EditProductPage(props: { params: Params }) {
  const params = await props.params
  const { id } = params

  const categories = await CATEGORY_ACTIONS.findAll()
  const { data, error } = await PRODUCT_ACTIONS.findOneById(id)
  if (!data || error) {
    redirect('/dashboard/products')
  }

  return (
    <>
      <ProductForm categories={categories} product={data} />
    </>
  )
}
