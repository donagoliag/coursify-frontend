import { useState, useEffect } from 'react'
import { User, Mail, BookOpen, Save } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

export default function Profile() {
  const { user, login } = useAuth()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    bio: '',
  })
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
  })
  const [saved, setSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        bio: user.bio || '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.put('/api/users/me', form)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordError('')
    if (passwordForm.new_password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    try {
      await api.put('/api/users/me/password', passwordForm)
      setPasswordSaved(true)
      setPasswordForm({ current_password: '', new_password: '' })
      setTimeout(() => setPasswordSaved(false), 2500)
    } catch (err) {
      setPasswordError(err.response?.data?.detail || 'Erreur lors de la mise à jour')
    }
  }

  const roleLabel = {
    admin: '🛡️ Administrateur',
    teacher: '👨‍🏫 Enseignant',
    student: '👨‍🎓 Étudiant',
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
          Mon profil
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Gérez vos informations personnelles
        </p>
      </div>

      {/* Avatar */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-heading font-bold text-primary-600">
              {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-dark">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
              <Mail size={13} />
              {user?.email}
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
              <BookOpen size={13} />
              {roleLabel[user?.role] || 'Utilisateur'}
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire infos */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
        <h2 className="font-heading font-bold text-base text-dark mb-5">
          Informations personnelles
        </h2>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Prénom</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Nom</label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2.5 border border-gray-100 rounded-lg text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">L'email ne peut pas être modifié</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Parlez-nous de vous..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {saved && (
              <p className="text-sm text-green-500 font-medium">✓ Profil mis à jour</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="ml-auto flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {loading
                ? <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <Save size={15} />
              }
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      {/* Changer mot de passe */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-heading font-bold text-base text-dark mb-5">
          Changer le mot de passe
        </h2>

        {passwordError && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
            {passwordError}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Mot de passe actuel
            </label>
            <input
              type="password"
              name="current_password"
              value={passwordForm.current_password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="new_password"
              value={passwordForm.new_password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">Minimum 8 caractères</p>
          </div>
          <div className="flex items-center justify-between">
            {passwordSaved && (
              <p className="text-sm text-green-500 font-medium">✓ Mot de passe mis à jour</p>
            )}
            <button
              type="submit"
              className="ml-auto flex items-center gap-2 border border-primary-200 text-primary-600 hover:bg-primary-50 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}