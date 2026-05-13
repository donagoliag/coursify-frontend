import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const categories = ['Tous', 'Programmation', 'Data Science', 'Mathématiques', 'Sciences', 'Statistiques', 'Autres']

const fakeCourses = [
  { id: 1, title: 'Introduction à Python', author: 'Dr. Koffi', category: 'Programmation', views: 1240, slug: 'intro-python', description: 'Apprenez les bases de Python avec des exemples concrets et des exercices pratiques.' },
  { id: 2, title: 'Algèbre Linéaire', author: 'Prof. Mensah', category: 'Mathématiques', views: 980, slug: 'algebre-lineaire', description: 'Vecteurs, matrices, espaces vectoriels et transformations linéaires.' },
  { id: 3, title: 'Machine Learning avec Scikit-learn', author: 'Dr. Adjovi', category: 'Data Science', views: 2100, slug: 'ml-scikit', description: 'Introduction aux algorithmes de machine learning avec Python et Scikit-learn.' },
  { id: 4, title: 'Statistiques Descriptives', author: 'Prof. Biokou', category: 'Statistiques', views: 760, slug: 'stats-desc', description: 'Moyennes, médianes, variances et représentations graphiques des données.' },
  { id: 5, title: 'Analyse de données avec Pandas', author: 'Dr. Koffi', category: 'Data Science', views: 1560, slug: 'pandas-analyse', description: 'Manipulation et analyse de données tabulaires avec la librairie Pandas.' },
  { id: 6, title: 'Calcul Différentiel', author: 'Prof. Mensah', category: 'Mathématiques', views: 430, slug: 'calcul-diff', description: 'Dérivées, intégrales et applications en sciences et ingénierie.' },
  { id: 7, title: 'Réseaux de neurones', author: 'Dr. Adjovi', category: 'Data Science', views: 1890, slug: 'reseaux-neurones', description: 'Comprendre et implémenter des réseaux de neurones artificiels.' },
  { id: 8, title: 'Programmation Orientée Objet', author: 'Dr. Koffi', category: 'Programmation', views: 1100, slug: 'poo', description: 'Classes, objets, héritage et polymorphisme en Python.' },
  { id: 9, title: 'Probabilités et Statistiques', author: 'Prof. Biokou', category: 'Statistiques', views: 670, slug: 'proba-stats', description: 'Lois de probabilité, théorèmes fondamentaux et tests statistiques.' },
]

const sortOptions = [
  { value: 'popular', label: 'Plus populaires' },
  { value: 'recent', label: 'Plus récents' },
  { value: 'az', label: 'A → Z' },
]

function CourseCard({ course }) {
  return (
    <Link
      to={`/cours/${course.slug}`}
      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
          {course.category}
        </span>
        <span className="text-xs text-gray-400">{course.views} vues</span>
      </div>
      <h3 className="font-heading font-semibold text-dark text-base mb-2 leading-snug">
        {course.title}
      </h3>
      <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">
        {course.description}
      </p>
      <p className="text-sm text-gray-500">{course.author}</p>
    </Link>
  )
}

export default function Catalogue() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'Tous'

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = fakeCourses
    .filter((c) => {
      const matchCategory = activeCategory === 'Tous' || c.category === activeCategory
      const matchSearch =
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.author.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'popular') return b.views - a.views
      if (sortBy === 'az') return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-6 md:px-16 pt-12 pb-8"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,33,232,0.08) 0%, rgba(248,247,255,0) 70%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-dark mb-2">
            Catalogue des cours
          </h1>
          <p className="text-gray-500 text-sm font-light mb-8">
            {fakeCourses.length} cours disponibles
          </p>

          {/* Barre de recherche */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un cours, un auteur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-dark placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
                showFilters
                  ? 'border-primary-400 bg-primary-50 text-primary-600'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
              }`}
            >
              <SlidersHorizontal size={16} />
              <span className="hidden sm:inline">Filtres</span>
            </button>
          </div>

          {/* Filtres étendus */}
          {showFilters && (
            <div className="mt-3 p-4 bg-white border border-gray-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">Trier par</p>
                <div className="flex gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        sortBy === opt.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu */}
      <div className="px-6 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Catégories */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-200 hover:text-primary-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Résultats */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-heading font-bold text-lg text-dark mb-2">
                Aucun cours trouvé
              </h3>
              <p className="text-gray-500 text-sm">
                Essayez avec d'autres mots-clés ou une autre catégorie.
              </p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('Tous') }}
                className="mt-4 text-sm text-primary-600 font-medium hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-5">
                {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}