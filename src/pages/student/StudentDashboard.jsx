import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Eye, ArrowRight, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'

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
      <h3 className="font-heading font-semibold text-dark text-base mb-1.5 leading-snug">
        {course.title}
      </h3>
      <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
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
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
        <Link
          to={'/cours/' + course.slug}
          className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          Lire <ArrowRight size={11} />
        </Link>
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

export default function StudentDashboard() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/api/courses/?limit=6'),
      api.get('/api/courses/popular?limit=3'),
    ]).then(([recentRes, popularRes]) => {
      setCourses(recentRes.data)
      setPopular(popularRes.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-dark">
          Bonjour, {user?.first_name} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Découvrez les cours disponibles sur la plateforme
        </p>
      </div>

      {/* Info profil rapide */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-8 flex items-center gap-4">
        <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-heading font-bold text-primary-600">
            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <p className="font-heading font-bold text-dark">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
          <p className="text-xs text-primary-600 mt-0.5">👨‍🎓 Étudiant</p>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-2 border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <User size={14} />
          Mon profil
        </Link>
      </div>

      {/* Cours populaires */}
      <div className="mb-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-1">Tendances</p>
            <h2 className="font-heading font-bold text-xl text-dark">Cours populaires</h2>
          </div>
          <Link to="/catalogue"
            className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? [1, 2, 3].map(i => <SkeletonCard key={i} />)
            : popular.length > 0
            ? popular.map(course => <CourseCard key={course.id} course={course} />)
            : <p className="text-sm text-gray-400 col-span-3 py-8 text-center">Aucun cours disponible.</p>
          }
        </div>
      </div>

      {/* Cours récents */}
      <div>
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-1">Nouveautés</p>
            <h2 className="font-heading font-bold text-xl text-dark">Cours récents</h2>
          </div>
          <Link to="/catalogue"
            className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? [1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)
            : courses.length > 0
            ? courses.map(course => <CourseCard key={course.id} course={course} />)
            : <p className="text-sm text-gray-400 col-span-3 py-8 text-center">Aucun cours disponible.</p>
          }
        </div>
      </div>
    </div>
  )
}