import getCategories from '@/actions/categories'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      <pre>
        <code>{JSON.stringify(categories, null, 2)}</code>
      </pre>
    </>
  )
}
