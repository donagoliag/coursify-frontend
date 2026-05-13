import { Link } from 'react-router-dom'
import { BookOpen, LogIn } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 px-6 md:px-16 py-4 flex items-center justify-between"
      style={{
        background: 'rgba(248, 247, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(107, 33, 232, 0.08)',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="font-heading font-bold text-lg text-dark">Coursify</span>
      </Link>

      {/* Liens centre */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/catalogue"
          className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">
          <BookOpen size={15} />
          Catalogue
        </Link>
      </div>

      {/* Actions droite */}
      <div className="flex items-center gap-3">
        <Link to="/login"
          className="flex items-center gap-1.5 text-sm font-medium text-primary-600 border border-primary-200 px-4 py-2 hover:bg-primary-50 transition-colors"
          style={{ borderRadius: '8px' }}
        >
          <LogIn size={14} />
          Connexion
        </Link>
      </div>
    </nav>
  )
}