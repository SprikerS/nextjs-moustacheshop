import { UTILS_ACTIONS } from '@/actions'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

export default async function DashboardPage() {
  const summaries = await UTILS_ACTIONS.fetchSummaries()
  return <DashboardLayout summaries={summaries} />
}
