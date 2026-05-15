import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Eye, Globe, Lock, Users, Download, FileText, BookOpen, Upload, Rocket, ArrowLeft } from 'lucide-react'

const visibilityConfig = {
  public: { label: 'Public', icon: Globe, color: 'text-green-600 bg-green-50' },
  private: { label: 'Privé', icon: Lock, color: 'text-amber-600 bg-amber-50' },
  restricted: { label: 'Restreint', icon: Users, color: 'text-blue-600 bg-blue-50' },
}

const fileTypeConfig = {
  markdown: { label: 'Markdown', icon: FileText, color: 'text-blue-600 bg-blue-50' },
  notebook: { label: 'Jupyter Notebook', icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
  upload: { label: 'Fichier uploadé', icon: Upload, color: 'text-violet-600 bg-violet-50' },
}

function NotebookPreview({ cells }) {
  return (
    <div className="space-y-3">
      {cells.map((cell, index) => (
        <div key={cell.id} className="rounded-xl overflow-hidden border border-gray-200">
          <div className={`flex items-center gap-2 px-3 py-1.5 ${
            cell.type === 'code' ? 'bg-gray-900' : 'bg-blue-50 border-b border-blue-100'
          }`}>
            <span className="text-xs font-mono text-gray-400">[{index + 1}]</span>
            <span className={`text-xs font-medium ${
              cell.type === 'code' ? 'text-green-400' : 'text-blue-600'
            }`}>
              {cell.type === 'code' ? 'Python' : 'Markdown'}
            </span>
          </div>
          {cell.type === 'code' ? (
            <pre className="p-4 bg-gray-950 text-green-300 text-sm font-mono overflow-x-auto leading-relaxed">
              <code>{cell.content || '# Cellule vide'}</code>
            </pre>
          ) : (
            <div className="p-4 prose prose-sm max-w-none
              prose-headings:font-heading prose-headings:text-dark
              prose-p:text-gray-600 prose-p:text-sm
              prose-strong:text-dark
              prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1 prose-code:rounded prose-code:text-xs
            ">
              {cell.content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{cell.content}</ReactMarkdown>
              ) : (
                <p className="text-gray-400 italic text-sm">Cellule Markdown vide</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Step5Preview({ data, onPublish, onBack, saving }) {
  const visibility = visibilityConfig[data.visibility]
  const VisibilityIcon = visibility.icon
  const fileType = fileTypeConfig[data.fileType]
  const FileTypeIcon = fileType?.icon

  return (
    <div className="space-y-6">

      {/* Récap infos */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-heading font-bold text-lg text-dark mb-4 flex items-center gap-2">
          <Eye size={18} className="text-primary-600" />
          Aperçu final
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Titre</p>
            <p className="text-sm font-semibold text-dark">
              {data.title || <span className="text-red-400 italic">Non renseigné</span>}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Catégorie</p>
            <p className="text-sm font-medium text-dark">{data.category || '—'}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Tags</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.tags
                ? data.tags.split(',').map((tag) => (
                    <span key={tag} className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">
                      {tag.trim()}
                    </span>
                  ))
                : <span className="text-sm text-gray-400">—</span>
              }
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">Description</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {data.description || '—'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${visibility.color}`}>
            <VisibilityIcon size={13} />
            {visibility.label}
          </div>
          {fileType && (
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${fileType.color}`}>
              <FileTypeIcon size={13} />
              {fileType.label}
            </div>
          )}
          {data.allow_download && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              <Download size={13} />
              Téléchargement autorisé
            </div>
          )}
        </div>
      </div>

      {/* Aperçu du contenu */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-heading font-bold text-base text-dark">Aperçu du contenu</h3>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${fileType?.color}`}>
            {fileType?.label}
          </span>
        </div>

        <div className="p-6">
          {data.fileType === 'markdown' && data.markdownContent && (
            <div className="prose prose-sm max-w-none
              prose-headings:font-heading prose-headings:text-dark
              prose-h1:text-2xl prose-h1:font-extrabold
              prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8
              prose-h3:text-base prose-h3:font-semibold
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm
              prose-a:text-primary-600
              prose-strong:text-dark
              prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
              prose-pre:bg-gray-900 prose-pre:rounded-xl
              prose-blockquote:border-l-4 prose-blockquote:border-primary-300 prose-blockquote:bg-primary-50
              prose-table:text-sm
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {data.markdownContent}
              </ReactMarkdown>
            </div>
          )}

          {data.fileType === 'notebook' && data.notebookCells && (
            <NotebookPreview cells={data.notebookCells} />
          )}

          {data.fileType === 'upload' && (
            <div className="text-center py-10">
              {data.uploadedFile ? (
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center">
                    <span className="text-xl font-bold text-violet-600 uppercase">
                      {data.uploadedFile.name.split('.').pop()}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-dark">{data.uploadedFile.name}</p>
                  <p className="text-xs text-gray-400">
                    {(data.uploadedFile.size / 1024).toFixed(1)} Ko
                  </p>
                  <p className="text-xs text-gray-400 max-w-sm text-center">
                    Ce fichier sera mis à disposition des étudiants tel quel, sans transformation.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-400">Aucun fichier uploadé</p>
              )}
            </div>
          )}

          {!data.markdownContent && data.fileType === 'markdown' && (
            <p className="text-center text-sm text-gray-400 py-10">
              Aucun contenu rédigé dans l'éditeur Markdown.
            </p>
          )}
        </div>
      </div>

      {/* Actions finales */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-heading font-bold text-base text-dark mb-2">
          Prêt à publier ?
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Vérifiez les informations ci-dessus avant de publier. Vous pourrez modifier le cours après publication.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onBack}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={15} />
            Retour à l'éditeur
          </button>
          <button
            onClick={onPublish}
            disabled={saving || !data.title.trim()}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-primary-200"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Rocket size={16} />
            )}
            {saving ? 'Publication...' : 'Publier le cours'}
          </button>
        </div>
      </div>
    </div>
  )
}