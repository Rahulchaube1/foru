import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Globe, Lock, GitBranch, FileText, Info } from 'lucide-react'

export default function NewRepo() {
  const navigate = useNavigate()
  const [repoName, setRepoName] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [addReadme, setAddReadme] = useState(true)
  const [addGitignore, setAddGitignore] = useState(true)
  const [gitignoreTemplate, setGitignoreTemplate] = useState('Node')
  const [license, setLicense] = useState('MIT')

  const handleCreate = () => {
    if (repoName.trim()) {
      navigate(`/repo/codebook-user/${repoName}`)
    }
  }

  const isValid = repoName.trim().length > 0 && /^[a-zA-Z0-9._-]+$/.test(repoName)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-2">Create a new repository</h1>
      <p className="text-sm text-gray-400 mb-8">A repository contains all project files, including the revision history. Already have a project repository elsewhere? <a href="#" className="text-blue-400 hover:underline">Import a repository.</a></p>

      <div className="space-y-6">
        {/* Owner / Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Repository name <span className="text-red-400">*</span></label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
              codebook-user
            </div>
            <span className="text-gray-500 text-lg">/</span>
            <input
              type="text"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
              placeholder="my-awesome-project"
              className="flex-1 px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          {repoName && !isValid && (
            <p className="text-xs text-red-400 mt-1.5">Repository name can only contain letters, numbers, hyphens, underscores, and dots.</p>
          )}
          {isValid && (
            <p className="text-xs text-green-400 mt-1.5">codebook-user/{repoName} is available.</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Description <span className="text-gray-600">(optional)</span></label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short description of the repository"
            className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="border-t border-gray-800 pt-6" />

        {/* Visibility */}
        <div>
          <label className="block text-sm text-gray-300 mb-3">Visibility</label>
          <div className="space-y-3">
            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${visibility === 'public' ? 'border-blue-500/40 bg-blue-500/5' : 'border-gray-700 hover:border-gray-600'}`}>
              <input type="radio" name="visibility" value="public" checked={visibility === 'public'} onChange={(e) => setVisibility(e.target.value)} className="mt-0.5" />
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                  <Globe size={16} className="text-green-400" /> Public
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Anyone on the internet can see this repository. You choose who can commit.</p>
              </div>
            </label>
            <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition ${visibility === 'private' ? 'border-blue-500/40 bg-blue-500/5' : 'border-gray-700 hover:border-gray-600'}`}>
              <input type="radio" name="visibility" value="private" checked={visibility === 'private'} onChange={(e) => setVisibility(e.target.value)} className="mt-0.5" />
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
                  <Lock size={16} className="text-yellow-400" /> Private
                </div>
                <p className="text-xs text-gray-500 mt-0.5">You choose who can see and commit to this repository.</p>
              </div>
            </label>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6" />

        {/* Initialize */}
        <div>
          <label className="block text-sm text-gray-300 mb-3">Initialize this repository with:</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={addReadme} onChange={(e) => setAddReadme(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600" />
              <span className="text-sm text-gray-300">Add a README file</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={addGitignore} onChange={(e) => setAddGitignore(e.target.checked)} className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600" />
              <span className="text-sm text-gray-300">Add .gitignore</span>
            </label>
            {addGitignore && (
              <select
                value={gitignoreTemplate}
                onChange={(e) => setGitignoreTemplate(e.target.value)}
                className="ml-7 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500"
              >
                {['Node', 'Python', 'Java', 'Go', 'Rust', 'Ruby', 'C++'].map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* License */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">License</label>
          <select
            value={license}
            onChange={(e) => setLicense(e.target.value)}
            className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">None</option>
            <option value="MIT">MIT License</option>
            <option value="Apache-2.0">Apache License 2.0</option>
            <option value="GPL-3.0">GNU GPLv3</option>
            <option value="BSD-2">BSD 2-Clause</option>
            <option value="BSD-3">BSD 3-Clause</option>
          </select>
        </div>

        {/* AI Wiki */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-blue-300 mb-1">
            <BookOpen size={16} /> Auto-generate AI Wiki
          </div>
          <p className="text-xs text-gray-500">CodeBook will automatically generate an AI-powered wiki with documentation, diagrams, and chat assistant for your repository.</p>
        </div>

        <div className="border-t border-gray-800 pt-6" />

        <button
          onClick={handleCreate}
          disabled={!isValid}
          className="w-full py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create repository
        </button>
      </div>
    </div>
  )
}
