import { getUserAuthentication } from '@/lib/session'

export default async function DashboardPage() {
  const user = await getUserAuthentication()
  if (!user) return null

  return (
    <>
      <h1>{user.names}</h1>
    </>
  )
}
