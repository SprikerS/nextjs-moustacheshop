import { Role, ROLES_DATA } from '@/constants'

export function getRoleLabel(value: Role): string {
  const role = ROLES_DATA.find(r => r.value === value)
  return role ? role.label : ''
}

export function getAccumulatedRoles(selectedRole: Role): Role[] {
  const index = ROLES_DATA.findIndex(r => r.value === selectedRole)
  if (index === -1) return []
  return ROLES_DATA.slice(0, index + 1).map(r => r.value)
}
