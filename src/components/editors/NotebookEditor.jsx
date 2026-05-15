import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Plus, Trash2, Copy, ChevronUp, ChevronDown, Code, FileText } from 'lucide-react'

let cellIdCounter = 100

function generateId() {
  return ++cellIdCounter
}

function CodeCell({ cell, onChange }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 rounded-t-lg">
        <Code size={12} className="text-green-400" />
        <span className="text-xs text-green-400 font-mono font-medium">Python</span>
      </div>
      <textarea
        value={cell.content}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={Math.max(4, cell.content.split('\n').length + 1)}
        className="w-full p-4 font-mono text-sm bg-gray-950 text-green-300 resize-none focus:outline-none leading-relaxed rounded-b-lg"
        style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}
        placeholder="# Écrivez votre code Python ici..."
      />
    </div>
  )
}

function MarkdownCell({ cell, onChange }) {
  const [editing, setEditing] = useState(!cell.content)

  return (
    <div>
      {editing ? (
        <div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-t-lg">
            <FileText size={12} className="text-gray-300" />
            <span className="text-xs text-gray-300 font-medium">Markdown — cliquez ailleurs pour voir le rendu</span>
          </div>
          <textarea
            value={cell.content}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => cell.content && setEditing(false)}
            autoFocus
            spellCheck={false}
            rows={Math.max(3, cell.content.split('\n').length + 1)}
            className="w-full p-4 font-mono text-sm bg-gray-50 text-gray-800 resize-none focus:outline-none leading-relaxed rounded-b-lg border border-blue-200"
            placeholder="## Titre de section&#10;&#10;Rédigez votre texte en Markdown..."
          />
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="p-4 bg-white border border-gray-100 rounded-lg cursor-text hover:border-primary-200 hover:bg-primary-50/30 transition-colors min-h-[60px] prose prose-sm max-w-none
            prose-headings:font-heading prose-headings:text-dark
            prose-h1:text-xl prose-h1:font-extrabold
            prose-h2:text-lg prose-h2:font-bold
            prose-p:text-gray-600 prose-p:text-sm prose-p:leading-relaxed
            prose-strong:text-dark prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1 prose-code:rounded prose-code:text-xs
          "
        >
          {cell.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{cell.content}</ReactMarkdown>
          ) : (
            <p className="text-gray-400 text-sm italic">Cellule Markdown vide — cliquez pour éditer</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function NotebookEditor({ cells, onChange }) {
  const updateCell = (id, content) => {
    onChange(cells.map((c) => (c.id === id ? { ...c, content } : c)))
  }

  const addCell = (type, afterId) => {
    const idx = cells.findIndex((c) => c.id === afterId)
    const newCell = { id: generateId(), type, content: '' }
    const updated = [...cells]
    updated.splice(idx + 1, 0, newCell)
    onChange(updated)
  }

  const deleteCell = (id) => {
    if (cells.length === 1) return
    onChange(cells.filter((c) => c.id !== id))
  }

  const duplicateCell = (id) => {
    const idx = cells.findIndex((c) => c.id === id)
    const cell = cells[idx]
    const newCell = { ...cell, id: generateId() }
    const updated = [...cells]
    updated.splice(idx + 1, 0, newCell)
    onChange(updated)
  }

  const moveCell = (id, direction) => {
    const idx = cells.findIndex((c) => c.id === id)
    if (direction === 'up' && idx === 0) return
    if (direction === 'down' && idx === cells.length - 1) return
    const updated = [...cells]
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    ;[updated[idx], updated[swapIdx]] = [updated[swapIdx], updated[idx]]
    onChange(updated)
  }

  const toggleCellType = (id) => {
    onChange(cells.map((c) =>
      c.id === id ? { ...c, type: c.type === 'code' ? 'markdown' : 'code' } : c
    ))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

      {/* Menu principal */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900">
        <span className="text-xs font-semibold text-gray-400 mr-2">Éditeur Notebook</span>
        <button
          onClick={() => onChange([...cells, { id: generateId(), type: 'code', content: '' }])}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Plus size={12} />
          Cellule code
        </button>
        <button
          onClick={() => onChange([...cells, { id: generateId(), type: 'markdown', content: '' }])}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Plus size={12} />
          Cellule Markdown
        </button>
      </div>

      {/* Cellules */}
      <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto bg-gray-50">
        {cells.map((cell, index) => (
          <div key={cell.id} className="group relative">

            {/* Actions de cellule */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-mono">
                  [{index + 1}]
                </span>
                <button
                  onClick={() => toggleCellType(cell.id)}
                  className={`text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                    cell.type === 'code'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {cell.type === 'code' ? 'Code' : 'Markdown'}
                </button>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => moveCell(cell.id, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors disabled:opacity-30"
                  title="Monter"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => moveCell(cell.id, 'down')}
                  disabled={index === cells.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors disabled:opacity-30"
                  title="Descendre"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  onClick={() => duplicateCell(cell.id)}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Dupliquer cellule"
                >
                  <Copy size={14} />
                </button>
                <button
                  onClick={() => deleteCell(cell.id)}
                  disabled={cells.length === 1}
                  className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-30"
                  title="Supprimer cellule"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Contenu cellule */}
            {cell.type === 'code' ? (
              <CodeCell cell={cell} onChange={(val) => updateCell(cell.id, val)} />
            ) : (
              <MarkdownCell cell={cell} onChange={(val) => updateCell(cell.id, val)} />
            )}

            {/* Boutons ajouter entre cellules */}
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex-1 h-px bg-gray-200" />
              <button
                onClick={() => addCell('code', cell.id)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 hover:bg-green-50 px-2 py-1 rounded-lg transition-colors"
              >
                <Plus size={11} /> Code
              </button>
              <button
                onClick={() => addCell('markdown', cell.id)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors"
              >
                <Plus size={11} /> Markdown
              </button>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {cells.length} cellule{cells.length > 1 ? 's' : ''} · {cells.filter(c => c.type === 'code').length} code · {cells.filter(c => c.type === 'markdown').length} markdown
        </span>
        <span className="text-xs text-amber-500 font-medium">● Jupyter Notebook</span>
      </div>
    </div>
  )
}