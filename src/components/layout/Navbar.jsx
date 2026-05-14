import { Link } from 'react-router-dom'
import { BookOpen, LogIn, LogOut, Home } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const auth = useAuth()
  const user = auth?.user

  return (
    <nav className="sticky top-0 z-50 px-6 md:px-16 py-4 flex items-center justify-between"
      style={{
        background: 'rgba(248, 247, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(107, 33, 232, 0.08)',
      }}
    >
      {/* Logo gauche */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="font-heading font-bold text-lg text-dark">Coursify</span>
      </Link>

      {/* Liens centre */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/"
          className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">
          <Home size={15} />
          Accueil
        </Link>
        <Link to="/catalogue"
          className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">
          <BookOpen size={15} />
          Catalogue
        </Link>
      </div>

      {/* Droite */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg hidden sm:inline">
              {user.first_name} {user.last_name}
            </span>
            <button
              onClick={() => auth.logout()}
              className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 border border-red-200 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </>
        ) : (
          <Link to="/login"
            className="flex items-center gap-1.5 text-sm font-medium text-primary-600 border border-primary-200 px-4 py-2 hover:bg-primary-50 transition-colors"
            style={{ borderRadius: '8px' }}
          >
            <LogIn size={14} />
            Connexion
          </Link>
        )}
      </div>
    </nav>
  )
}