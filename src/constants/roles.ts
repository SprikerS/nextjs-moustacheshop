export const ROLES_DATA = [
  { value: 'customer', label: 'Cliente' },
  { value: 'employee', label: 'Empleado' },
  { value: 'admin', label: 'Administrador' },
  { value: 'super-user', label: 'Super Usuario' },
] as const

export type Role = (typeof ROLES_DATA)[number]['value']

export const ROLE_VALUES = ROLES_DATA.map(r => r.value) as Role[]
