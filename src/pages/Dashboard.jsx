import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, GitFork, Star, Plus, Search, Filter, Clock, TrendingUp, Activity, Code2, Cloud, FileCode, ChevronRight, GitPullRequest, AlertCircle, GitCommit, Tag, MessageSquare, Eye } from 'lucide-react'
import { repositories, activityFeed, contributionData, currentUser, formatNumber } from '../data/mockData'

function ContributionGraph() {
  const weeks = []
  for (let i = 0; i < 52; i++) {
    weeks.push(contributionData.slice(i * 7, (i + 1) * 7))
  }
  const colors = ['bg-gray-800', 'bg-green-900/60', 'bg-green-700/70', 'bg-green-500/80', 'bg-green-400']
  const totalContributions = contributionData.reduce((s, d) => s + d.count, 0)

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">{totalContributions} contributions in the last year</h3>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`w-[11px] h-[11px] rounded-sm ${colors[day.level]} contribution-cell`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 justify-end text-xs text-gray-500">
        Less
        {colors.map((c, i) => (
          <div key={i} className={`w-[11px] h-[11px] rounded-sm ${c}`} />
        ))}
        More
      </div>
    </div>
  )
}

function ActivityItem({ item }) {
  const icons = {
    push: <GitCommit size={16} className="text-green-400" />,
    star: <Star size={16} className="text-yellow-400" />,
    pr: <GitPullRequest size={16} className="text-purple-400" />,
    issue: <AlertCircle size={16} className="text-orange-400" />,
    fork: <GitFork size={16} className="text-blue-400" />,
    release: <Tag size={16} className="text-cyan-400" />,
    comment: <MessageSquare size={16} className="text-gray-400" />,
  }
  const msgs = {
    push: <><span className="text-white font-medium">{item.user}</span> pushed {item.commits} commit{item.commits > 1 ? 's' : ''} to <Link to={`/repo/${item.repo.split('/').length > 1 ? item.repo : `codebook-user/${item.repo}`}`} className="text-blue-400 hover:underline">{item.repo}</Link>{item.branch && <span className="text-gray-500">:{item.branch}</span>}</>,
    star: <><span className="text-white font-medium">{item.user}</span> starred <Link to={`/repo/codebook-user/${item.repo}`} className="text-blue-400 hover:underline">{item.repo}</Link></>,
    pr: <><span className="text-white font-medium">{item.user}</span> {item.action} PR <span className="text-blue-400">{item.prTitle}</span> in <Link to={`/repo/codebook-user/${item.repo}`} className="text-blue-400 hover:underline">{item.repo}</Link></>,
    issue: <><span className="text-white font-medium">{item.user}</span> {item.action} issue <span className="text-orange-400">{item.issueTitle}</span> in <Link to={`/repo/codebook-user/${item.repo}`} className="text-blue-400 hover:underline">{item.repo}</Link></>,
    fork: <><span className="text-white font-medium">{item.user}</span> forked <Link to={`/repo/codebook-user/${item.repo}`} className="text-blue-400 hover:underline">{item.repo}</Link></>,
    release: <><span className="text-white font-medium">{item.user}</span> released <span className="text-cyan-400">{item.tag}</span> in <Link to={`/repo/codebook-user/${item.repo}`} className="text-blue-400 hover:underline">{item.repo}</Link></>,
    comment: <><span className="text-white font-medium">{item.user}</span> commented on <span className="text-gray-300">{item.issueTitle}</span> in <Link to={`/repo/codebook-user/${item.repo}`} className="text-blue-400 hover:underline">{item.repo}</Link></>,
  }

  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-800/50 last:border-0">
      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 mt-0.5">{icons[item.type]}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 leading-relaxed">{msgs[item.type]}</p>
        {item.message && <p className="text-xs text-gray-500 mt-1 font-mono truncate">{item.message}</p>}
        <p className="text-xs text-gray-600 mt-1">{item.time}</p>
      </div>
    </div>
  )
}

function RepoCard({ repo }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition group">
      <div className="flex items-start justify-between mb-2">
        <Link to={`/repo/${repo.fullName}`} className="text-blue-400 hover:underline font-semibold text-sm group-hover:text-blue-300 truncate">
          {repo.owner !== currentUser.username && <span className="text-gray-500">{repo.owner}/</span>}
          {repo.name}
        </Link>
        {repo.isPrivate && (
          <span className="text-xs border border-gray-700 text-gray-400 rounded-full px-2 py-0.5 shrink-0 ml-2">Private</span>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{repo.description}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1"><Star size={12} /> {formatNumber(repo.stars)}</span>
        <span className="flex items-center gap-1"><GitFork size={12} /> {formatNumber(repo.forks)}</span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [repoFilter, setRepoFilter] = useState('')
  const [repoSort, setRepoSort] = useState('updated')
  const userRepos = repositories.filter(r => r.owner === currentUser.username || r.owner === 'codebook-user')
  const filteredRepos = userRepos.filter(r =>
    r.name.toLowerCase().includes(repoFilter.toLowerCase()) ||
    r.description.toLowerCase().includes(repoFilter.toLowerCase())
  )

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left sidebar - Profile summary */}
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{currentUser.name}</h2>
                <p className="text-sm text-gray-500">{currentUser.username}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">{currentUser.bio}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span><span className="text-white font-semibold">{currentUser.followers}</span> followers</span>
              <span><span className="text-white font-semibold">{currentUser.following}</span> following</span>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: BookOpen, label: 'Repos', value: currentUser.repositories, color: 'blue' },
                { icon: Star, label: 'Stars', value: currentUser.stars, color: 'yellow' },
                { icon: Cloud, label: 'Storage', value: `${currentUser.storage.used} GB`, color: 'cyan' },
                { icon: FileCode, label: 'Snippets', value: 12, color: 'purple' },
              ].map((s, i) => (
                <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 text-center">
                  <s.icon size={16} className={`mx-auto mb-1 text-${s.color}-400`} />
                  <div className="text-sm font-semibold text-white">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="space-y-1">
              {[
                { icon: BookOpen, label: 'Your repositories', to: '/profile' },
                { icon: Cloud, label: 'Cloud storage', to: '/storage', badge: 'Unlimited' },
                { icon: Code2, label: 'Code snippets', to: '/snippets' },
                { icon: TrendingUp, label: 'Explore trending', to: '/explore' },
              ].map((link, i) => (
                <Link key={i} to={link.to} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition">
                  <span className="flex items-center gap-2.5"><link.icon size={16} /> {link.label}</span>
                  {link.badge && <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">{link.badge}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-9">
          {/* Contribution graph */}
          <ContributionGraph />

          {/* Repositories */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Repositories</h2>
              <Link to="/new" className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition">
                <Plus size={16} /> New
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Find a repository..."
                  value={repoFilter}
                  onChange={(e) => setRepoFilter(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <select
                value={repoSort}
                onChange={(e) => setRepoSort(e.target.value)}
                className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="updated">Last updated</option>
                <option value="name">Name</option>
                <option value="stars">Stars</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredRepos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity size={20} /> Recent Activity
            </h2>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
              {activityFeed.map(item => (
                <ActivityItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
