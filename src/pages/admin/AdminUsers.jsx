import { useState } from 'react'
import { Search, X, CheckCircle, AlertCircle, MoreVertical, UserX, Shield, Mail } from 'lucide-react'

const fakeUsers = [
  { id: 1, name: 'Alice Koffi', email: 'alice@ifri.bj', role: 'teacher', status: 'active', courses: 5, joined: '12 Jan 2026' },
  { id: 2, name: 'Bob Mensah', email: 'bob@ifri.bj', role: 'student', status: 'active', courses: 0, joined: '15 Jan 2026' },
  { id: 3, name: 'Clara Adjovi', email: 'clara@ifri.bj', role: 'student', status: 'suspended', courses: 0, joined: '20 Jan 2026' },
  { id: 4, name: 'David Biokou', email: 'david@ifri.bj', role: 'teacher', status: 'active', courses: 3, joined: '02 Fév 2026' },
  { id: 5, name: 'Emma Sossa', email: 'emma@ifri.bj', role: 'student', status: 'active', courses: 0, joined: '10 Fév 2026' },
  { id: 6, name: 'Frank Dossou', email: 'frank@ifri.bj', role: 'admin', status: 'active', courses: 0, joined: '01 Jan 2026' },
  { id: 7, name: 'Grace Hounkpe', email: 'grace@ifri.bj', role: 'student', status: 'active', courses: 0, joined: '18 Mar 2026' },
  { id: 8, name: 'Henri Zinsou', email: 'henri@ifri.bj', role: 'teacher', status: 'suspended', courses: 2, joined: '25 Mar 2026' },
]

const roleConfig = {
  teacher: { label: 'Enseignant', className: 'bg-violet-50 text-violet-600' },
  student: { label: 'Étudiant', className: 'bg-blue-50 text-blue-600' },
  admin: { label: 'Admin', className: 'bg-red-50 text-red-500' },
}

const statusConfig = {
  active: { label: 'Actif', icon: CheckCircle, className: 'text-green-500' },
  suspended: { label: 'Suspendu', icon: AlertCircle, className: 'text-red-400' },
}

export default function AdminUsers() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState(null)

  const filtered = fakeUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'all' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
          Gestion des utilisateurs
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {fakeUsers.length} utilisateurs inscrits sur la plateforme
        </p>
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
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Tous' },
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

      {/* Table desktop */}
      <div className="bg-white rounded-xl border border-gray-100 hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Utilisateur</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Rôle</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Cours</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Inscrit le</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((user) => {
              const role = roleConfig[user.role]
              const status = statusConfig[user.status]
              const StatusIcon = status.icon
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${role.className}`}>
                      {role.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <StatusIcon size={14} className={status.className} />
                      <span className="text-xs text-gray-600">{status.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{user.courses}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-400">{user.joined}</span>
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
                        <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-44 py-1">
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                            <Mail size={13} />
                            Envoyer un email
                          </button>
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                            <Shield size={13} />
                            Changer le rôle
                          </button>
                          <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors">
                            <UserX size={13} />
                            {user.status === 'active' ? 'Suspendre' : 'Réactiver'}
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

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">Aucun utilisateur trouvé</p>
          </div>
        )}
      </div>

      {/* Cards mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((user) => {
          const role = roleConfig[user.role]
          const status = statusConfig[user.status]
          const StatusIcon = status.icon
          return (
            <div key={user.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-600">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${role.className}`}>
                  {role.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <StatusIcon size={12} className={status.className} />
                  <span>{status.label}</span>
                </div>
                <span>Inscrit le {user.joined}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}