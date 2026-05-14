import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, ArrowRight, Eye } from 'lucide-react'
import api from '../../services/api'

const categories = ['Tous', 'Programmation', 'Data Science', 'Mathématiques', 'Sciences', 'Statistiques', 'Autres']

const sortOptions = [
  { value: 'recent', label: 'Plus récents' },
  { value: 'popular', label: 'Plus populaires' },
  { value: 'az', label: 'A → Z' },
]

function CourseCard({ course }) {
  return (
    <Link
      to={'/cours/' + course.slug}
      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
          {course.category || 'Général'}
        </span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <Eye size={11} /> {course.views}
        </span>
      </div>
      <h3 className="font-heading font-semibold text-dark text-base mb-2 leading-snug">
        {course.title}
      </h3>
      <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">
        {course.description || 'Aucune description disponible.'}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {course.author?.first_name} {course.author?.last_name}
        </p>
        <span className="text-xs font-medium text-primary-600 flex items-center gap-1">
          Lire <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
      <div className="h-5 bg-gray-100 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-100 rounded w-full mb-1" />
      <div className="h-3 bg-gray-100 rounded w-2/3 mb-4" />
      <div className="h-3 bg-gray-100 rounded w-1/4" />
    </div>
  )
}

export default function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'Tous'
  const initialSearch = searchParams.get('q') || ''

  const [search, setSearch] = useState(initialSearch)
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('recent')
  const [showFilters, setShowFilters] = useState(false)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchCourses()
  }, [activeCategory, sortBy])

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCourses()
    }, 400)
    return () => clearTimeout(delay)
  }, [search])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('limit', 12)
      if (activeCategory !== 'Tous') params.append('category', activeCategory)
      if (search.trim()) params.append('search', search.trim())

      const res = await api.get('/api/courses/?' + params.toString())
      let data = res.data

      if (sortBy === 'popular') {
        data = [...data].sort((a, b) => b.views - a.views)
      } else if (sortBy === 'az') {
        data = [...data].sort((a, b) => a.title.localeCompare(b.title))
      }

      setCourses(data)
      setTotal(data.length)
    } catch {
      setCourses([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setSearchParams(cat !== 'Tous' ? { category: cat } : {})
  }

  const handleReset = () => {
    setSearch('')
    setActiveCategory('Tous')
    setSearchParams({})
  }

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
            {total} cours disponibles
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

          {/* Filtres */}
          {showFilters && (
            <div className="mt-3 p-4 bg-white border border-gray-100 rounded-xl">
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
                onClick={() => handleCategoryChange(cat)}
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
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-heading font-bold text-lg text-dark mb-2">
                Aucun cours trouvé
              </h3>
              <p className="text-gray-500 text-sm">
                Essayez avec d'autres mots-clés ou une autre catégorie.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 text-sm text-primary-600 font-medium hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-5">
                {total} résultat{total > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {courses.map((course) => (
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