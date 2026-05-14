import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Eye, Edit, Trash2, BookOpen, TrendingUp, Users, FileText, Copy } from 'lucide-react'
import api from '../../services/api'

const statusConfig = {
  published: { label: 'Publié', className: 'bg-green-50 text-green-600' },
  draft: { label: 'Brouillon', className: 'bg-amber-50 text-amber-600' },
  archived: { label: 'Archivé', className: 'bg-gray-100 text-gray-500' },
}

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('tous')
  const [stats, setStats] = useState({
    published: 0,
    draft: 0,
    archived: 0,
    totalViews: 0,
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/courses/my-courses')
      const data = res.data
      setCourses(data)
      setStats({
        published: data.filter(c => c.status === 'published').length,
        draft: data.filter(c => c.status === 'draft').length,
        archived: data.filter(c => c.status === 'archived').length,
        totalViews: data.reduce((acc, c) => acc + c.views, 0),
      })
    } catch {
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce cours ?')) return
    try {
      await api.delete('/api/courses/' + id)
      fetchCourses()
    } catch {
      alert('Erreur lors de la suppression')
    }
  }

  const handleDuplicate = async (id) => {
    try {
      await api.post('/api/courses/' + id + '/duplicate')
      fetchCourses()
    } catch {
      alert('Erreur lors de la duplication')
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await api.put('/api/courses/' + id, { status })
      fetchCourses()
    } catch {
      alert('Erreur lors de la mise à jour')
    }
  }

  const filtered = filter === 'tous'
    ? courses
    : courses.filter(c => c.status === filter)

  const statCards = [
    { label: 'Cours publiés', value: stats.published, icon: BookOpen, color: 'bg-violet-50 text-violet-600' },
    { label: 'Total des vues', value: stats.totalViews.toLocaleString(), icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
    { label: 'Brouillons', value: stats.draft, icon: FileText, color: 'bg-amber-50 text-amber-600' },
    { label: 'Archivés', value: stats.archived, icon: Users, color: 'bg-gray-50 text-gray-600' },
  ]

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
        {statCards.map((stat) => {
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
            {[
              { value: 'tous', label: 'Tous' },
              { value: 'published', label: 'Publiés' },
              { value: 'draft', label: 'Brouillons' },
              { value: 'archived', label: 'Archivés' },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  filter === f.value
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-3xl mb-3">📚</p>
            <p className="text-sm font-medium text-dark mb-1">Aucun cours</p>
            <p className="text-xs text-gray-400 mb-4">Créez votre premier cours</p>
            <Link to="/teacher/create"
              className="text-sm text-primary-600 font-medium hover:underline">
              Créer un cours
            </Link>
          </div>
        ) : (
          <>
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
                  {filtered.map((course) => {
                    const status = statusConfig[course.status]
                    return (
                      <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-dark">{course.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-500">{course.category || 'Général'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={course.status}
                            onChange={(e) => handleStatusChange(course.id, e.target.value)}
                            className={`text-xs font-medium px-2.5 py-1 rounded-md border-0 cursor-pointer ${status.className}`}
                          >
                            <option value="draft">Brouillon</option>
                            <option value="published">Publié</option>
                            <option value="archived">Archivé</option>
                          </select>
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
                            <button
                              onClick={() => handleDuplicate(course.id)}
                              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Copy size={15} />
                            </button>
                            <button
                              onClick={() => handleDelete(course.id)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
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
              {filtered.map((course) => {
                const status = statusConfig[course.status]
                return (
                  <div key={course.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-dark">{course.title}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ml-2 flex-shrink-0 ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      {course.category || 'Général'} · {course.views} vues
                    </p>
                    <div className="flex gap-3">
                      <Link to={'/cours/' + course.slug}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600">
                        <Eye size={13} /> Voir
                      </Link>
                      <Link to={'/teacher/edit/' + course.id}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                        <Edit size={13} /> Éditer
                      </Link>
                      <button
                        onClick={() => handleDuplicate(course.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600">
                        <Copy size={13} /> Dupliquer
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600">
                        <Trash2 size={13} /> Supprimer
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}