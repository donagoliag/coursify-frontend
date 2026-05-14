import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAuth } from '../../context/AuthContext'

export default function DashboardLayout() {
  const { user } = useAuth()

  return (
    <div className="flex min-h-screen bg-[#f8f7ff]">
      <Sidebar role={user?.role || 'student'} />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}