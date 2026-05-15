import { Globe, Lock, Users, Download } from 'lucide-react'

const visibilityOptions = [
  { value: 'public', label: 'Public', desc: 'Visible par tous les étudiants', icon: Globe },
  { value: 'private', label: 'Privé', desc: 'Accessible uniquement par lien direct', icon: Lock },
  { value: 'restricted', label: 'Restreint', desc: 'Utilisateurs spécifiés seulement', icon: Users },
]

export default function Step2Visibility({ data, updateData }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-heading font-bold text-lg text-dark mb-1">Visibilité du cours</h2>
      <p className="text-gray-400 text-sm mb-6">Définissez qui peut accéder à ce cours.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {visibilityOptions.map((opt) => {
          const Icon = opt.icon
          const isSelected = data.visibility === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData({ visibility: opt.value })}
              className={`p-5 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                isSelected ? 'bg-primary-100' : 'bg-gray-100'
              }`}>
                <Icon size={20} className={isSelected ? 'text-primary-600' : 'text-gray-400'} />
              </div>
              <p className={`text-sm font-bold mb-1 ${isSelected ? 'text-primary-600' : 'text-dark'}`}>
                {opt.label}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">{opt.desc}</p>
            </button>
          )
        })}
      </div>

      <div className="border-t border-gray-100 pt-5">
        <div
          onClick={() => updateData({ allow_download: !data.allow_download })}
          className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
            data.allow_download
              ? 'border-primary-200 bg-primary-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              data.allow_download ? 'bg-primary-100' : 'bg-gray-100'
            }`}>
              <Download size={16} className={data.allow_download ? 'text-primary-600' : 'text-gray-400'} />
            </div>
            <div>
              <p className={`text-sm font-medium ${data.allow_download ? 'text-primary-700' : 'text-dark'}`}>
                Autoriser le téléchargement du fichier source
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Les étudiants pourront télécharger le fichier .md ou .ipynb original
              </p>
            </div>
          </div>
          <div className={`w-11 h-6 rounded-full transition-all relative ${
            data.allow_download ? 'bg-primary-600' : 'bg-gray-200'
          }`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${
              data.allow_download ? 'left-6' : 'left-1'
            }`} />
          </div>
        </div>
      </div>
    </div>
  )
}