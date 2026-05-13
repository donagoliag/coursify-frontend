import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Code, FlaskConical, Calculator, BarChart3, Brain } from 'lucide-react'

const categories = [
  { icon: Code, label: 'Programmation', color: 'bg-violet-100 text-violet-600' },
  { icon: Brain, label: 'Data Science', color: 'bg-blue-100 text-blue-600' },
  { icon: Calculator, label: 'Mathématiques', color: 'bg-amber-100 text-amber-600' },
  { icon: FlaskConical, label: 'Sciences', color: 'bg-green-100 text-green-600' },
  { icon: BarChart3, label: 'Statistiques', color: 'bg-pink-100 text-pink-600' },
  { icon: BookOpen, label: 'Autres', color: 'bg-gray-100 text-gray-600' },
]

const fakeCourses = [
  { id: 1, title: 'Introduction à Python', author: 'Dr. Koffi', category: 'Programmation', views: 1240, slug: 'intro-python' },
  { id: 2, title: 'Algèbre Linéaire', author: 'Prof. Mensah', category: 'Mathématiques', views: 980, slug: 'algebre-lineaire' },
  { id: 3, title: 'Machine Learning avec Scikit-learn', author: 'Dr. Adjovi', category: 'Data Science', views: 2100, slug: 'ml-scikit' },
  { id: 4, title: 'Statistiques Descriptives', author: 'Prof. Biokou', category: 'Statistiques', views: 760, slug: 'stats-desc' },
  { id: 5, title: 'Analyse de données avec Pandas', author: 'Dr. Koffi', category: 'Data Science', views: 1560, slug: 'pandas-analyse' },
  { id: 6, title: 'Calcul Différentiel', author: 'Prof. Mensah', category: 'Mathématiques', views: 430, slug: 'calcul-diff' },
]

function CourseCard({ course }) {
  return (
    <Link to={`/cours/${course.slug}`}
      className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 block">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-md">
          {course.category}
        </span>
        <span className="text-xs text-gray-400">{course.views} vues</span>
      </div>
      <h3 className="font-heading font-semibold text-dark text-base mb-2 leading-snug">
        {course.title}
      </h3>
      <p className="text-sm text-gray-500">{course.author}</p>
    </Link>
  )
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-28 md:pb-36 text-center">
        {/* Dégradé arrière-plan */}
        <div className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,33,232,0.12) 0%, rgba(248,247,255,0) 70%)',
          }}
        />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-primary-200 bg-white px-4 py-1.5 rounded-full text-xs font-medium text-primary-600 mb-6">
          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
          Plateforme de cours en ligne
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
          Accédez à tous vos supports de cours Notebook et Markdown en un seul endroit, avec un rendu optimal et une navigation intuitive.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/register"
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-medium text-sm transition-colors"
            style={{ borderRadius: '8px' }}
          >
            Commencer gratuitement
            <ArrowRight size={16} />
          </Link>
          <Link to="/catalogue"
            className="flex items-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-dark px-6 py-3 font-medium text-sm transition-colors"
            style={{ borderRadius: '8px' }}
          >
            Voir le catalogue
          </Link>
        </div>
      </section>

      {/* Catégories */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">
              Parcourir par catégorie
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.label}
                  to={`/catalogue?category=${cat.label}`}
                  className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-xs font-medium text-dark">{cat.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cours populaires */}
      <section className="px-6 md:px-16 py-16"
        style={{
          background: 'linear-gradient(180deg, #f8f7ff 0%, #ffffff 100%)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">
              Cours populaires
            </h2>
            <Link to="/catalogue"
              className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fakeCourses.sort((a, b) => b.views - a.views).slice(0, 3).map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Cours récents */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-dark">
              Cours récents
            </h2>
            <Link to="/catalogue"
              className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
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

      {/* CTA Banner */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background: 'linear-gradient(135deg, #6B21E8 0%, #9b59f5 100%)',
            }}
          >
            <div>
              <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-white mb-3">
                Vous êtes enseignant ?
              </h2>
              <p className="text-violet-200 text-sm md:text-base font-light max-w-md">
                Publiez vos notebooks et fichiers Markdown en quelques clics. Vos étudiants y accèdent instantanément.
              </p>
            </div>
            <Link to="/register"
              className="flex-shrink-0 flex items-center gap-2 bg-white text-primary-600 px-6 py-3 font-medium text-sm hover:bg-violet-50 transition-colors"
              style={{ borderRadius: '8px' }}
            >
              Créer un compte enseignant
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 md:px-16 py-10">
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
            <Link to="/register" className="hover:text-primary-600 transition-colors">S'inscrire</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}