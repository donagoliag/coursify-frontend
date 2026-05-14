import { useState, useEffect } from 'react'
import { Users, BookOpen, Eye, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/api/users/stats'),
      api.get('/api/users/'),
      api.get('/api/courses/?limit=5'),
    ]).then(([statsRes, usersRes, coursesRes]) => {
      setStats(statsRes.data)
      setUsers(usersRes.data.slice(0, 4))
      setCourses(coursesRes.data.slice(0, 3))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const roleConfig = {
    teacher: { label: 'Enseignant', className: 'bg-violet-50 text-violet-600' },
    student: { label: 'Étudiant', className: 'bg-blue-50 text-blue-600' },
    admin: { label: 'Admin', className: 'bg-red-50 text-red-500' },
  }

  const courseStatusConfig = {
    published: { label: 'Publié', className: 'bg-green-50 text-green-600' },
    draft: { label: 'Brouillon', className: 'bg-amber-50 text-amber-600' },
    archived: { label: 'Archivé', className: 'bg-gray-100 text-gray-500' },
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    { label: 'Utilisateurs', value: stats?.total_users || 0, icon: Users, color: 'bg-violet-50 text-violet-600', delta: stats?.total_teachers + ' enseignants' },
    { label: 'Cours publiés', value: stats?.published_courses || 0, icon: BookOpen, color: 'bg-blue-50 text-blue-600', delta: stats?.draft_courses + ' brouillons' },
    { label: 'Vues totales', value: stats?.total_views?.toLocaleString() || 0, icon: Eye, color: 'bg-green-50 text-green-600', delta: 'Toutes les vues' },
    { label: 'Total cours', value: stats?.total_courses || 0, icon: TrendingUp, color: 'bg-amber-50 text-amber-600', delta: stats?.archived_courses + ' archivés' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
          Dashboard Admin
        </h1>
        <p className="text-gray-500 text-sm mt-1">Vue globale de la plateforme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <Icon size={18} />
              </div>
              <p className="font-heading font-bold text-2xl text-dark">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              <p className="text-xs text-primary-500 mt-1">{stat.delta}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Utilisateurs récents */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-base text-dark">Utilisateurs récents</h2>
            <Link to="/admin/users" className="text-xs text-primary-600 font-medium hover:underline">
              Voir tous
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {users.map((user) => {
              const role = roleConfig[user.role]
              return (
                <div key={user.id} className="px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-600">
                        {user.first_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${role.className}`}>
                      {role.label}
                    </span>
                    {user.is_active
                      ? <CheckCircle size={14} className="text-green-500" />
                      : <AlertCircle size={14} className="text-red-400" />
                    }
                  </div>
                </div>
              )
            })}
            {users.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-8">Aucun utilisateur</p>
            )}
          </div>
        </div>

        {/* Cours récents */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-base text-dark">Cours récents</h2>
            <Link to="/admin/courses" className="text-xs text-primary-600 font-medium hover:underline">
              Voir tous
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {courses.map((course) => {
              const status = courseStatusConfig[course.status]
              return (
                <div key={course.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-dark">{course.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {course.author?.first_name} {course.author?.last_name} · {course.views} vues
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md flex-shrink-0 ${status.className}`}>
                    {status.label}
                  </span>
                </div>
              )
            })}
            {courses.length === 0 && (
              <p className="text-center text-sm text-gray-400 py-8">Aucun cours</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}