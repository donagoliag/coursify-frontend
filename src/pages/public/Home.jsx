import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Code, FlaskConical, Calculator, BarChart3, Brain, Eye, Upload, Zap, Download, Archive, FileText, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const categories = [
  { icon: Code, label: 'Programmation', count: 24 },
  { icon: Brain, label: 'Data Science', count: 18 },
  { icon: Calculator, label: 'Mathématiques', count: 15 },
  { icon: FlaskConical, label: 'Sciences', count: 9 },
  { icon: BarChart3, label: 'Statistiques', count: 12 },
  { icon: BookOpen, label: 'Autres', count: 8 },
]

const fakeCourses = [
  { id: 1, title: 'Introduction à Python', description: 'Apprenez les bases de Python avec des exemples concrets.', author: 'Dr. Koffi', category: 'Programmation', views: 1240, date: '10 Jan 2026', slug: 'intro-python' },
  { id: 2, title: 'Algèbre Linéaire', description: 'Vecteurs, matrices, espaces vectoriels et transformations.', author: 'Prof. Mensah', category: 'Mathématiques', views: 980, date: '15 Jan 2026', slug: 'algebre-lineaire' },
  { id: 3, title: 'Machine Learning avec Scikit-learn', description: 'Introduction aux algorithmes de machine learning avec Python.', author: 'Dr. Adjovi', category: 'Data Science', views: 2100, date: '20 Jan 2026', slug: 'ml-scikit' },
  { id: 4, title: 'Statistiques Descriptives', description: 'Moyennes, médianes, variances et représentations graphiques.', author: 'Prof. Biokou', category: 'Statistiques', views: 760, date: '25 Jan 2026', slug: 'stats-desc' },
  { id: 5, title: 'Analyse de données avec Pandas', description: 'Manipulation et analyse de données tabulaires avec Pandas.', author: 'Dr. Koffi', category: 'Data Science', views: 1560, date: '01 Fév 2026', slug: 'pandas-analyse' },
  { id: 6, title: 'Calcul Différentiel', description: 'Dérivées, intégrales et applications en sciences.', author: 'Prof. Mensah', category: 'Mathématiques', views: 430, date: '10 Fév 2026', slug: 'calcul-diff' },
]

const formats = [
  { label: 'Markdown Rendering', desc: 'Rendu HTML complet depuis fichiers .md', icon: '📝', tag: '.md' },
  { label: 'Jupyter Notebook', desc: 'Support natif des fichiers .ipynb', icon: '📓', tag: '.ipynb' },
  { label: 'LaTeX & Math', desc: 'Formules mathématiques rendues avec KaTeX', icon: '∑', tag: 'LaTeX' },
  { label: 'Code Highlighting', desc: 'Coloration syntaxique pour tous les langages', icon: '💻', tag: 'Prism' },
]

const whyItems = [
  { icon: Upload, label: 'Upload simple', desc: 'Glissez-déposez vos notebooks ou fichiers Markdown directement.' },
  { icon: Zap, label: 'Conversion automatique', desc: 'Vos fichiers sont convertis en HTML automatiquement.' },
  { icon: CheckCircle, label: 'Publication rapide', desc: 'Publiez en un clic, gérez brouillons et archives.' },
  { icon: Download, label: 'Téléchargement contrôlé', desc: 'Autorisez ou non le téléchargement du fichier source.' },
  { icon: Archive, label: 'Gestion complète', desc: 'Brouillon, publié, archivé : contrôlez l\'état de chaque cours.' },
  { icon: FileText, label: 'Rendu fidèle', desc: 'Le contenu s\'affiche exactement comme vous l\'avez écrit.' },
]

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
          {course.category}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Eye size={11} /> {course.views}
        </span>
      </div>
      <h3 className="font-heading font-semibold text-dark text-base mb-1.5 leading-snug">
        {course.title}
      </h3>
      <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
        {course.description}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{course.author} · {course.date}</p>
        <Link
          to={'/cours/' + course.slug}
          className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          Lire <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate('/catalogue?q=' + encodeURIComponent(search.trim()))
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff]">

      {/* 1. HERO */}
      <section className="relative overflow-hidden px-6 md:px-16 pt-20 pb-24 text-center">
        <div className="absolute inset-0 -z-10"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,33,232,0.1) 0%, transparent 70%)' }}
        />
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-primary-200 bg-white px-4 py-1.5 rounded-full text-xs font-medium text-primary-600 mb-6">
            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
            Notebooks · Markdown · LaTeX · Code
          </div>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-dark leading-tight mb-4 max-w-3xl mx-auto">
          Vos cours,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #6B21E8 0%, #9b59f5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            enfin centralisés.
          </span>
        </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Publiez vos fichiers Jupyter Notebook et Markdown. Vos étudiants y accèdent avec un rendu optimal, depuis n'importe quel appareil.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/catalogue"
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-medium text-sm transition-colors rounded-lg">
              <BookOpen size={15} />
              Explorer les cours
            </Link>
            <Link to="/login"
              className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-dark px-6 py-3 font-medium text-sm transition-colors rounded-lg">
              Publier un cours
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. RECHERCHE */}
      <section className="px-6 md:px-16 pb-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un cours, une technologie, un sujet..."
              className="flex-1 px-5 py-3.5 border border-gray-200 rounded-xl text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white shadow-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-medium transition-colors flex-shrink-0"
            >
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">Catalogue</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">
              {categories.reduce((a, c) => a + c.count, 0)}+ cours dans 6 catégories
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.label}
                  to={'/catalogue?category=' + cat.label}
                  className="bg-[#f8f7ff] rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all text-center border border-transparent hover:border-primary-100"
                >
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon size={20} className="text-primary-600" />
                  </div>
                  <p className="text-xs font-semibold text-dark">{cat.label}</p>
                  <p className="text-xs text-gray-400">{cat.count} cours</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. COURS POPULAIRES */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-1">Tendances</p>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">Cours populaires</h2>
            </div>
            <Link to="/catalogue" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...fakeCourses].sort((a, b) => b.views - a.views).slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. COURS RÉCENTS */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-1">Nouveautés</p>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">Cours récents</h2>
            </div>
            <Link to="/catalogue" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fakeCourses.slice(0, 6).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FORMATS SUPPORTÉS */}
      <section className="px-6 md:px-16 py-16"
        style={{ background: 'linear-gradient(180deg, #f8f7ff 0%, #f0ebff 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">Technologie</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark mb-3">
              Formats supportés
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto font-light">
              Votre contenu s'affiche parfaitement, quel que soit le format.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {formats.map((f) => (
              <div key={f.label}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md font-mono">
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-dark text-sm mb-1">{f.label}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. POURQUOI */}
      <section className="px-6 md:px-16 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">Avantages</p>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark mb-3">
              Pourquoi utiliser Coursify ?
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto font-light">
              Tout ce dont vous avez besoin pour publier et accéder aux cours techniques.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label}
                  className="flex gap-4 p-5 bg-[#f8f7ff] rounded-xl border border-transparent hover:border-primary-100 transition-all">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-dark text-sm mb-1">{item.label}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl p-10 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, #6B21E8 0%, #9b59f5 100%)' }}
          >
            <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-white mb-3">
              Vous êtes enseignant ?
            </h2>
            <p className="text-violet-200 text-sm md:text-base font-light max-w-md mx-auto mb-8">
              Publiez vos notebooks et fichiers Markdown en quelques clics. Vos étudiants y accèdent instantanément.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/login"
                className="flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium text-sm hover:bg-violet-50 transition-colors">
                Publier un cours
                <ArrowRight size={15} />
              </Link>
              <Link to="/catalogue"
                className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors">
                Explorer les cours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 md:px-16 py-10 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-heading font-bold text-dark">Coursify</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 Coursify. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/catalogue" className="hover:text-primary-600 transition-colors">Catalogue</Link>
            <Link to="/login" className="hover:text-primary-600 transition-colors">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}