import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BookOpen, Search, ChevronRight, MessageSquare, Share2, FileCode, Settings, Cpu, Clock, ArrowLeft, Send, Bot, User, Sparkles, GitBranch, Copy, Check, X, Menu, Maximize2, Minimize2 } from 'lucide-react'
import { wikiPages, chatMessages as initialChats, repositories } from '../data/mockData'

function MermaidDiagram() {
  const nodes = [
    { id: 'engine', label: 'WikiEngine', x: 300, y: 50, color: '#3b82f6', w: 140 },
    { id: 'parser', label: 'AST Parser', x: 100, y: 180, color: '#8b5cf6', w: 120 },
    { id: 'graph', label: 'KnowledgeGraph', x: 300, y: 180, color: '#06b6d4', w: 150 },
    { id: 'gen', label: 'Wiki Generator', x: 500, y: 180, color: '#10b981', w: 140 },
    { id: 'ts', label: 'Tree-sitter', x: 30, y: 310, color: '#6366f1', w: 120 },
    { id: 'lang', label: 'Language Plugins', x: 180, y: 310, color: '#6366f1', w: 140 },
    { id: 'nodes', label: 'Node Store', x: 250, y: 310, color: '#0891b2', w: 110 },
    { id: 'edges', label: 'Edge Store', x: 380, y: 310, color: '#0891b2', w: 110 },
    { id: 'md', label: 'Markdown Renderer', x: 440, y: 310, color: '#059669', w: 155 },
    { id: 'diag', label: 'Diagram Generator', x: 600, y: 310, color: '#059669', w: 155 },
  ]
  const edges = [
    ['engine', 'parser'], ['engine', 'graph'], ['engine', 'gen'],
    ['parser', 'ts'], ['parser', 'lang'],
    ['graph', 'nodes'], ['graph', 'edges'],
    ['gen', 'md'], ['gen', 'diag'],
  ]

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 my-6">
      <h3 className="text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
        <Share2 size={16} className="text-blue-400" /> Architecture Diagram
      </h3>
      <div className="overflow-x-auto">
        <svg viewBox="0 0 760 380" className="w-full max-w-3xl mx-auto" style={{ minWidth: '600px' }}>
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
            </marker>
          </defs>
          {edges.map(([from, to], i) => {
            const f = nodeMap[from], t = nodeMap[to]
            return (
              <line
                key={i}
                x1={f.x + f.w / 2} y1={f.y + 35}
                x2={t.x + t.w / 2} y2={t.y}
                stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow)"
              />
            )
          })}
          {nodes.map(n => (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={n.w} height={35} rx={8} fill={n.color} opacity={0.15} stroke={n.color} strokeWidth={1.5} />
              <text x={n.x + n.w / 2} y={n.y + 22} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontFamily="Inter, sans-serif" fontWeight={500}>
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

function MarkdownRenderer({ content }) {
  const renderMarkdown = (md) => {
    let html = md
      .replace(/^### (.*$)/gm, '<h3 class="text-base font-semibold text-white mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold text-white mt-8 mb-3">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-white mt-4 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-gray-800 text-blue-300 rounded text-xs font-mono">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) =>
        `<div class="my-4 rounded-lg overflow-hidden border border-gray-800"><div class="px-4 py-2 bg-gray-900/80 text-xs text-gray-500 border-b border-gray-800">${lang || 'code'}</div><pre class="p-4 bg-gray-950 overflow-x-auto"><code class="text-sm font-mono text-gray-300">${code.trim()}</code></pre></div>`
      )
      .replace(/^\| (.+) \|$/gm, (match) => {
        const cells = match.split('|').filter(c => c.trim())
        if (cells.some(c => /^[\s-:]+$/.test(c))) return ''
        return `<tr>${cells.map(c => `<td class="px-4 py-2 border-b border-gray-800 text-sm text-gray-300">${c.trim()}</td>`).join('')}</tr>`
      })
      .replace(/^- (.*$)/gm, '<li class="text-gray-400 text-sm ml-4 py-0.5">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="text-gray-400 text-sm ml-4 py-0.5 list-decimal">$1</li>')
      .replace(/\n\n/g, '<br/>')

    return html
  }

  return (
    <div className="prose-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
  )
}

export default function Wiki() {
  const { owner, name } = useParams()
  const [activePage, setActivePage] = useState('overview')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatMsgs, setChatMsgs] = useState(initialChats)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const repo = repositories.find(r => r.fullName === `${owner}/${name}`) || repositories[3]
  const currentPage = wikiPages.find(p => p.id === activePage) || wikiPages[0]

  const iconMap = { BookOpen, Cpu, Share2, FileCode, Settings }

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const userMsg = { id: chatMsgs.length + 1, role: 'user', content: chatInput }
    setChatMsgs(prev => [...prev, userMsg])
    setChatInput('')
    setTimeout(() => {
      const aiMsg = {
        id: chatMsgs.length + 2,
        role: 'assistant',
        content: `Based on the codebase analysis, here's what I found:\n\nThe ${chatInput.toLowerCase().includes('how') ? 'implementation' : 'feature'} you're asking about is handled in the core module. The main entry point is the \`WikiEngine\` class which orchestrates the parsing and generation pipeline.\n\nKey files:\n- \`src/utils/parser.ts\` - AST parsing logic\n- \`src/utils/graph.ts\` - Knowledge graph construction\n- \`src/components/App.tsx\` - Main application component\n\nWould you like me to dive deeper into any of these components?`
      }
      setChatMsgs(prev => [...prev, aiMsg])
    }, 1500)
  }

  const filteredPages = wikiPages.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to={`/repo/${repo.fullName}`} className="flex items-center gap-1 hover:text-white transition">
          <ArrowLeft size={16} /> {repo.fullName}
        </Link>
        <ChevronRight size={14} />
        <span className="text-white font-medium flex items-center gap-1.5"><BookOpen size={14} /> Wiki</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Sparkles size={24} className="text-blue-400" />
            AI-Generated Documentation
          </h1>
          <p className="text-sm text-gray-500 mt-1">Auto-updated &middot; Last synced 2 hours ago</p>
        </div>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition"
        >
          <MessageSquare size={16} /> Ask AI
        </button>
      </div>

      <div className="flex gap-6 relative">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden`}>
          <div className="sticky top-24 w-64">
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
            <nav className="space-y-0.5">
              {filteredPages.map(page => {
                const Icon = iconMap[page.icon] || BookOpen
                return (
                  <button
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                      activePage === page.id
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="truncate">{page.title}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl">
            {/* Page header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 text-gray-500 hover:text-white rounded transition lg:hidden">
                  <Menu size={18} />
                </button>
                <h2 className="text-lg font-semibold text-white">{currentPage.title}</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock size={12} /> Updated {currentPage.lastUpdated}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <MarkdownRenderer content={currentPage.content} />

              {/* Show diagram on overview page */}
              {activePage === 'overview' && <MermaidDiagram />}

              {/* Show diagram on knowledge graph page */}
              {activePage === 'knowledge-graph' && <MermaidDiagram />}
            </div>
          </div>
        </div>

        {/* Chat panel */}
        {chatOpen && (
          <div className="w-96 shrink-0">
            <div className="sticky top-24 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-blue-400" />
                  <span className="font-medium text-sm">AI Assistant</span>
                  <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Online</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="p-1 text-gray-500 hover:text-white rounded transition">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center py-4">
                  <Bot size={32} className="mx-auto text-blue-400 mb-2" />
                  <p className="text-sm text-gray-400">I have full context of <span className="text-white font-medium">{repo.fullName}</span>.</p>
                  <p className="text-xs text-gray-500 mt-1">Ask me anything about the codebase.</p>
                </div>
                {chatMsgs.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
                        <Bot size={14} className="text-blue-400" />
                      </div>
                    )}
                    <div className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300'
                    }`}>
                      {msg.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? 'mt-1.5' : ''}>{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-3 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about the code..."
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50"
                    disabled={!chatInput.trim()}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
