import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, X, Globe, Lock, Users } from 'lucide-react'
import api from '../../services/api'

const categories = ['Programmation', 'Data Science', 'Mathématiques', 'Sciences', 'Statistiques', 'Autres']

const visibilityOptions = [
  { value: 'public', label: 'Public', desc: 'Visible par tous', icon: Globe },
  { value: 'private', label: 'Privé', desc: 'Accessible par lien uniquement', icon: Lock },
  { value: 'restricted', label: 'Restreint', desc: 'Utilisateurs spécifiés seulement', icon: Users },
]

export default function EditCourse() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    visibility: 'public',
    allow_download: true,
    status: 'draft',
  })

  useEffect(() => {
    api.get('/api/courses/my-courses')
      .then((res) => {
        const course = res.data.find(c => c.id === parseInt(id))
        if (course) {
          setForm({
            title: course.title || '',
            description: course.description || '',
            category: course.category || '',
            tags: course.tags || '',
            visibility: course.visibility || 'public',
            allow_download: course.allow_download,
            status: course.status || 'draft',
          })
        } else {
          setError('Cours introuvable')
        }
      })
      .catch(() => setError('Erreur lors du chargement'))
      .finally(() => setFetching(false))
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setError('Le titre est obligatoire')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.put('/api/courses/' + id, {
        title: form.title,
        description: form.description,
        category: form.category,
        tags: form.tags,
        visibility: form.visibility,
        allow_download: form.allow_download,
        status: form.status,
      })

      if (file) {
        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('category', form.category)
        formData.append('tags', form.tags)
        formData.append('visibility', form.visibility)
        formData.append('allow_download', form.allow_download)
        formData.append('status', form.status)
        formData.append('file', file)
        await api.put('/api/courses/' + id + '/file', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }

      navigate('/teacher/dashboard')
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la mise à jour')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/teacher/dashboard"
          className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-dark">Éditer le cours</h1>
          <p className="text-gray-500 text-sm mt-0.5">Modifiez les informations de votre cours</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-6">

        {/* Remplacer le fichier */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-base text-dark mb-1">Remplacer le fichier</h2>
          <p className="text-xs text-gray-400 mb-4">Optionnel — laissez vide pour garder le fichier actuel</p>
          {!file ? (
            <label className="flex items-center gap-3 border border-dashed border-gray-200 rounded-xl px-4 py-4 cursor-pointer hover:border-primary-300 hover:bg-gray-50 transition-colors">
              <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Upload size={16} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-dark">Sélectionner un nouveau fichier</p>
                <p className="text-xs text-gray-400">Formats acceptés : .ipynb, .md</p>
              </div>
              <input
                type="file"
                accept=".ipynb,.md"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex items-center justify-between bg-primary-50 border border-primary-100 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-600 uppercase">
                    {file.name.split('.').pop()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-dark">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} Ko</p>
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
          <h2 className="font-heading font-bold text-base text-dark mb-4">Informations du cours</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Titre <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Catégorie</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
                >
                  <option value="">Choisir une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="python, débutant, tp..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>

            {/* Statut */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">Statut</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
              >
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Visibilité */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-heading font-bold text-base text-dark mb-4">Visibilité</h2>
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
                  <Icon size={18} className={form.visibility === opt.value ? 'text-primary-600 mb-2' : 'text-gray-400 mb-2'} />
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
              id="allow_download"
              name="allow_download"
              checked={form.allow_download}
              onChange={handleChange}
              className="w-4 h-4 accent-primary-600"
            />
            <label htmlFor="allow_download" className="text-sm text-gray-600 cursor-pointer">
              Autoriser le téléchargement du fichier source
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pb-8">
          <Link to="/teacher/dashboard"
            className="px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Annuler
          </Link>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  )
}