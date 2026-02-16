import { useState } from 'react'
import { Code2, Plus, Search, Star, GitFork, Globe, Lock, Clock, Copy, Check, X, ChevronDown, Trash2, Edit3 } from 'lucide-react'
import { snippets } from '../data/mockData'

const languageColors = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5', Go: '#00ADD8',
  Rust: '#dea584', Java: '#b07219', Ruby: '#701516', PHP: '#4F5D95',
}

function SnippetCard({ snippet }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.files[0].content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition">
      <div className="px-5 py-4 border-b border-gray-800/50">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">{snippet.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{snippet.description}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${snippet.isPublic ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-gray-400 bg-gray-800 border-gray-700'}`}>
              {snippet.isPublic ? <Globe size={10} className="inline mr-1" /> : <Lock size={10} className="inline mr-1" />}
              {snippet.isPublic ? 'Public' : 'Secret'}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <button onClick={handleCopy} className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded transition">
            {copied ? <><Check size={10} /> Copied</> : <><Copy size={10} /> Copy</>}
          </button>
        </div>
        <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto max-h-48 bg-gray-950/50">
          <code>{snippet.files[0].content}</code>
        </pre>
      </div>

      <div className="px-5 py-3 border-t border-gray-800/50 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: languageColors[snippet.language] || '#666' }} />
            {snippet.language}
          </span>
          <span className="flex items-center gap-1"><Star size={11} /> {snippet.stars}</span>
          <span className="flex items-center gap-1"><GitFork size={11} /> {snippet.forks}</span>
        </div>
        <span className="flex items-center gap-1"><Clock size={11} /> {snippet.updatedAt}</span>
      </div>
    </div>
  )
}

export default function Snippets() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newCode, setNewCode] = useState('')
  const [newLang, setNewLang] = useState('JavaScript')
  const [newPublic, setNewPublic] = useState(true)
  const [filter, setFilter] = useState('all')

  const filtered = snippets.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.language.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Code2 size={28} className="text-purple-400" /> Code Snippets
          </h1>
          <p className="text-sm text-gray-500 mt-1">Create and share code snippets with syntax highlighting</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition"
        >
          <Plus size={16} /> New Snippet
        </button>
      </div>

      {/* Search and filter */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-1 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
          {['all', 'public', 'secret'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 text-xs capitalize ${filter === f ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Snippet list */}
      <div className="space-y-4">
        {filtered.map(snippet => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <Code2 size={48} className="mx-auto mb-4 opacity-30" />
          <p>No snippets found. Create your first one!</p>
        </div>
      )}

      {/* New snippet modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNew(false)} />
          <div className="relative w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-gray-900 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Snippet</h2>
              <button onClick={() => setShowNew(false)} className="p-1 text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Snippet title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="col-span-2 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <select
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500"
                >
                  {['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust', 'Java', 'Ruby', 'PHP', 'C++', 'Shell'].map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div className="border border-gray-700 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
                  <span className="text-xs text-gray-500">snippet.{newLang.toLowerCase().replace('++', 'pp')}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setNewPublic(!newPublic)}
                      className={`flex items-center gap-1 px-2 py-0.5 text-xs rounded-full transition ${newPublic ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-700'}`}
                    >
                      {newPublic ? <><Globe size={10} /> Public</> : <><Lock size={10} /> Secret</>}
                    </button>
                  </div>
                </div>
                <textarea
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Paste your code here..."
                  rows={12}
                  className="w-full px-4 py-3 bg-gray-950/50 text-sm font-mono text-gray-200 placeholder-gray-600 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNew(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition">Cancel</button>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition">
                  Create Snippet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
