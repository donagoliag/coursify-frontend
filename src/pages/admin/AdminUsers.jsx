import { useState, useEffect } from 'react'
import { Search, X, CheckCircle, AlertCircle, MoreVertical, UserX, Shield, Trash2 } from 'lucide-react'
import api from '../../services/api'

const roleConfig = {
  teacher: { label: 'Enseignant', className: 'bg-violet-50 text-violet-600' },
  student: { label: 'Étudiant', className: 'bg-blue-50 text-blue-600' },
  admin: { label: 'Admin', className: 'bg-red-50 text-red-500' },
}

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('tous')
  const [openMenu, setOpenMenu] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/users/')
      setUsers(res.data)
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (id) => {
    try {
      await api.put('/api/users/' + id + '/toggle-active')
      fetchUsers()
      setOpenMenu(null)
    } catch {
      alert('Erreur lors de la mise à jour')
    }
  }

  const handleChangeRole = async (id, role) => {
    try {
      await api.put('/api/users/' + id + '/role?role=' + role)
      fetchUsers()
      setOpenMenu(null)
    } catch {
      alert('Erreur lors du changement de rôle')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return
    try {
      await api.delete('/api/users/' + id)
      fetchUsers()
      setOpenMenu(null)
    } catch (err) {
      alert(err.response?.data?.detail || 'Erreur lors de la suppression')
    }
  }

  const filtered = users.filter((u) => {
    const matchSearch =
      u.first_name.toLowerCase().includes(search.toLowerCase()) ||
      u.last_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'tous' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
            Utilisateurs
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {users.length} utilisateurs enregistrés
          </p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
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
            { value: 'teacher', label: 'Enseignants' },
            { value: 'student', label: 'Étudiants' },
            { value: 'admin', label: 'Admins' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRoleFilter(opt.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                roleFilter === opt.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
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
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Utilisateur</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Rôle</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Inscrit le</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((user) => {
                    const role = roleConfig[user.role]
                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
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
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${role.className}`}>
                            {role.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5">
                            {user.is_active
                              ? <CheckCircle size={14} className="text-green-500" />
                              : <AlertCircle size={14} className="text-red-400" />
                            }
                            <span className="text-xs text-gray-600">
                              {user.is_active ? 'Actif' : 'Suspendu'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-400">
                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MoreVertical size={15} />
                            </button>
                            {openMenu === user.id && (
                              <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-48 py-1">
                                <div className="px-3 py-1.5">
                                  <p className="text-xs text-gray-400 font-medium mb-1">Changer le rôle</p>
                                  {['student', 'teacher', 'admin'].map((r) => (
                                    <button
                                      key={r}
                                      onClick={() => handleChangeRole(user.id, r)}
                                      className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                                        user.role === r
                                          ? 'text-primary-600 font-medium'
                                          : 'text-gray-600 hover:bg-gray-50'
                                      }`}
                                    >
                                      {r === 'student' ? '👨‍🎓 Étudiant' : r === 'teacher' ? '👨‍🏫 Enseignant' : '🛡️ Admin'}
                                    </button>
                                  ))}
                                </div>
                                <hr className="my-1 border-gray-50" />
                                <button
                                  onClick={() => handleToggleActive(user.id)}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                  <UserX size={13} />
                                  {user.is_active ? 'Suspendre' : 'Réactiver'}
                                </button>
                                {user.role !== 'admin' && (
                                  <button
                                    onClick={() => handleDelete(user.id)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
                                  >
                                    <Trash2 size={13} />
                                    Supprimer
                                  </button>
                                )}
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
              {filtered.map((user) => {
                const role = roleConfig[user.role]
                return (
                  <div key={user.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
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
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${role.className}`}>
                        {role.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        {user.is_active
                          ? <CheckCircle size={12} className="text-green-500" />
                          : <AlertCircle size={12} className="text-red-400" />
                        }
                        <span className="text-xs text-gray-500">
                          {user.is_active ? 'Actif' : 'Suspendu'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleToggleActive(user.id)}
                        className="text-xs text-primary-600 hover:underline"
                      >
                        {user.is_active ? 'Suspendre' : 'Réactiver'}
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">🔍</p>
                <p className="text-sm font-medium text-dark">Aucun utilisateur trouvé</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}