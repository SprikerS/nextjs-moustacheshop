import { CATEGORY_ACTIONS } from '@/actions'

export default async function CategoriesPage() {
  const categories = await CATEGORY_ACTIONS.findAll()

  return (
    <>
      <pre>
        <code>{JSON.stringify(categories, null, 2)}</code>
      </pre>
    </>
  )
}
