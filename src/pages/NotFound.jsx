import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div
          className="text-8xl font-heading font-extrabold mb-4"
          style={{
            background: 'linear-gradient(135deg, #6B21E8 0%, #9b59f5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </div>
        <h1 className="font-heading font-bold text-2xl text-dark mb-3">
          Page introuvable
        </h1>
        <p className="text-gray-500 text-sm font-light mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          <ArrowLeft size={15} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}