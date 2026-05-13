import { Link } from 'react-router-dom'
import { PlusCircle, Eye, Edit, Trash2, BookOpen, TrendingUp, Users, FileText } from 'lucide-react'

const fakeCourses = [
  { id: 1, title: 'Introduction à Python', category: 'Programmation', views: 1240, status: 'published', slug: 'intro-python' },
  { id: 2, title: 'Algèbre Linéaire', category: 'Mathématiques', views: 980, status: 'published', slug: 'algebre-lineaire' },
  { id: 3, title: 'Machine Learning', category: 'Data Science', views: 0, status: 'draft', slug: 'ml-scikit' },
  { id: 4, title: 'Statistiques Descriptives', category: 'Statistiques', views: 760, status: 'archived', slug: 'stats-desc' },
]

const stats = [
  { label: 'Cours publiés', value: '2', icon: BookOpen, color: 'bg-violet-50 text-violet-600' },
  { label: 'Total des vues', value: '2 220', icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
  { label: 'Étudiants atteints', value: '148', icon: Users, color: 'bg-green-50 text-green-600' },
  { label: 'Brouillons', value: '1', icon: FileText, color: 'bg-amber-50 text-amber-600' },
]

const statusConfig = {
  published: { label: 'Publié', className: 'bg-green-50 text-green-600' },
  draft: { label: 'Brouillon', className: 'bg-amber-50 text-amber-600' },
  archived: { label: 'Archivé', className: 'bg-gray-100 text-gray-500' },
}

export default function TeacherDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
            Tableau de bord
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gérez vos cours et suivez vos statistiques
          </p>
        </div>
        <Link
          to="/teacher/create"
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <PlusCircle size={16} />
          Nouveau cours
        </Link>
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
            </div>
          )
        })}
      </div>

      {/* Liste des cours */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-base text-dark">Mes cours</h2>
          <div className="flex gap-2">
            {['Tous', 'Publiés', 'Brouillons', 'Archivés'].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors first:bg-primary-50 first:text-primary-600"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Titre</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Catégorie</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Vues</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fakeCourses.map((course) => {
                const status = statusConfig[course.status]
                return (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-dark">{course.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-500">{course.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">{course.views.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={'/cours/' + course.slug}
                          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Eye size={15} />
                        </Link>
                        <Link
                          to={'/teacher/edit/' + course.id}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit size={15} />
                        </Link>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Cards mobile */}
        <div className="md:hidden divide-y divide-gray-50">
          {fakeCourses.map((course) => {
            const status = statusConfig[course.status]
            return (
              <div key={course.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-dark">{course.title}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-md ml-2 flex-shrink-0 ${status.className}`}>
                    {status.label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{course.category} · {course.views} vues</p>
                <div className="flex gap-2">
                  <Link to={'/cours/' + course.slug}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600 transition-colors">
                    <Eye size={13} /> Voir
                  </Link>
                  <Link to={'/teacher/edit/' + course.id}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                    <Edit size={13} /> Éditer
                  </Link>
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors">
                    <Trash2 size={13} /> Supprimer
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}