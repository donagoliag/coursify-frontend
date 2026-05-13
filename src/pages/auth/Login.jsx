import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div className="min-h-screen flex">
      {/* Partie gauche — formulaire */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-heading font-bold text-lg text-dark">Coursify</span>
          </Link>

          {/* Titre */}
          <h1 className="font-heading font-extrabold text-3xl text-dark mb-2">
            Bon retour 👋
          </h1>
          <p className="text-gray-500 text-sm mb-8 font-light">
            Connectez-vous pour accéder à vos cours.
          </p>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Adresse email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="vous@exemple.com"
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-dark">
                  Mot de passe
                </label>
                <Link to="/forgot-password"
                  className="text-xs text-primary-600 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 font-medium text-sm transition-colors rounded-lg mt-2"
            >
              Se connecter
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-primary-600 font-medium hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>

      {/* Partie droite — décorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #6B21E8 0%, #9b59f5 100%)',
        }}
      >
        {/* Cercles décoratifs */}
        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-72 h-72 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="relative z-10 text-center px-12">
          <h2 className="font-heading font-extrabold text-4xl text-white mb-4 leading-tight">
            Apprenez à votre rythme.
          </h2>
          <p className="text-violet-200 font-light text-base leading-relaxed max-w-sm mx-auto">
            Des cours en Notebook et Markdown, rendus lisibles et accessibles depuis n'importe quel appareil.
          </p>

          {/* Faux stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: '120+', label: 'Cours' },
              { value: '40+', label: 'Enseignants' },
              { value: '500+', label: 'Étudiants' },
            ].map((stat) => (
              <div key={stat.label}
                className="bg-white/10 rounded-xl px-4 py-4 backdrop-blur-sm">
                <p className="font-heading font-extrabold text-2xl text-white">{stat.value}</p>
                <p className="text-violet-200 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}