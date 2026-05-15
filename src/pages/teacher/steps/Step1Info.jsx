const categories = ['Programmation', 'Data Science', 'Mathématiques', 'Sciences', 'Statistiques', 'Autres']

export default function Step1Info({ data, updateData }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-heading font-bold text-lg text-dark mb-1">Informations du cours</h2>
      <p className="text-gray-400 text-sm mb-6">Ces informations seront visibles par les étudiants.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">
            Titre <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            placeholder="Ex: Introduction à Python"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          />
          {!data.title.trim() && (
            <p className="text-xs text-red-400 mt-1">Le titre est obligatoire pour continuer</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1.5">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Décrivez brièvement le contenu et les objectifs de ce cours..."
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Catégorie</label>
            <select
              value={data.category}
              onChange={(e) => updateData({ category: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">Tags</label>
            <input
              type="text"
              value={data.tags}
              onChange={(e) => updateData({ tags: e.target.value })}
              placeholder="python, débutant, tp..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">Séparez les tags par des virgules</p>
          </div>
        </div>
      </div>
    </div>
  )
}