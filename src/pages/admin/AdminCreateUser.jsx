import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import api from '../../services/api'

export default function AdminCreateUser() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'student',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.post('/api/users/', form)
      setSuccess('Compte créé avec succès')
      setTimeout(() => navigate('/admin/users'), 1500)
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la création')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/users"
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-dark">
            Créer un compte
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Seul l'administrateur peut créer des comptes
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-600">
          ✓ {success}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Rôle */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Rôle <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'student', label: '👨‍🎓 Étudiant' },
                { value: 'teacher', label: '👨‍🏫 Enseignant' },
                { value: 'admin', label: '🛡️ Admin' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: opt.value })}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-all ${
                    form.role === opt.value
                      ? 'border-primary-500 bg-primary-50 text-primary-600'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nom prénom */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Prénom</label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="Jean"
                required
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
                placeholder="Dupont"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jean@ifri.bj"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Minimum 8 caractères</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link to="/admin/users"
              className="flex-1 text-center px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Annuler
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {loading && (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Créer le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}