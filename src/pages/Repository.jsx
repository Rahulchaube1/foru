import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Star, GitFork, Eye, Code2, BookOpen, AlertCircle, GitPullRequest, Play, Settings, Shield, ChevronRight, ChevronDown, File, Folder, Clock, Copy, Download, Share2, GitBranch, Tag, Users, MessageSquare, ExternalLink, Check } from 'lucide-react'
import { repositories, fileTree, sampleCode, formatNumber, timeAgo } from '../data/mockData'

function FileTreeItem({ node, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1)
  const isDir = node.type === 'dir'

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-1.5 hover:bg-gray-800/50 cursor-pointer text-sm border-b border-gray-800/30 ${isDir ? 'text-gray-300' : 'text-blue-400 hover:text-blue-300'}`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
        onClick={() => isDir && setOpen(!open)}
      >
        {isDir ? (
          <>
            <ChevronRight size={14} className={`text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`} />
            <Folder size={16} className="text-blue-400/70" />
          </>
        ) : (
          <>
            <span className="w-3.5" />
            <File size={16} className="text-gray-500" />
          </>
        )}
        <span className="truncate">{node.name}</span>
        {!isDir && <span className="ml-auto text-xs text-gray-600">{node.size}</span>}
      </div>
      {isDir && open && node.children?.map((child, i) => (
        <FileTreeItem key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

function CodeViewer({ code }) {
  const [copied, setCopied] = useState(false)
  const lines = code.split('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightLine = (line) => {
    return line
      .replace(/\/\/.*/g, '<span class="text-gray-500">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500">$&</span>')
      .replace(/(import|export|from|const|let|var|async|await|function|class|new|return|if|else|for|throw|private|this|typeof|void)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/(string|number|boolean|void|any|null|undefined|Promise|Map|Symbol)\b/g, '<span class="text-cyan-400">$1</span>')
      .replace(/('.*?'|`.*?`|".*?")/g, '<span class="text-green-400">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>')
      .replace(/\.([\w]+)\(/g, '.<span class="text-yellow-300">$1</span>(')
  }

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-md transition">
          {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className="hover:bg-blue-500/5">
                <td className="px-4 py-0 text-right text-xs text-gray-600 select-none w-12 font-mono align-top leading-6">{i + 1}</td>
                <td className="px-4 py-0 font-mono text-sm leading-6 whitespace-pre">
                  <span dangerouslySetInnerHTML={{ __html: highlightLine(line) || '&nbsp;' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Repository() {
  const { owner, name } = useParams()
  const [activeTab, setActiveTab] = useState('code')
  const [starred, setStarred] = useState(false)

  const repo = repositories.find(r => r.fullName === `${owner}/${name}`) || repositories.find(r => r.name === name) || repositories[3]

  const tabs = [
    { id: 'code', label: 'Code', icon: Code2, count: null },
    { id: 'issues', label: 'Issues', icon: AlertCircle, count: repo.issues },
    { id: 'prs', label: 'Pull requests', icon: GitPullRequest, count: repo.pullRequests },
    { id: 'wiki', label: 'Wiki', icon: BookOpen, count: null },
    { id: 'actions', label: 'Actions', icon: Play, count: null },
    { id: 'security', label: 'Security', icon: Shield, count: null },
    { id: 'settings', label: 'Settings', icon: Settings, count: null },
  ]

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Repo header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xl">
            <BookOpen size={20} className="text-gray-500" />
            <Link to={`/profile/${repo.owner}`} className="text-blue-400 hover:underline">{repo.owner}</Link>
            <span className="text-gray-600">/</span>
            <Link to={`/repo/${repo.fullName}`} className="text-blue-400 hover:underline font-semibold">{repo.name}</Link>
            <span className="text-xs border border-gray-700 text-gray-400 rounded-full px-2 py-0.5 ml-1">
              {repo.isPrivate ? 'Private' : 'Public'}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{repo.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-gray-700 overflow-hidden">
            <button
              onClick={() => setStarred(!starred)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition ${starred ? 'bg-yellow-500/10 text-yellow-400' : 'bg-gray-900 text-gray-300 hover:bg-gray-800'}`}
            >
              <Star size={14} fill={starred ? 'currentColor' : 'none'} /> {starred ? 'Starred' : 'Star'}
            </button>
            <span className="px-3 py-1.5 text-sm bg-gray-900 border-l border-gray-700 text-gray-400">{formatNumber(repo.stars + (starred ? 1 : 0))}</span>
          </div>
          <div className="flex items-center rounded-lg border border-gray-700 overflow-hidden">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-900 text-gray-300 hover:bg-gray-800 transition">
              <GitFork size={14} /> Fork
            </button>
            <span className="px-3 py-1.5 text-sm bg-gray-900 border-l border-gray-700 text-gray-400">{formatNumber(repo.forks)}</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-900 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition">
            <Eye size={14} /> Watch
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-800 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              if (tab.id === 'wiki') window.location.href = `/repo/${repo.fullName}/wiki`
              if (tab.id === 'issues') window.location.href = `/repo/${repo.fullName}/issues`
              if (tab.id === 'prs') window.location.href = `/repo/${repo.fullName}/pulls`
            }}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm whitespace-nowrap transition ${activeTab === tab.id ? 'tab-active font-medium' : 'tab-inactive'}`}
          >
            <tab.icon size={16} />
            {tab.label}
            {tab.count != null && (
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-gray-800 text-gray-400">{formatNumber(tab.count)}</span>
            )}
          </button>
        ))}
      </div>

      {/* Code view */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main content */}
        <div className="lg:col-span-9">
          {/* Branch selector + actions */}
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600 transition">
                <GitBranch size={14} /> {repo.defaultBranch} <ChevronDown size={12} />
              </button>
              <span className="text-sm text-gray-500 flex items-center gap-1"><GitBranch size={14} /> 12 branches</span>
              <span className="text-sm text-gray-500 flex items-center gap-1"><Tag size={14} /> 48 tags</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition">
                <Code2 size={14} /> Code <ChevronDown size={12} />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-gray-600 transition">
                <Download size={14} />
              </button>
            </div>
          </div>

          {/* Latest commit */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-t-xl text-sm">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shrink-0" />
              <span className="text-gray-300 font-medium truncate">alex-dev</span>
              <span className="text-gray-500 truncate hidden sm:inline">Improve error handling in AST parser</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 text-gray-500">
              <span className="font-mono text-xs">a1b2c3d</span>
              <span className="text-xs">2 hours ago</span>
            </div>
          </div>

          {/* File tree */}
          <div className="border border-t-0 border-gray-800 rounded-b-xl overflow-hidden mb-6">
            {fileTree.map((node, i) => (
              <FileTreeItem key={i} node={node} />
            ))}
          </div>

          {/* README */}
          <div className="border border-gray-800 rounded-xl overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/50 border-b border-gray-800 text-sm">
              <BookOpen size={16} className="text-gray-500" />
              <span className="font-medium text-gray-300">README.md</span>
            </div>
            <div className="p-6 prose prose-invert prose-sm max-w-none">
              <h1 className="text-2xl font-bold text-white mb-4">{repo.name}</h1>
              <p className="text-gray-400 mb-4">{repo.description}</p>
              <h2 className="text-lg font-semibold text-white mb-3">Quick Start</h2>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 mb-4">
                <div>npm install @codebook/core</div>
              </div>
              <h2 className="text-lg font-semibold text-white mb-3">Usage</h2>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <CodeViewer code={sampleCode.split('\n').slice(0, 15).join('\n')} />
              </div>
              <h2 className="text-lg font-semibold text-white mt-6 mb-3">Features</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>AI-powered code understanding and documentation</li>
                <li>Interactive knowledge graphs</li>
                <li>Auto-generated architecture diagrams</li>
                <li>Multi-language support (TypeScript, Python, Go, Rust, Java)</li>
                <li>Incremental parsing for large codebases</li>
              </ul>
              <h2 className="text-lg font-semibold text-white mt-6 mb-3">License</h2>
              <p className="text-gray-400">{repo.license}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* About */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">About</h3>
              <p className="text-sm text-gray-400 mb-3">{repo.description}</p>
              <div className="space-y-2 text-sm">
                {repo.license && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Shield size={14} /> {repo.license} license
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-400">
                  <Star size={14} /> {formatNumber(repo.stars)} stars
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye size={14} /> {formatNumber(repo.watchers)} watching
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <GitFork size={14} /> {formatNumber(repo.forks)} forks
                </div>
              </div>
            </div>

            {/* Wiki link */}
            <div>
              <Link
                to={`/repo/${repo.fullName}/wiki`}
                className="flex items-center justify-between p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl text-sm hover:bg-blue-600/15 transition group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-blue-400" />
                  <div>
                    <div className="font-medium text-blue-300">AI-Generated Wiki</div>
                    <div className="text-xs text-gray-500">Auto-updated documentation</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Topics */}
            {repo.topics?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full hover:bg-blue-500/20 cursor-pointer transition">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contributors */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                <Users size={14} /> Contributors <span className="text-gray-500 font-normal">{repo.contributors}</span>
              </h3>
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: Math.min(12, repo.contributors) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-600/50 border-2 border-gray-900"
                    style={{ background: `hsl(${i * 37}, 60%, 40%)` }}
                  />
                ))}
                {repo.contributors > 12 && (
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs text-gray-400">
                    +{repo.contributors - 12}
                  </div>
                )}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Languages</h3>
              <div className="w-full h-2 rounded-full overflow-hidden flex mb-2">
                <div className="bg-blue-500" style={{ width: '55%' }} />
                <div className="bg-yellow-500" style={{ width: '25%' }} />
                <div className="bg-green-500" style={{ width: '12%' }} />
                <div className="bg-purple-500" style={{ width: '8%' }} />
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> TypeScript 55%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> JavaScript 25%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> CSS 12%</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Other 8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
