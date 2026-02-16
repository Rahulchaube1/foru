import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Search, Filter, Tag, MessageSquare, ArrowLeft, ChevronRight, Plus, Clock, User, X, ChevronDown } from 'lucide-react'
import { issues, repositories } from '../data/mockData'

function IssueRow({ issue }) {
  const isOpen = issue.state === 'open'
  return (
    <div className="flex items-start gap-3 px-5 py-4 border-b border-gray-800/50 hover:bg-gray-800/20 transition">
      {isOpen ? (
        <AlertCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
      ) : (
        <CheckCircle2 size={18} className="text-purple-400 mt-0.5 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-200 hover:text-blue-400 cursor-pointer">{issue.title}</span>
          {issue.labels.map((l, i) => (
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
          <span>#{issue.id}</span>
          <span>opened {issue.createdAt} by <span className="text-gray-400">{issue.author}</span></span>
          {issue.closedAt && <span>closed {issue.closedAt}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {issue.assignees?.length > 0 && (
          <div className="flex -space-x-1">
            {issue.assignees.map((a, i) => (
              <div key={i} className="w-5 h-5 rounded-full border border-gray-900" style={{ background: `hsl(${i * 137}, 50%, 45%)` }} title={a} />
            ))}
          </div>
        )}
        {issue.comments > 0 && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <MessageSquare size={12} /> {issue.comments}
          </span>
        )}
      </div>
    </div>
  )
}

function IssueDetail({ issue, onClose }) {
  const [comment, setComment] = useState('')
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">{issue.title} <span className="text-gray-500 font-normal">#{issue.id}</span></h2>
            <div className="flex items-center gap-2 mt-2">
              <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${issue.state === 'open' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'}`}>
                {issue.state === 'open' ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
                {issue.state === 'open' ? 'Open' : 'Closed'}
              </span>
              <span className="text-xs text-gray-500">{issue.author} opened this on {issue.createdAt}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-white transition"><X size={20} /></button>
        </div>
        <div className="p-6">
          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shrink-0" />
            <div className="flex-1 bg-gray-800/50 border border-gray-700 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-2">{issue.author} commented on {issue.createdAt}</div>
              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{issue.body}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600">{issue.comments} comments</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="flex gap-3">
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
                {issue.state === 'open' && (
                  <button className="px-4 py-2 text-sm text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-800 transition">
                    Close issue
                  </button>
                )}
                <button className="px-4 py-2 text-sm bg-green-600 hover:bg-green-500 text-white rounded-lg transition">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Issues() {
  const { owner, name } = useParams()
  const [filter, setFilter] = useState('open')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [showNewIssue, setShowNewIssue] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')

  const repo = repositories.find(r => r.fullName === `${owner}/${name}`) || repositories[3]

  const filtered = issues.filter(i =>
    (filter === 'all' || i.state === filter) &&
    (i.title.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const openCount = issues.filter(i => i.state === 'open').length
  const closedCount = issues.filter(i => i.state === 'closed').length

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to={`/repo/${repo.fullName}`} className="flex items-center gap-1 hover:text-white transition">
          <ArrowLeft size={16} /> {repo.fullName}
        </Link>
        <ChevronRight size={14} />
        <span className="text-white font-medium">Issues</span>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600 transition">
            <Filter size={14} /> Filters <ChevronDown size={12} />
          </button>
        </div>
        <button
          onClick={() => setShowNewIssue(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition"
        >
          <Plus size={16} /> New issue
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 border-b border-gray-800">
          <button
            onClick={() => setFilter('open')}
            className={`flex items-center gap-1.5 text-sm ${filter === 'open' ? 'text-white font-medium' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <AlertCircle size={14} /> {openCount} Open
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`flex items-center gap-1.5 text-sm ${filter === 'closed' ? 'text-white font-medium' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <CheckCircle2 size={14} /> {closedCount} Closed
          </button>
        </div>

        {filtered.length > 0 ? (
          filtered.map(issue => (
            <div key={issue.id} onClick={() => setSelectedIssue(issue)} className="cursor-pointer">
              <IssueRow issue={issue} />
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-gray-500">
            <AlertCircle size={32} className="mx-auto mb-3 opacity-50" />
            <p>No issues found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Issue detail modal */}
      {selectedIssue && (
        <IssueDetail issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
      )}

      {/* New issue modal */}
      {showNewIssue && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNewIssue(false)} />
          <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Issue</h2>
              <button onClick={() => setShowNewIssue(false)} className="p-1 text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <textarea
                placeholder="Leave a description..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              <div className="flex justify-end">
                <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition">
                  Submit new issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
