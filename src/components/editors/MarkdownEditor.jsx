import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

const TOOLBAR_ACTIONS = [
  { label: 'H1', action: (v) => v + '\n# Titre 1\n' },
  { label: 'H2', action: (v) => v + '\n## Titre 2\n' },
  { label: 'H3', action: (v) => v + '\n### Titre 3\n' },
  { label: 'B', action: (v) => v + '**texte en gras**' },
  { label: 'I', action: (v) => v + '*texte en italique*' },
  { label: '—', action: (v) => v + '\n---\n' },
  { label: 'Liste', action: (v) => v + '\n- Élément 1\n- Élément 2\n- Élément 3\n' },
  { label: 'Lien', action: (v) => v + '[texte](https://url.com)' },
  { label: 'Image', action: (v) => v + '![alt](https://url.com/image.png)' },
  { label: 'Code', action: (v) => v + '\n```python\n# votre code ici\n```\n' },
  { label: 'Tableau', action: (v) => v + '\n| Col 1 | Col 2 | Col 3 |\n|-------|-------|-------|\n| A     | B     | C     |\n' },
  { label: 'Citation', action: (v) => v + '\n> Votre citation ici\n' },
]

const DEFAULT_CONTENT = `# Titre du cours

## Introduction

Rédigez votre cours ici en **Markdown**.

## Section 1

Votre contenu...

\`\`\`python
# Exemple de code
print("Hello World")
\`\`\`

## Conclusion

Résumez les points clés.
`

export default function MarkdownEditor({ content, onChange }) {
  const [view, setView] = useState('split') // 'editor' | 'preview' | 'split'
  const [copied, setCopied] = useState(false)

  const value = content || DEFAULT_CONTENT

  const handleToolbar = (action) => {
    onChange(action(value))
  }

  const handleReset = () => {
    if (window.confirm('Réinitialiser le contenu ? Cette action est irréversible.')) {
      onChange(DEFAULT_CONTENT)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

      {/* Barre de menu principale */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-gray-400 mr-2">Éditeur Markdown</span>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>

        {/* Toggle vue */}
        <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
          {[
            { value: 'editor', label: 'Éditeur' },
            { value: 'split', label: 'Split' },
            { value: 'preview', label: 'Voir Rendu' },
          ].map((v) => (
            <button
              key={v.value}
              onClick={() => setView(v.value)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                view === v.value
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar Markdown */}
      <div className="flex items-center gap-1 px-3 py-2 bg-gray-800 border-t border-gray-700 flex-wrap">
        {TOOLBAR_ACTIONS.map((action) => (
          <button
            key={action.label}
            onClick={() => handleToolbar(action.action)}
            title={action.label}
            className="px-2.5 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors font-mono"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Zone d'édition */}
      <div className="flex" style={{ height: '500px' }}>

        {/* Éditeur */}
        {(view === 'editor' || view === 'split') && (
          <div className={`flex flex-col ${view === 'split' ? 'w-1/2 border-r border-gray-200' : 'w-full'}`}>
            <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100">
              <span className="text-xs text-gray-400 font-medium">Markdown</span>
            </div>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 font-mono text-sm text-gray-800 bg-white resize-none focus:outline-none leading-relaxed"
              style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}
              placeholder="Rédigez votre cours en Markdown..."
            />
          </div>
        )}

        {/* Preview */}
        {(view === 'preview' || view === 'split') && (
          <div className={`flex flex-col ${view === 'split' ? 'w-1/2' : 'w-full'} overflow-hidden`}>
            <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100">
              <span className="text-xs text-gray-400 font-medium">Rendu</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 prose prose-sm max-w-none
              prose-headings:font-heading prose-headings:text-dark
              prose-h1:text-2xl prose-h1:font-extrabold prose-h1:mb-4
              prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-base prose-h3:font-semibold prose-h3:mt-6
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-dark prose-strong:font-bold
              prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
              prose-pre:bg-gray-900 prose-pre:rounded-xl
              prose-blockquote:border-l-4 prose-blockquote:border-primary-300 prose-blockquote:bg-primary-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
              prose-table:text-sm prose-th:bg-gray-50 prose-th:font-semibold
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {value}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {value.split('\n').length} lignes · {value.length} caractères
        </span>
        <span className="text-xs text-green-500 font-medium">● Markdown</span>
      </div>
    </div>
  )
}