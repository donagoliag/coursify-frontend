import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, X, Eye, Globe, Lock, Users } from 'lucide-react'

const categories = ['Programmation', 'Data Science', 'Mathématiques', 'Sciences', 'Statistiques', 'Autres']

const visibilityOptions = [
  { value: 'public', label: 'Public', desc: 'Visible par tous', icon: Globe },
  { value: 'private', label: 'Privé', desc: 'Accessible par lien uniquement', icon: Lock },
  { value: 'restricted', label: 'Restreint', desc: 'Utilisateurs spécifiés seulement', icon: Users },
]

export default function CreateCourse() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    visibility: 'public',
    allowDownload: true,
    status: 'draft',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && (dropped.name.endsWith('.ipynb') || dropped.name.endsWith('.md'))) {
      setFile(dropped)
    }
  }

  const handleFileSelect = (e) => {
    const selected = e.target.files[0]
    if (selected) setFile(selected)
  }

  const handleSubmit = (status) => {
    console.log({ ...form, status, file })
    navigate('/teacher/dashboard')
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/teacher/dashboard"
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-dark">
            Nouveau cours
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Importez votre fichier et configurez votre cours
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Upload fichier */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-base text-dark mb-4">
            Fichier du cours
          </h2>

          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
                dragOver
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload size={22} className="text-primary-600" />
              </div>
              <p className="text-sm font-medium text-dark mb-1">
                Glissez votre fichier ici
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Formats acceptés : .ipynb, .md
              </p>
              <label className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors">
                <Upload size={14} />
                Sélectionner un fichier
                <input
                  type="file"
                  accept=".ipynb,.md"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Eye size={16} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">{file.name}</p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024).toFixed(1)} Ko
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Métadonnées */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-base text-dark mb-4">
            Informations du cours
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Titre du cours <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Introduction à Python"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Décrivez brièvement le contenu de ce cours..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">
                  Catégorie <span className="text-red-400">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
                >
                  <option value="">Choisir une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="python, débutant, tp..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">Séparez les tags par des virgules</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visibilité */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-base text-dark mb-4">
            Visibilité
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {visibilityOptions.map((opt) => {
              const Icon = opt.icon
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, visibility: opt.value })}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    form.visibility === opt.value
                      ? 'border-primary-400 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon
                    size={18}
                    className={form.visibility === opt.value ? 'text-primary-600 mb-2' : 'text-gray-400 mb-2'}
                  />
                  <p className={`text-sm font-medium ${form.visibility === opt.value ? 'text-primary-600' : 'text-dark'}`}>
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <input
              type="checkbox"
              id="allowDownload"
              name="allowDownload"
              checked={form.allowDownload}
              onChange={handleChange}
              className="w-4 h-4 accent-primary-600"
            />
            <label htmlFor="allowDownload" className="text-sm text-gray-600 cursor-pointer">
              Autoriser le téléchargement du fichier source
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pb-8">
          <Link
            to="/teacher/dashboard"
            className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <div className="flex gap-3">
            <button
              onClick={() => handleSubmit('draft')}
              className="px-4 py-2.5 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors"
            >
              Enregistrer en brouillon
            </button>
            <button
              onClick={() => handleSubmit('published')}
              className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Publier le cours
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}