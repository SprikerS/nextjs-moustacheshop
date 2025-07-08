import { SaleForm } from '@/components/sales'

type Params = Promise<{ id: string }>

export default async function EditProductPage(props: { params: Params }) {
  const params = await props.params
  const { id } = params

  return (
    <>
      <SaleForm />
    </>
  )
}
