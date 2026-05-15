import MarkdownEditor from '../../../components/editors/MarkdownEditor'
import NotebookEditor from '../../../components/editors/NotebookEditor'
import { Upload, X } from 'lucide-react'

function UploadEditor({ data, updateData }) {
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (file) updateData({ uploadedFile: file })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.ipynb'))) {
      updateData({ uploadedFile: file })
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="font-heading font-bold text-lg text-dark mb-1">Upload du fichier</h2>
      <p className="text-gray-400 text-sm mb-6">
        Le fichier sera mis à disposition des étudiants tel quel, sans transformation.
      </p>

      {!data.uploadedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center hover:border-primary-300 hover:bg-gray-50 transition-colors"
        >
          <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Upload size={28} className="text-primary-600" />
          </div>
          <p className="text-base font-medium text-dark mb-1">Glissez votre fichier ici</p>
          <p className="text-sm text-gray-400 mb-6">Formats acceptés : .ipynb, .md</p>
          <label className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors">
            <Upload size={15} />
            Sélectionner un fichier
            <input type="file" accept=".ipynb,.md" onChange={handleFile} className="hidden" />
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-primary-50 border border-primary-100 rounded-xl px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <span className="text-sm font-bold text-primary-600 uppercase">
                {data.uploadedFile.name.split('.').pop()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-dark">{data.uploadedFile.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {(data.uploadedFile.size / 1024).toFixed(1)} Ko — Prêt à être publié
              </p>
            </div>
          </div>
          <button
            onClick={() => updateData({ uploadedFile: null })}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Step4Editor({ data, updateData }) {
  if (data.fileType === 'markdown') {
    return (
      <MarkdownEditor
        content={data.markdownContent}
        onChange={(val) => updateData({ markdownContent: val })}
      />
    )
  }

  if (data.fileType === 'notebook') {
    return (
      <NotebookEditor
        cells={data.notebookCells}
        onChange={(cells) => updateData({ notebookCells: cells })}
      />
    )
  }

  if (data.fileType === 'upload') {
    return <UploadEditor data={data} updateData={updateData} />
  }

  return null
}