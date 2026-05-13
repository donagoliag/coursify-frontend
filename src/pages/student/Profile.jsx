import { useState } from 'react'
import { User, Mail, BookOpen, Save } from 'lucide-react'

export default function Profile() {
  const [form, setForm] = useState({
    firstName: 'Alice',
    lastName: 'Koffi',
    email: 'alice@ifri.bj',
    bio: 'Étudiante en Master Informatique à l\'IFRI.',
  })
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
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
            <User size={36} className="text-primary-600" />
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-dark">
              {form.firstName} {form.lastName}
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
              <Mail size={13} />
              {form.email}
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
              <BookOpen size={13} />
              Étudiant
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-heading font-bold text-base text-dark mb-5">
          Informations personnelles
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Parlez-nous de vous..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {saved && (
              <p className="text-sm text-green-500 font-medium">
                ✓ Profil mis à jour
              </p>
            )}
            <button
              type="submit"
              className="ml-auto flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              <Save size={15} />
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      {/* Changer mot de passe */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mt-6">
        <h2 className="font-heading font-bold text-base text-dark mb-5">
          Changer le mot de passe
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Mot de passe actuel
            </label>
            <input
              type="password"
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
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
          </div>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 border border-primary-200 text-primary-600 hover:bg-primary-50 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}