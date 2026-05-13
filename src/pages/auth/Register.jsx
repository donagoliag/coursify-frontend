import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div className="min-h-screen flex">
      {/* Partie gauche — décorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #6B21E8 0%, #9b59f5 100%)',
        }}
      >
        <div className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="absolute bottom-[-60px] right-[-60px] w-72 h-72 rounded-full"
          style={{ background: 'rgba(255,255,255,0.06)' }} />

        <div className="relative z-10 text-center px-12">
          <h2 className="font-heading font-extrabold text-4xl text-white mb-4 leading-tight">
            Rejoignez la communauté.
          </h2>
          <p className="text-violet-200 font-light text-base leading-relaxed max-w-sm mx-auto">
            Enseignants et étudiants réunis sur une seule plateforme moderne et intuitive.
          </p>

          {/* Rôles */}
          <div className="mt-10 space-y-3">
            {[
              { emoji: '👨‍🏫', title: 'Enseignant', desc: 'Publiez vos notebooks et markdown' },
              { emoji: '👨‍🎓', title: 'Étudiant', desc: 'Accédez à tous vos cours' },
            ].map((role) => (
              <div key={role.title}
                className="bg-white/10 rounded-xl px-5 py-4 backdrop-blur-sm flex items-center gap-4 text-left">
                <span className="text-2xl">{role.emoji}</span>
                <div>
                  <p className="font-heading font-bold text-white text-sm">{role.title}</p>
                  <p className="text-violet-200 text-xs mt-0.5">{role.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partie droite — formulaire */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24">
        <div className="max-w-md w-full mx-auto">

          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-heading font-bold text-lg text-dark">Coursify</span>
          </Link>

          <h1 className="font-heading font-extrabold text-3xl text-dark mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-500 text-sm mb-8 font-light">
            Rejoignez Coursify en quelques secondes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Choix du rôle */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Je suis
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'student', label: '👨‍🎓 Étudiant' },
                  { value: 'teacher', label: '👨‍🏫 Enseignant' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: opt.value })}
                    className={`py-2.5 px-4 rounded-lg border text-sm font-medium transition-all ${
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

            {/* Nom et prénom */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Jean"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Dupont"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
                />
              </div>
            </div>

            {/* Email */}
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
              <p className="text-xs text-gray-400 mt-1">Minimum 8 caractères</p>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 font-medium text-sm transition-colors rounded-lg mt-2"
            >
              Créer mon compte
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-primary-600 font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}