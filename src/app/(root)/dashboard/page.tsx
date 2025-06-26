import { currentSessionUser } from '@/lib/auth'
import { ButtonLogout } from './button-logout'

const DashboardPage = async () => {
  const user = await currentSessionUser()
  if (!user) return null

  return (
    <div className="grid min-h-dvh place-items-center">
      <div className="flex flex-col gap-5">
        <h1>Hello {user.names} 🎉</h1>
        <ButtonLogout />
      </div>
    </div>
  )
}

export default DashboardPage
