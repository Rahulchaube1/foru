import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Building, Globe, Calendar, BookOpen, Star, GitFork, Users, Mail, Code2, Cloud, Edit3, ExternalLink } from 'lucide-react'
import { currentUser, repositories, contributionData, snippets, formatNumber } from '../data/mockData'

function ContributionGraph() {
  const weeks = []
  for (let i = 0; i < 52; i++) {
    weeks.push(contributionData.slice(i * 7, (i + 1) * 7))
  }
  const colors = ['bg-gray-800', 'bg-green-900/60', 'bg-green-700/70', 'bg-green-500/80', 'bg-green-400']
  const totalContributions = contributionData.reduce((s, d) => s + d.count, 0)

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
      <h3 className="text-sm font-medium text-gray-300 mb-4">{totalContributions} contributions in the last year</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div key={di} className={`w-[11px] h-[11px] rounded-sm ${colors[day.level]} contribution-cell`} title={`${day.count} contributions on ${day.date}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('repositories')
  const userRepos = repositories.filter(r => r.owner === currentUser.username || r.owner === 'codebook-user')

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Profile sidebar */}
        <div className="lg:col-span-3">
          <div className="sticky top-24">
            <div className="w-64 h-64 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center text-7xl font-bold text-white shadow-2xl mb-6 relative">
              {currentUser.name.charAt(0)}
              <div className="absolute bottom-4 right-4 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-950" />
            </div>

            <h1 className="text-2xl font-bold text-white">{currentUser.name}</h1>
            <p className="text-lg text-gray-500 mb-3">{currentUser.username}</p>

            <p className="text-sm text-gray-400 mb-4">{currentUser.bio}</p>

            <button className="w-full py-2 px-4 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition flex items-center justify-center gap-2 mb-4">
              <Edit3 size={14} /> Edit profile
            </button>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span><Users size={14} className="inline mr-1" /><span className="text-white font-semibold">{currentUser.followers}</span> followers</span>
              <span>&middot;</span>
              <span><span className="text-white font-semibold">{currentUser.following}</span> following</span>
            </div>

            <div className="space-y-2.5 text-sm text-gray-400">
              {currentUser.company && (
                <div className="flex items-center gap-2"><Building size={16} className="text-gray-500" /> {currentUser.company}</div>
              )}
              {currentUser.location && (
                <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-500" /> {currentUser.location}</div>
              )}
              {currentUser.email && (
                <div className="flex items-center gap-2"><Mail size={16} className="text-gray-500" /> {currentUser.email}</div>
              )}
              {currentUser.website && (
                <div className="flex items-center gap-2"><Globe size={16} className="text-gray-500" /> <a href="#" className="text-blue-400 hover:underline">codebook.dev</a></div>
              )}
              <div className="flex items-center gap-2"><Calendar size={16} className="text-gray-500" /> Joined March 2024</div>
            </div>

            {/* Achievements */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { emoji: '🌟', label: 'Star Gazer' },
                  { emoji: '🔥', label: 'On Fire' },
                  { emoji: '🚀', label: 'Early Adopter' },
                  { emoji: '💡', label: 'Innovator' },
                ].map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300" title={badge.label}>
                    {badge.emoji} {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-9">
          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-800 mb-6">
            {[
              { id: 'repositories', label: 'Repositories', count: userRepos.length },
              { id: 'stars', label: 'Stars', count: currentUser.stars },
              { id: 'snippets', label: 'Snippets', count: snippets.length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm transition ${activeTab === tab.id ? 'tab-active font-medium' : 'tab-inactive'}`}
              >
                {tab.label}
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-gray-800 text-gray-400">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Contribution graph */}
          <ContributionGraph />

          {/* Repository list */}
          {activeTab === 'repositories' && (
            <div className="mt-6 space-y-4">
              {userRepos.map(repo => (
                <div key={repo.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <Link to={`/repo/${repo.fullName}`} className="text-blue-400 hover:underline font-semibold">
                        {repo.name}
                      </Link>
                      {repo.isPrivate && (
                        <span className="ml-2 text-xs border border-gray-700 text-gray-400 rounded-full px-2 py-0.5">Private</span>
                      )}
                      <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1"><Star size={14} /> {formatNumber(repo.stars)}</span>
                        <span className="flex items-center gap-1"><GitFork size={14} /> {formatNumber(repo.forks)}</span>
                        <span className="text-xs text-gray-600">Updated {repo.updatedAt}</span>
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

          {/* Stars */}
          {activeTab === 'stars' && (
            <div className="mt-6 space-y-4">
              {repositories.slice(0, 3).map(repo => (
                <div key={repo.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition">
                  <Link to={`/repo/${repo.fullName}`} className="text-blue-400 hover:underline font-semibold">
                    {repo.fullName}
                  </Link>
                  <p className="text-sm text-gray-400 mt-1">{repo.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1"><Star size={14} fill="currentColor" className="text-yellow-400" /> {formatNumber(repo.stars)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Snippets */}
          {activeTab === 'snippets' && (
            <div className="mt-6 space-y-4">
              {snippets.map(snippet => (
                <div key={snippet.id} className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition">
                  <div className="px-5 py-4">
                    <h3 className="text-sm font-semibold text-blue-400">{snippet.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{snippet.description}</p>
                  </div>
                  <pre className="px-5 py-3 bg-gray-950/50 text-xs font-mono text-gray-400 border-t border-gray-800 max-h-32 overflow-hidden">
                    {snippet.files[0].content}
                  </pre>
                  <div className="px-5 py-3 border-t border-gray-800/50 flex items-center gap-4 text-xs text-gray-500">
                    <span>{snippet.language}</span>
                    <span className="flex items-center gap-1"><Star size={11} /> {snippet.stars}</span>
                    <span>{snippet.updatedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
