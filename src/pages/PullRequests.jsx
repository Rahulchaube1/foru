import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GitPullRequest, GitMerge, Search, Filter, MessageSquare, ArrowLeft, ChevronRight, Plus, Clock, User, X, ChevronDown, Check, AlertCircle, FileCode, GitBranch } from 'lucide-react'
import { pullRequests, repositories } from '../data/mockData'

function PRRow({ pr }) {
  const stateColors = {
    open: 'text-green-500',
    merged: 'text-purple-400',
    closed: 'text-red-400',
  }
  const stateIcons = {
    open: <GitPullRequest size={18} className={stateColors.open} />,
    merged: <GitMerge size={18} className={stateColors.merged} />,
    closed: <GitPullRequest size={18} className={stateColors.closed} />,
  }

  return (
    <div className="flex items-start gap-3 px-5 py-4 border-b border-gray-800/50 hover:bg-gray-800/20 transition">
      {stateIcons[pr.state]}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-200 hover:text-blue-400 cursor-pointer">{pr.title}</span>
          {pr.labels.map((l, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-xs rounded-full font-medium"
              style={{ backgroundColor: l.color + '20', color: l.color, border: `1px solid ${l.color}40` }}
            >
              {l.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <span>#{pr.id}</span>
          <span>opened {pr.createdAt} by <span className="text-gray-400">{pr.author}</span></span>
          {pr.mergedAt && <span className="text-purple-400">merged {pr.mergedAt}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {pr.status === 'review' && (
          <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">Review</span>
        )}
        {pr.status === 'changes_requested' && (
          <span className="text-xs text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded-full border border-orange-400/20">Changes</span>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="text-green-400">+{pr.additions}</span>
          <span className="text-red-400">-{pr.deletions}</span>
        </div>
        {pr.comments > 0 && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <MessageSquare size={12} /> {pr.comments}
          </span>
        )}
      </div>
    </div>
  )
}

function PRDetail({ pr, onClose }) {
  const [activeTab, setActiveTab] = useState('conversation')
  const [comment, setComment] = useState('')

  const diffLines = [
    { type: 'header', content: '@@ -15,7 +15,12 @@ export class WikiEngine {' },
    { type: 'context', content: '  private graph: KnowledgeGraph;' },
    { type: 'context', content: '  private config: RepoConfig;' },
    { type: 'remove', content: '  private cache: Map<string, ParseResult>;' },
    { type: 'add', content: '  private cache: LRUCache<string, ParseResult>;' },
    { type: 'add', content: '  private fileHashes: Map<string, string>;' },
    { type: 'add', content: '  private isDirty: boolean;' },
    { type: 'context', content: '' },
    { type: 'context', content: '  constructor(config: RepoConfig) {' },
    { type: 'context', content: '    this.config = config;' },
    { type: 'remove', content: '    this.cache = new Map();' },
    { type: 'add', content: '    this.cache = new LRUCache({ maxSize: 1000 });' },
    { type: 'add', content: '    this.fileHashes = new Map();' },
    { type: 'add', content: '    this.isDirty = false;' },
    { type: 'context', content: '  }' },
    { type: 'context', content: '' },
    { type: 'add', content: '  async incrementalUpdate(changedFiles: string[]): Promise<void> {' },
    { type: 'add', content: '    for (const file of changedFiles) {' },
    { type: 'add', content: '      const hash = await this.computeHash(file);' },
    { type: 'add', content: '      if (hash !== this.fileHashes.get(file)) {' },
    { type: 'add', content: '        await this.reparseFile(file);' },
    { type: 'add', content: '        this.fileHashes.set(file, hash);' },
    { type: 'add', content: '      }' },
    { type: 'add', content: '    }' },
    { type: 'add', content: '    this.graph.rebuildEdges();' },
    { type: 'add', content: '  }' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{pr.title} <span className="text-gray-500 font-normal">#{pr.id}</span></h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                  pr.state === 'open' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  pr.state === 'merged' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                  'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {pr.state === 'merged' ? <GitMerge size={12} /> : <GitPullRequest size={12} />}
                  {pr.state.charAt(0).toUpperCase() + pr.state.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  <span className="text-gray-400">{pr.author}</span> wants to merge into <code className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">main</code> from <code className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">{pr.branch}</code>
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-white"><X size={20} /></button>
          </div>

          <div className="flex items-center gap-1 mt-4 border-b border-gray-800 -mb-px">
            {['conversation', 'files'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm capitalize ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}
              >
                {tab}
                {tab === 'files' && <span className="ml-1.5 text-xs bg-gray-800 px-1.5 py-0.5 rounded-full">{pr.files}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'conversation' ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shrink-0" />
                <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-2">{pr.author} commented on {pr.createdAt}</div>
                  <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{pr.body}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 py-3 text-sm">
                <span className="flex items-center gap-1.5 text-green-400"><span className="font-semibold">+{pr.additions}</span> additions</span>
                <span className="flex items-center gap-1.5 text-red-400"><span className="font-semibold">-{pr.deletions}</span> deletions</span>
                <span className="flex items-center gap-1.5 text-gray-400"><FileCode size={14} /> {pr.files} files changed</span>
              </div>

              {/* Comment */}
              <div className="flex gap-3 mt-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-cyan-600 shrink-0" />
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button className="px-4 py-2 text-sm bg-green-600 hover:bg-green-500 text-white rounded-lg transition">Comment</button>
                    {pr.state === 'open' && (
                      <button className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition flex items-center gap-1.5">
                        <GitMerge size={14} /> Merge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {pr.diff?.map((file, fi) => (
                <div key={fi} className="border border-gray-800 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800/50 border-b border-gray-800">
                    <span className="text-sm text-gray-300 font-mono flex items-center gap-2">
                      <FileCode size={14} className="text-gray-500" /> {file.file}
                    </span>
                    <span className="text-xs text-gray-500">
                      <span className="text-green-400">+{file.additions}</span> / <span className="text-red-400">-{file.deletions}</span>
                    </span>
                  </div>
                  {fi === 0 && (
                    <div className="font-mono text-xs overflow-x-auto">
                      {diffLines.map((line, li) => (
                        <div
                          key={li}
                          className={`px-4 py-0.5 leading-5 ${
                            line.type === 'add' ? 'diff-add' :
                            line.type === 'remove' ? 'diff-remove' :
                            line.type === 'header' ? 'bg-blue-500/5 text-blue-400' :
                            'diff-context text-gray-400'
                          }`}
                        >
                          <span className="select-none text-gray-600 mr-3">
                            {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : line.type === 'header' ? '@@' : ' '}
                          </span>
                          <span className={
                            line.type === 'add' ? 'text-green-300' :
                            line.type === 'remove' ? 'text-red-300' :
                            ''
                          }>{line.content}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PullRequests() {
  const { owner, name } = useParams()
  const [filter, setFilter] = useState('open')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPR, setSelectedPR] = useState(null)

  const repo = repositories.find(r => r.fullName === `${owner}/${name}`) || repositories[3]

  const filtered = pullRequests.filter(pr =>
    (filter === 'all' || pr.state === filter) &&
    pr.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openCount = pullRequests.filter(p => p.state === 'open').length
  const mergedCount = pullRequests.filter(p => p.state === 'merged').length

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to={`/repo/${repo.fullName}`} className="flex items-center gap-1 hover:text-white transition">
          <ArrowLeft size={16} /> {repo.fullName}
        </Link>
        <ChevronRight size={14} />
        <span className="text-white font-medium">Pull Requests</span>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search pull requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition">
          <Plus size={16} /> New pull request
        </button>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 border-b border-gray-800">
          <button
            onClick={() => setFilter('open')}
            className={`flex items-center gap-1.5 text-sm ${filter === 'open' ? 'text-white font-medium' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <GitPullRequest size={14} /> {openCount} Open
          </button>
          <button
            onClick={() => setFilter('merged')}
            className={`flex items-center gap-1.5 text-sm ${filter === 'merged' ? 'text-white font-medium' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <GitMerge size={14} /> {mergedCount} Merged
          </button>
        </div>

        {filtered.length > 0 ? (
          filtered.map(pr => (
            <div key={pr.id} onClick={() => setSelectedPR(pr)} className="cursor-pointer">
              <PRRow pr={pr} />
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">
            <GitPullRequest size={32} className="mx-auto mb-3 opacity-50" />
            <p>No pull requests found.</p>
          </div>
        )}
      </div>

      {selectedPR && <PRDetail pr={selectedPR} onClose={() => setSelectedPR(null)} />}
    </div>
  )
}
