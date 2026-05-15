import { FileText, BookOpen, Upload } from 'lucide-react'

const fileTypes = [
  {
    value: 'markdown',
    label: 'Markdown',
    desc: 'Rédigez votre cours en Markdown avec un éditeur intégré et un rendu temps réel.',
    icon: FileText,
    tag: '.md',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    value: 'notebook',
    label: 'Jupyter Notebook',
    desc: 'Créez un notebook avec des cellules code et markdown, comme Jupyter.',
    icon: BookOpen,
    tag: '.ipynb',
    color: 'from-orange-500 to-amber-600',
  },
  {
    value: 'upload',
    label: 'Upload fichier',
    desc: 'Importez directement un fichier .md ou .ipynb existant depuis votre ordinateur.',
    icon: Upload,
    tag: '.md / .ipynb',
    color: 'from-violet-500 to-purple-600',
  },
]

export default function Step3FileType({ data, updateData }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-heading font-bold text-lg text-dark mb-1">Type de contenu</h2>
      <p className="text-gray-400 text-sm mb-6">
        Choisissez comment vous souhaitez créer votre cours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {fileTypes.map((type) => {
          const Icon = type.icon
          const isSelected = data.fileType === type.value
          return (
            <button
              key={type.value}
              type="button"
              onClick={() => updateData({ fileType: type.value })}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-100'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                <Icon size={22} className="text-white" />
              </div>
              <span className="text-xs font-mono font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
                {type.tag}
              </span>
              <h3 className="font-heading font-bold text-dark text-base mt-2 mb-1">{type.label}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{type.desc}</p>
            </button>
          )
        })}
      </div>

      {!data.fileType && (
        <p className="text-center text-xs text-amber-500 mt-4">
          Veuillez choisir un type pour continuer
        </p>
      )}
    </div>
  )
}