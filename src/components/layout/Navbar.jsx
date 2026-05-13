import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 px-8 py-4 flex items-center justify-between"
      style={{
        background: 'rgba(248, 247, 255, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(107, 33, 232, 0.08)',
      }}
    >
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <span className="text-dark font-heading font-bold text-lg">Coursify</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/catalogue"
          className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium">
          Catalogue
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/login"
          className="text-sm font-medium text-primary-600 border border-primary-200 px-4 py-2 hover:bg-primary-50 transition-colors"
          style={{ borderRadius: '8px' }}
        >
          Connexion
        </Link>
        <Link to="/register"
          className="text-sm font-medium text-white bg-primary-600 px-4 py-2 hover:bg-primary-700 transition-colors"
          style={{ borderRadius: '8px' }}
        >
          S'inscrire
        </Link>
      </div>
    </nav>
  )
}