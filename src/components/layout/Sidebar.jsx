import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, PlusCircle,
  Users, Settings, LogOut, Shield, FileText
} from 'lucide-react'

const teacherMenu = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher/dashboard' },
  { icon: BookOpen, label: 'Mes cours', path: '/teacher/dashboard' },
  { icon: PlusCircle, label: 'Nouveau cours', path: '/teacher/create' },
]

const studentMenu = [
  { icon: BookOpen, label: 'Catalogue', path: '/catalogue' },
  { icon: FileText, label: 'Mon profil', path: '/profile' },
]

const adminMenu = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
  { icon: BookOpen, label: 'Cours', path: '/admin/courses' },
  { icon: Shield, label: 'Créer un compte', path: '/admin/create-user' },
]

export default function Sidebar({ role = 'student' }) {
  const location = useLocation()

  const menu = role === 'teacher' ? teacherMenu : role === 'admin' ? adminMenu : studentMenu

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-heading font-bold text-lg text-dark">Coursify</span>
        </Link>

        {/* Badge rôle */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
          bg-primary-50 text-primary-600">
          {role === 'teacher' ? '👨‍🏫 Enseignant' : role === 'admin' ? '🛡️ Admin' : '👨‍🎓 Étudiant'}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <Link to="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
          <Settings size={18} />
          Profil
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}