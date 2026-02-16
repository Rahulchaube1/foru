import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Code2, GitFork, MessageSquare, Cloud, Shield, Zap, Globe, ArrowRight, Star, Users, FileCode, BarChart3, Share2, Search, ChevronRight, Play, CheckCircle2 } from 'lucide-react'

const features = [
  { icon: BookOpen, title: 'AI-Powered Documentation', desc: 'Auto-generate living documentation that updates with every commit. Never write docs manually again.', color: 'blue' },
  { icon: Share2, title: 'Knowledge Graphs', desc: 'Visualize code relationships with interactive architecture, class, and sequence diagrams.', color: 'purple' },
  { icon: MessageSquare, title: 'AI Code Chat', desc: 'Ask questions about any repository. Get instant answers with direct links to relevant code.', color: 'cyan' },
  { icon: GitFork, title: 'Repository Management', desc: 'Create, fork, and manage repositories with built-in issues, pull requests, and code review.', color: 'green' },
  { icon: Cloud, title: 'Unlimited Cloud Storage', desc: 'Store unlimited files, assets, and data. No caps, no limits, no surprises.', color: 'orange' },
  { icon: FileCode, title: 'Code Snippets', desc: 'Share and discover code snippets. Syntax highlighting for 100+ languages.', color: 'pink' },
]

const stats = [
  { value: '2M+', label: 'Repositories' },
  { value: '50M+', label: 'Wiki Pages Generated' },
  { value: '500K+', label: 'Developers' },
  { value: '99.9%', label: 'Uptime' },
]

const codeLines = [
  { num: 1, content: '<span class="text-purple-400">import</span> { WikiEngine } <span class="text-purple-400">from</span> <span class="text-green-400">\'@codebook/core\'</span>;', indent: 0 },
  { num: 2, content: '', indent: 0 },
  { num: 3, content: '<span class="text-gray-500">// Initialize with your repository</span>', indent: 0 },
  { num: 4, content: '<span class="text-purple-400">const</span> engine = <span class="text-purple-400">new</span> <span class="text-yellow-300">WikiEngine</span>({', indent: 0 },
  { num: 5, content: 'repo: <span class="text-green-400">\'my-awesome-project\'</span>,', indent: 1 },
  { num: 6, content: 'ai: <span class="text-orange-400">true</span>,', indent: 1 },
  { num: 7, content: '});', indent: 0 },
  { num: 8, content: '', indent: 0 },
  { num: 9, content: '<span class="text-gray-500">// Generate complete documentation</span>', indent: 0 },
  { num: 10, content: '<span class="text-purple-400">await</span> engine.<span class="text-blue-400">initialize</span>();', indent: 0 },
  { num: 11, content: '<span class="text-purple-400">const</span> wiki = <span class="text-purple-400">await</span> engine.<span class="text-blue-400">generateWiki</span>();', indent: 0 },
  { num: 12, content: '', indent: 0 },
  { num: 13, content: 'console.<span class="text-blue-400">log</span>(<span class="text-green-400">`Generated</span> <span class="text-cyan-300">${wiki.pages.length}</span> <span class="text-green-400">pages`</span>);', indent: 0 },
]

export default function Landing({ onGetStarted }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [repoUrl, setRepoUrl] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => prev < codeLines.length ? prev + 1 : prev)
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 overflow-hidden">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-white font-bold text-xl">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <BookOpen size={20} />
            </div>
            CodeBook
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition">How it works</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</a>
            <button onClick={onGetStarted} className="text-sm text-gray-300 hover:text-white transition">Sign in</button>
            <button onClick={onGetStarted} className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition shadow-lg shadow-blue-600/20">
              Get Started Free
            </button>
          </nav>
          <button onClick={onGetStarted} className="md:hidden px-4 py-2 text-sm bg-blue-600 text-white rounded-lg">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16 pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-sm text-blue-400 mb-8">
              <Zap size={14} />
              AI-Powered Code Intelligence Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-white">Understand any</span>
              <br />
              <span className="gradient-text">codebase instantly</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              CodeBook generates living documentation, interactive diagrams, and AI-powered chat for any repository.
              Like GitHub + CodeWiki, but better and with unlimited cloud storage.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto mb-6">
              <div className="flex-1 w-full relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Paste a repository URL or search..."
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-900/80 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                Generate Wiki <ArrowRight size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-16">Free for public repositories. No credit card required.</p>

            {/* Code Demo */}
            <div className="max-w-2xl mx-auto">
              <div className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-blue-900/10">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-gray-500 ml-2 font-mono">codebook-demo.ts</span>
                </div>
                <div className="bg-gray-950 p-4 text-left font-mono text-sm">
                  {codeLines.map((line, i) => (
                    <div
                      key={i}
                      className={`flex transition-all duration-300 ${i < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                    >
                      <span className="w-8 text-right text-gray-600 mr-4 select-none text-xs leading-6">{line.num}</span>
                      <span
                        className="leading-6"
                        style={{ paddingLeft: `${line.indent * 24}px` }}
                        dangerouslySetInnerHTML={{ __html: line.content || '&nbsp;' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-16 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need for code understanding</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From auto-generated documentation to unlimited storage, CodeBook is the all-in-one platform for modern development teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const colors = {
                blue: 'from-blue-600/20 to-blue-600/0 border-blue-500/10 hover:border-blue-500/30',
                purple: 'from-purple-600/20 to-purple-600/0 border-purple-500/10 hover:border-purple-500/30',
                cyan: 'from-cyan-600/20 to-cyan-600/0 border-cyan-500/10 hover:border-cyan-500/30',
                green: 'from-green-600/20 to-green-600/0 border-green-500/10 hover:border-green-500/30',
                orange: 'from-orange-600/20 to-orange-600/0 border-orange-500/10 hover:border-orange-500/30',
                pink: 'from-pink-600/20 to-pink-600/0 border-pink-500/10 hover:border-pink-500/30',
              }
              const iconColors = {
                blue: 'text-blue-400', purple: 'text-purple-400', cyan: 'text-cyan-400',
                green: 'text-green-400', orange: 'text-orange-400', pink: 'text-pink-400',
              }
              return (
                <div
                  key={i}
                  className={`p-6 rounded-xl bg-gradient-to-b ${colors[f.color]} border transition-all duration-300 hover:-translate-y-1`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mb-4 ${iconColors[f.color]}`}>
                    <f.icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How CodeBook works</h2>
            <p className="text-lg text-gray-400">Three simple steps to understand any codebase</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Connect Repository', desc: 'Paste any GitHub URL or connect your own repositories. Works with public and private repos.', icon: GitFork },
              { step: '02', title: 'AI Analyzes Code', desc: 'Our AI builds a knowledge graph of your entire codebase - functions, classes, dependencies, and relationships.', icon: Zap },
              { step: '03', title: 'Explore & Collaborate', desc: 'Browse auto-generated docs, ask the AI chat, view diagrams, and collaborate with your team.', icon: Users },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-7xl font-extrabold text-gray-800/50 mb-4">{item.step}</div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why CodeBook?</h2>
            <p className="text-lg text-gray-400">More than just a documentation tool</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-gray-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Feature</th>
                    <th className="px-6 py-4 text-gray-400 font-medium">Others</th>
                    <th className="px-6 py-4 text-blue-400 font-medium">CodeBook</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['AI Documentation', true, true],
                    ['Knowledge Graphs', false, true],
                    ['Repository Hosting', true, true],
                    ['Issues & Pull Requests', true, true],
                    ['AI Chat Assistant', false, true],
                    ['Unlimited Cloud Storage', false, true],
                    ['Code Snippets', true, true],
                    ['Auto-updated Diagrams', false, true],
                    ['Real-time Collaboration', false, true],
                  ].map(([feature, others, codebook], i) => (
                    <tr key={i} className="border-t border-gray-800/50">
                      <td className="px-6 py-3 text-gray-300">{feature}</td>
                      <td className="px-6 py-3 text-center">
                        {others ? <CheckCircle2 size={18} className="inline text-gray-500" /> : <span className="text-gray-700">&mdash;</span>}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <CheckCircle2 size={18} className="inline text-blue-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to understand your codebase?</h2>
          <p className="text-lg text-gray-400 mb-8">Join 500,000+ developers using CodeBook to build better software, faster.</p>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-lg transition shadow-lg shadow-blue-600/25 inline-flex items-center gap-2"
          >
            Start for Free <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen size={16} />
                </div>
                CodeBook
              </div>
              <p className="text-sm text-gray-500">AI-powered code understanding for everyone.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Docs', 'API'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Resources', links: ['Community', 'Guides', 'Changelog', 'Status'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'GDPR'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium text-gray-300 mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}><a href="#" className="text-sm text-gray-500 hover:text-gray-300 transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800/50 mt-10 pt-8 text-center text-sm text-gray-600">
            &copy; 2026 CodeBook. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
