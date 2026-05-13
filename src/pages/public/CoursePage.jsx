import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Eye, User, Tag, Copy, Check, Menu, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

const courseContent = `
# Introduction à Python

Python est un langage de programmation interprété, orienté objet et de haut niveau.

## 1. Variables et types de données

En Python, les variables sont déclarées dynamiquement.

## 2. Structures de contrôle

Les structures conditionnelles et les boucles permettent de contrôler le flux d'exécution.

## 3. Fonctions

Les fonctions permettent de réutiliser du code.

## 4. Formules mathématiques

La complexité de la recherche binaire est O(log n).

La moyenne arithmétique est la somme des valeurs divisée par leur nombre.

## 5. Listes et dictionnaires

Les listes et dictionnaires sont les structures de données les plus utilisées en Python.

## Conclusion

Python est un excellent langage pour débuter en programmation.
`

const fakeCourse = {
  title: 'Introduction à Python',
  author: 'Dr. Koffi',
  category: 'Programmation',
  views: 1240,
  allowDownload: true,
  content: courseContent,
}

const toc = [
  { id: 'introduction', label: 'Introduction à Python', level: 1 },
  { id: 'variables', label: 'Variables et types', level: 2 },
  { id: 'controle', label: 'Structures de contrôle', level: 2 },
  { id: 'fonctions', label: 'Fonctions', level: 2 },
  { id: 'maths', label: 'Formules mathématiques', level: 2 },
  { id: 'listes', label: 'Listes et dictionnaires', level: 2 },
  { id: 'conclusion', label: 'Conclusion', level: 2 },
]

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
  const [tocOpen, setTocOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

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

        {/* Sidebar gauche TOC desktop */}
        <aside className="hidden lg:block w-64 fixed left-0 top-0 h-screen pt-20 pb-8 px-6 overflow-y-auto border-r border-gray-100 bg-white">
          <Link
            to="/catalogue"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            Retour au catalogue
          </Link>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Table des matières
          </p>
          <nav className="space-y-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={'#' + item.id}
                className={
                  'block text-sm py-1.5 transition-colors hover:text-primary-600 ' +
                  (item.level === 1
                    ? 'font-semibold text-dark'
                    : 'text-gray-500 pl-3 border-l border-gray-100')
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 lg:ml-64 lg:mr-64 px-6 md:px-12 py-10">

          {/* Header mobile */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <Link to="/catalogue" className="flex items-center gap-2 text-sm text-gray-500">
              <ArrowLeft size={14} />
              Catalogue
            </Link>
            <button
              onClick={() => setTocOpen(!tocOpen)}
              className="flex items-center gap-1 text-sm text-primary-600 font-medium"
            >
              <Menu size={16} />
              Sommaire
            </button>
          </div>

          {/* TOC mobile */}
          {tocOpen && (
            <div className="lg:hidden mb-6 bg-white border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Table des matières
                </p>
                <button onClick={() => setTocOpen(false)}>
                  <X size={14} className="text-gray-400" />
                </button>
              </div>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={'#' + item.id}
                    onClick={() => setTocOpen(false)}
                    className={
                      'block text-sm py-1.5 hover:text-primary-600 transition-colors ' +
                      (item.level === 1 ? 'font-semibold text-dark' : 'text-gray-500 pl-3')
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Métadonnées */}
          <div className="mb-8">
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
              {fakeCourse.category}
            </span>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-dark mt-3 mb-4">
              {fakeCourse.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {fakeCourse.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye size={14} />
                {fakeCourse.views} vues
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={14} />
                {fakeCourse.category}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Rendu Markdown */}
          <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-dark prose-h1:text-3xl prose-h1:font-extrabold prose-h2:text-xl prose-h2:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-primary-600">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {fakeCourse.content}
            </ReactMarkdown>
          </div>
        </main>

        {/* Sidebar droite */}
        <aside className="hidden lg:block w-64 fixed right-0 top-0 h-screen pt-20 pb-8 px-6 overflow-y-auto border-l border-gray-100 bg-white">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            À propos du cours
          </p>

          <div className="space-y-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Auteur</p>
              <p className="text-sm font-medium text-dark">{fakeCourse.author}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Catégorie</p>
              <p className="text-sm font-medium text-dark">{fakeCourse.category}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Vues</p>
              <p className="text-sm font-medium text-dark">{fakeCourse.views}</p>
            </div>
          </div>

          {fakeCourse.allowDownload && (
            <button className="mt-6 w-full flex items-center justify-center gap-2 border border-primary-200 text-primary-600 hover:bg-primary-50 transition-colors py-2.5 rounded-lg text-sm font-medium">
              <Download size={15} />
              Télécharger le source
            </button>
          )}

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
