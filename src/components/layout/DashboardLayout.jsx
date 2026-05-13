import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  // Plus tard ce rôle viendra du contexte auth
  const role = 'teacher'

  return (
    <div className="flex min-h-screen bg-[#f8f7ff]">
      <Sidebar role={role} />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}