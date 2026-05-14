import { useState, useEffect } from 'react'
import { Search, X, Eye, Trash2, MoreVertical, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

const statusConfig = {
  published: { label: 'Publié', className: 'bg-green-50 text-green-600' },
  draft: { label: 'Brouillon', className: 'bg-amber-50 text-amber-600' },
  archived: { label: 'Archivé', className: 'bg-gray-100 text-gray-500' },
}

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('tous')
  const [openMenu, setOpenMenu] = useState(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/courses/?limit=100')
      setCourses(res.data)
    } catch {
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await api.put('/api/courses/' + id, { status })
      fetchCourses()
      setOpenMenu(null)
    } catch {
      alert('Erreur lors de la mise à jour')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce cours définitivement ?')) return
    try {
      await api.delete('/api/courses/' + id)
      fetchCourses()
      setOpenMenu(null)
    } catch {
      alert('Erreur lors de la suppression')
    }
  }

  const filtered = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.author?.first_name + ' ' + c.author?.last_name).toLowerCase().includes(search.toLowerCase()) ||
      (c.category || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'tous' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
            Gestion des cours
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {courses.length} cours sur la plateforme
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un cours, auteur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {[
            { value: 'tous', label: 'Tous' },
            { value: 'published', label: 'Publiés' },
            { value: 'draft', label: 'Brouillons' },
            { value: 'archived', label: 'Archivés' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === opt.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Cours</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Auteur</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Catégorie</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Vues</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((course) => {
                    const status = statusConfig[course.status]
                    return (
                      <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                              <BookOpen size={14} className="text-primary-600" />
                            </div>
                            <p className="text-sm font-medium text-dark max-w-[180px] truncate">
                              {course.title}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {course.author?.first_name} {course.author?.last_name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-400">{course.category || 'Général'}</span>
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
                          <span className="text-xs text-gray-400">
                            {new Date(course.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <div className="flex items-center gap-1">
                              <Link
                                to={'/cours/' + course.slug}
                                className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                              >
                                <Eye size={15} />
                              </Link>
                              <button
                                onClick={() => setOpenMenu(openMenu === course.id ? null : course.id)}
                                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <MoreVertical size={15} />
                              </button>
                            </div>
                            {openMenu === course.id && (
                              <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-44 py-1">
                                <button
                                  onClick={() => handleStatusChange(course.id, course.status === 'published' ? 'draft' : 'published')}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                  {course.status === 'published' ? 'Dépublier' : 'Publier'}
                                </button>
                                <button
                                  onClick={() => handleStatusChange(course.id, 'archived')}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                  Archiver
                                </button>
                                <hr className="my-1 border-gray-50" />
                                <button
                                  onClick={() => handleDelete(course.id)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 size={13} />
                                  Supprimer
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden divide-y divide-gray-50">
              {filtered.map((course) => {
                const status = statusConfig[course.status]
                return (
                  <div key={course.id} className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium text-dark">{course.title}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ml-2 flex-shrink-0 ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      {course.author?.first_name} {course.author?.last_name} · {course.category || 'Général'} · {course.views} vues
                    </p>
                    <div className="flex gap-3">
                      <Link to={'/cours/' + course.slug}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-600">
                        <Eye size={13} /> Voir
                      </Link>
                      <button
                        onClick={() => handleStatusChange(course.id, course.status === 'published' ? 'draft' : 'published')}
                        className="text-xs text-primary-600 hover:underline"
                      >
                        {course.status === 'published' ? 'Dépublier' : 'Publier'}
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

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">📚</p>
                <p className="text-sm font-medium text-dark">Aucun cours trouvé</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}