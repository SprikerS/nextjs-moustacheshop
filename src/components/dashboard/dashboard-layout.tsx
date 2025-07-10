import { Package, ShoppingBag, ShoppingCart, Star, TrendingUp, Trophy, UserCheck, Users, UserX } from 'lucide-react'

import { ProductAvailability, SpotlightCard, StatCard, UserRolesChart } from '@/components/dashboard'
import { Summaries } from '@/interfaces'

export function DashboardLayout({ summaries }: { summaries: Summaries }) {
  const {
    ordersTotal,
    productsTotal,
    produtcsActive,
    produtcsInactive,
    topCustomer,
    topEmployee,
    usersActive,
    usersAdmins,
    usersCustomers,
    usersEmployees,
    usersInactive,
    usersTotal,
  } = summaries

  const userRolesData = [
    { name: 'Clientes', value: usersCustomers, fill: '#3b82f6' },
    { name: 'Empleados', value: usersEmployees, fill: '#10b981' },
    { name: 'Administradores', value: usersAdmins, fill: '#f59e0b' },
  ]

  return (
    <div className="container mx-auto space-y-8  p-6 pt-0">
      <section className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="size-5 text-muted-foreground" />
          Estadísticas de Usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Usuarios Totales" value={usersTotal} icon={Users} />
          <StatCard title="Usuarios Activos" value={usersActive} icon={UserCheck} />
          <StatCard title="Usuarios Inactivos" value={usersInactive} icon={UserX} />
        </div>
        <UserRolesChart data={userRolesData} />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Package className="size-5 text-muted-foreground" />
          Estadísticas de Productos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Productos Totales" value={productsTotal} icon={Package} />
          <StatCard title="Productos Activos" value={produtcsActive} icon={ShoppingBag} />
          <StatCard title="Productos Inactivos" value={produtcsInactive} icon={ShoppingBag} />
        </div>
        <ProductAvailability active={produtcsActive} total={productsTotal} />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <TrendingUp className="size-5 text-muted-foreground" />
          Ventas y Pedidos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Órdenes Totales" value={ordersTotal} icon={ShoppingCart} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SpotlightCard title="Vendedor del Mes" name={topEmployee} subtitle="Empleado con más ventas" icon={Trophy} />
          <SpotlightCard title="Cliente Destacado" name={topCustomer} subtitle="Cliente con más compras" icon={Star} />
        </div>
      </section>
    </div>
  )
}
