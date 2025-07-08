import { redirect } from 'next/navigation'

import { SaleForm } from '@/components/sales'
import { ORDER_ACTIONS } from '@/actions'

type Params = Promise<{ id: string }>

export default async function EditProductPage(props: { params: Params }) {
  const params = await props.params
  const { id } = params

  const { data, error } = await ORDER_ACTIONS.findOneById(id)
  if (!data || error) {
    redirect('/dashboard/sales')
  }

  return (
    <>
      <SaleForm order={data} />
    </>
  )
}
