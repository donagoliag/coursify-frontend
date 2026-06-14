import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Eye, User, Tag, Copy, Check, Menu, X, FileText } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { exportToPdf } from '../../utils/exportPdf'

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false)
  const code = String(children).replace(/\n$/, '')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 rounded-md px-2 py-1 flex items-center gap-1 text-xs text-gray-600 hover:text-primary-600 z-10"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
        {copied ? 'Copié !' : 'Copier'}
      </button>
      <pre className="rounded-xl overflow-x-auto p-4 bg-gray-50 border border-gray-100 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function CoursePage() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tocOpen, setTocOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const backPath = !user
    ? '/catalogue'
    : user.role === 'admin'
    ? '/admin/courses'
    : user.role === 'teacher'
    ? '/teacher/dashboard'
    : '/student/dashboard'

  const backLabel = !user
    ? 'Catalogue'
    : user.role === 'admin'
    ? 'Gestion des cours'
    : 'Mon dashboard'

  useEffect(() => {
    api.get('/api/courses/' + slug)
      .then((res) => setCourse(res.data))
      .catch(() => setError('Cours introuvable'))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDownload = async () => {
  try {
    const res = await api.get('/api/courses/' + course.id + '/download', {
      responseType: 'blob'
    })
    
    // Récupérer le nom du fichier depuis les headers si disponible
    const contentDisposition = res.headers['content-disposition']
    let filename = course.slug
    
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/)
      if (match) filename = match[1]
    } else {
      // Fallback sur le type
      if (course.file_type === 'ipynb') filename = course.slug + '.ipynb'
      else if (course.file_type === 'md') filename = course.slug + '.md'
      else filename = course.slug + '.' + course.file_type
    }
    
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch {
    alert('Erreur lors du téléchargement')
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h2 className="font-heading font-bold text-xl text-dark mb-2">Cours introuvable</h2>
          <Link to="/catalogue" className="text-primary-600 text-sm hover:underline">
            Retour au catalogue
          </Link>
        </div>
      </div>
    )
  }

  const isHTML = course.file_type === 'ipynb' || course.file_type === 'md'

  return (
    <div className="min-h-screen bg-[#f8f7ff]">
      {/* Barre de progression */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-100">
        <div
          className="h-full bg-primary-600 transition-all duration-150"
          style={{ width: scrollProgress + '%' }}
        />
      </div>

      <div className="flex max-w-7xl mx-auto">

        {/* Sidebar gauche — seulement si non connecté */}
        {!user && (
          <aside className="hidden lg:block w-64 fixed left-0 top-0 h-screen pt-20 pb-8 px-6 overflow-y-auto border-r border-gray-100 bg-white">
            <Link
              to={backPath}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-6"
            >
              <ArrowLeft size={14} />
              {backLabel}
            </Link>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Informations
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <User size={13} />
                {course.author?.first_name} {course.author?.last_name}
              </p>
              <p className="flex items-center gap-2">
                <Eye size={14} />
                {course.views} vues
              </p>
              <p className="flex items-center gap-2">
                <Tag size={13} />
                {course.category || 'Général'}
              </p>
            </div>
          </aside>
        )}

        {/* Contenu principal */}
        <main className={`flex-1 px-6 md:px-12 py-10 ${!user ? 'lg:ml-64 lg:mr-64' : 'lg:mr-64'}`}>

          {/* Bouton retour */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to={backPath}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft size={14} />
              {backLabel}
            </Link>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="flex items-center gap-1 text-sm text-primary-600 font-medium lg:hidden"
            >
              <Menu size={16} />
              Infos
            </button>
          </div>

          {/* Infos mobile */}
          {tocOpen && (
            <div className="lg:hidden mb-6 bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Informations
                </p>
                <button onClick={() => setTocOpen(false)}>
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <User size={13} />
                  {course.author?.first_name} {course.author?.last_name}
                </p>
                <p className="flex items-center gap-2">
                  <Eye size={13} />
                  {course.views} vues
                </p>
              </div>
            </div>
          )}

          {/* Métadonnées */}
          <div className="mb-8">
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
              {course.category || 'Général'}
            </span>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-dark mt-3 mb-4">
              {course.title}
            </h1>
            {course.description && (
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{course.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {course.author?.first_name} {course.author?.last_name}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                {course.views} vues
              </span>
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Contenu du cours */}
          {/* Contenu du cours */}
          {!course.html_content && course.file_path ? (
            <div className="text-center py-20">
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center">
                  <FileText size={32} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-heading font-bold text-lg text-dark mb-1">
                    Fichier disponible au téléchargement
                  </p>
                  <p className="text-gray-400 text-sm max-w-sm mx-auto">
                    Ce cours est disponible sous forme de fichier à télécharger.
                  </p>
                </div>
                {course.allow_download && (
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
                  >
                    <Download size={16} />
                    Télécharger le fichier
                  </button>
                )}
              </div>
            </div>
          ) : course.html_content ? (
            <div
              id="course-content"
              className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-dark prose-h1:text-3xl prose-h1:font-extrabold prose-h1:mb-6 prose-h2:text-xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm prose-a:text-primary-600 prose-strong:text-dark prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:text-sm prose-li:leading-relaxed prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:p-4 prose-blockquote:border-l-4 prose-blockquote:border-primary-300 prose-blockquote:bg-primary-50 prose-blockquote:rounded-r-xl prose-table:text-sm prose-th:bg-gray-50 prose-th:font-semibold prose-img:rounded-xl"
              style={{
                '--jp-content-font-color1': '#374151',
                '--jp-content-font-color2': '#6b7280',
              }}
              dangerouslySetInnerHTML={{ __html: course.html_content }}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📄</p>
              <p className="text-gray-500 text-sm">Aucun contenu disponible.</p>
            </div>
          )}
        </main>

        {/* Sidebar droite */}
        <aside className="hidden lg:block w-64 fixed right-0 top-0 h-screen pt-20 pb-8 px-6 overflow-y-auto border-l border-gray-100 bg-white">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            À propos du cours
          </p>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Auteur</p>
              <p className="text-sm font-medium text-dark">
                {course.author?.first_name} {course.author?.last_name}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Catégorie</p>
              <p className="text-sm font-medium text-dark">{course.category || 'Général'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Format</p>
              <p className="text-sm font-medium text-dark uppercase">{course.file_type || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Vues</p>
              <p className="text-sm font-medium text-dark">{course.views}</p>
            </div>
          </div>

          {course.allow_download && course.file_path && (
              <button
                onClick={handleDownload}
                className="mt-6 w-full flex items-center justify-center gap-2 border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors py-2.5 rounded-lg text-sm font-medium"
              >
                <Download size={15} />
                Télécharger le source
              </button>
          )}
          <button
            onClick={() => exportToPdf('course-content', course.slug + '.pdf')}
            className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors py-2.5 rounded-lg text-sm font-medium"
          >
            <FileText size={15} />
            Exporter en PDF
          </button>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400">Progression</p>
              <p className="text-xs font-medium text-primary-600">
                {Math.round(scrollProgress)}%
              </p>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-600 rounded-full transition-all duration-300"
                style={{ width: scrollProgress + '%' }}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
