import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, TrendingUp, Star, GitFork, Compass, Filter, ChevronDown, Flame, Clock, Globe, Code2, BookOpen } from 'lucide-react'
import { repositories, trendingRepos, formatNumber } from '../data/mockData'

export default function Explore() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [activeTab, setActiveTab] = useState('trending')
  const [language, setLanguage] = useState('all')
  const [timeRange, setTimeRange] = useState('today')

  const allRepos = [...repositories, ...trendingRepos.map((r, i) => ({
    id: `t${i}`,
    name: r.name.split('/')[1],
    owner: r.name.split('/')[0],
    fullName: r.name,
    description: r.description,
    language: r.language,
    languageColor: r.languageColor,
    stars: r.stars,
    forks: 0,
    todayStars: r.todayStars,
  }))]

  const filtered = searchQuery
    ? allRepos.filter(r =>
        r.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allRepos

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3">
          <Compass size={32} className="text-blue-400" /> Explore
        </h1>
        <p className="text-gray-400 max-w-lg mx-auto mb-6">
          Discover repositories, trending projects, and connect with the developer community.
        </p>
        <div className="max-w-xl mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search repositories, topics, languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-800 mb-6">
        {[
          { id: 'trending', label: 'Trending', icon: Flame },
          { id: 'repositories', label: 'Repositories', icon: BookOpen },
          { id: 'topics', label: 'Topics', icon: Globe },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm transition ${activeTab === tab.id ? 'tab-active font-medium' : 'tab-inactive'}`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Languages</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Python">Python</option>
          <option value="Rust">Rust</option>
          <option value="Go">Go</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
        </select>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="today">Today</option>
          <option value="week">This week</option>
          <option value="month">This month</option>
        </select>
      </div>

      {/* Trending repos */}
      {activeTab === 'trending' && (
        <div className="space-y-3">
          {trendingRepos.map((repo, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-gray-500">{i + 1}</span>
                    <Link
                      to={`/repo/${repo.name}`}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      {repo.name}
                    </Link>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1"><Star size={14} /> {formatNumber(repo.stars)}</span>
                    <span className="flex items-center gap-1 text-yellow-400">
                      <TrendingUp size={14} /> {repo.todayStars} stars today
                    </span>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition shrink-0">
                  <Star size={14} /> Star
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All repositories */}
      {activeTab === 'repositories' && (
        <div className="space-y-3">
          {filtered.filter(r => r.fullName).map((repo, i) => (
            <div key={repo.id || i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <Link to={`/repo/${repo.fullName}`} className="text-blue-400 hover:underline font-semibold">
                    {repo.fullName}
                  </Link>
                  <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1"><Star size={14} /> {formatNumber(repo.stars)}</span>
                    {repo.forks > 0 && <span className="flex items-center gap-1"><GitFork size={14} /> {formatNumber(repo.forks)}</span>}
                  </div>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition shrink-0">
                  <Star size={14} /> Star
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Topics */}
      {activeTab === 'topics' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'machine-learning', desc: 'ML and AI tools, frameworks, and research', repos: 45200 },
            { name: 'web-development', desc: 'Frontend and backend web technologies', repos: 89400 },
            { name: 'react', desc: 'React.js ecosystem and components', repos: 34600 },
            { name: 'typescript', desc: 'TypeScript language and tooling', repos: 28900 },
            { name: 'rust', desc: 'Rust programming language projects', repos: 15800 },
            { name: 'devops', desc: 'CI/CD, containers, and infrastructure', repos: 22100 },
            { name: 'api', desc: 'REST, GraphQL, and API tooling', repos: 19300 },
            { name: 'security', desc: 'Security tools and best practices', repos: 12700 },
            { name: 'data-science', desc: 'Data analysis and visualization', repos: 31200 },
          ].map((topic, i) => (
            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 cursor-pointer transition">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 text-sm bg-blue-500/10 text-blue-400 rounded-full font-medium">#{topic.name}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{topic.desc}</p>
              <p className="text-xs text-gray-500">{formatNumber(topic.repos)} repositories</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
