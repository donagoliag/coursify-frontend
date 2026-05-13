import { Users, BookOpen, Eye, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { label: 'Utilisateurs', value: '312', icon: Users, color: 'bg-violet-50 text-violet-600', delta: '+12 ce mois' },
  { label: 'Cours publiés', value: '48', icon: BookOpen, color: 'bg-blue-50 text-blue-600', delta: '+5 ce mois' },
  { label: 'Vues totales', value: '18 400', icon: Eye, color: 'bg-green-50 text-green-600', delta: '+2 100 ce mois' },
  { label: 'Taux d\'activité', value: '74%', icon: TrendingUp, color: 'bg-amber-50 text-amber-600', delta: '+3% ce mois' },
]

const recentUsers = [
  { id: 1, name: 'Alice Koffi', email: 'alice@ifri.bj', role: 'teacher', status: 'active', joined: 'Il y a 2j' },
  { id: 2, name: 'Bob Mensah', email: 'bob@ifri.bj', role: 'student', status: 'active', joined: 'Il y a 3j' },
  { id: 3, name: 'Clara Adjovi', email: 'clara@ifri.bj', role: 'student', status: 'suspended', joined: 'Il y a 5j' },
  { id: 4, name: 'David Biokou', email: 'david@ifri.bj', role: 'teacher', status: 'active', joined: 'Il y a 1sem' },
]

const recentCourses = [
  { id: 1, title: 'Introduction à Python', author: 'Dr. Koffi', status: 'published', views: 1240 },
  { id: 2, title: 'Algèbre Linéaire', author: 'Prof. Mensah', status: 'published', views: 980 },
  { id: 3, title: 'Machine Learning', author: 'Dr. Adjovi', status: 'draft', views: 0 },
]

const roleConfig = {
  teacher: { label: 'Enseignant', className: 'bg-violet-50 text-violet-600' },
  student: { label: 'Étudiant', className: 'bg-blue-50 text-blue-600' },
  admin: { label: 'Admin', className: 'bg-red-50 text-red-500' },
}

const statusConfig = {
  active: { label: 'Actif', icon: CheckCircle, className: 'text-green-500' },
  suspended: { label: 'Suspendu', icon: AlertCircle, className: 'text-red-400' },
  pending: { label: 'En attente', icon: Clock, className: 'text-amber-400' },
}

const courseStatusConfig = {
  published: { label: 'Publié', className: 'bg-green-50 text-green-600' },
  draft: { label: 'Brouillon', className: 'bg-amber-50 text-amber-600' },
  archived: { label: 'Archivé', className: 'bg-gray-100 text-gray-500' },
}

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
          Dashboard Admin
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Vue globale de la plateforme
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <Icon size={18} />
              </div>
              <p className="font-heading font-bold text-2xl text-dark">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              <p className="text-xs text-green-500 mt-1 font-medium">{stat.delta}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Utilisateurs récents */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-base text-dark">
              Utilisateurs récents
            </h2>
            <Link
              to="/admin/users"
              className="text-xs text-primary-600 font-medium hover:underline"
            >
              Voir tous
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentUsers.map((user) => {
              const role = roleConfig[user.role]
              const status = statusConfig[user.status]
              const StatusIcon = status.icon
              return (
                <div key={user.id} className="px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-600">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dark">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${role.className}`}>
                      {role.label}
                    </span>
                    <StatusIcon size={14} className={status.className} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cours récents */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-base text-dark">
              Cours récents
            </h2>
            <Link
              to="/admin/courses"
              className="text-xs text-primary-600 font-medium hover:underline"
            >
              Voir tous
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentCourses.map((course) => {
              const status = courseStatusConfig[course.status]
              return (
                <div key={course.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-dark">{course.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{course.author} · {course.views} vues</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md flex-shrink-0 ${status.className}`}>
                    {status.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}