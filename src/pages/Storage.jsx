import { useState } from 'react'
import { Cloud, Upload, Folder, File, Download, Share2, Trash2, Search, Grid, List, MoreVertical, Plus, Image, FileVideo, FileText, Database, Archive, ChevronRight, X, HardDrive, Infinity, FolderPlus } from 'lucide-react'
import { storageFiles } from '../data/mockData'

const fileIcons = {
  folder: Folder,
  'image/svg+xml': Image,
  'image/png': Image,
  'video/mp4': FileVideo,
  'text/yaml': FileText,
  'text/markdown': FileText,
  'text/csv': Database,
  'application/json': Database,
}

function getFileIcon(file) {
  if (file.type === 'folder') return Folder
  return fileIcons[file.mime] || File
}

function formatSize(size) {
  if (!size) return '--'
  return size
}

export default function Storage() {
  const [viewMode, setViewMode] = useState('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFiles, setSelectedFiles] = useState(new Set())
  const [showUpload, setShowUpload] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [path, setPath] = useState([{ name: 'My Storage', id: 'root' }])

  const filtered = storageFiles.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSelect = (id) => {
    setSelectedFiles(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const totalSize = '2.4 GB'

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Cloud size={28} className="text-cyan-400" /> Cloud Storage
          </h1>
          <p className="text-sm text-gray-500 mt-1">Unlimited storage for all your files and assets</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition"
        >
          <Upload size={16} /> Upload
        </button>
      </div>

      {/* Storage stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: HardDrive, label: 'Used Space', value: totalSize, sub: 'of Unlimited', color: 'blue' },
          { icon: File, label: 'Total Files', value: '156', sub: 'across all folders', color: 'purple' },
          { icon: Share2, label: 'Shared', value: '24', sub: 'files shared', color: 'green' },
          { icon: Cloud, label: 'Storage Plan', value: 'Unlimited', sub: 'No caps, ever', color: 'cyan' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                <stat.icon size={20} className={`text-${stat.color}-400`} />
              </div>
              <div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm">
            {path.map((p, i) => (
              <span key={p.id} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} className="text-gray-600" />}
                <button className={`hover:text-white transition ${i === path.length - 1 ? 'text-white font-medium' : 'text-gray-400'}`}>
                  {p.name}
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 w-48"
            />
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="p-1.5 text-gray-400 hover:text-white bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-600 transition"
            title="New folder"
          >
            <FolderPlus size={18} />
          </button>
          <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-400 hover:text-white'}`}
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Selected actions */}
      {selectedFiles.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <span className="text-sm text-blue-400">{selectedFiles.size} selected</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 text-gray-400 hover:text-white rounded transition"><Download size={16} /></button>
            <button className="p-1.5 text-gray-400 hover:text-white rounded transition"><Share2 size={16} /></button>
            <button className="p-1.5 text-gray-400 hover:text-red-400 rounded transition"><Trash2 size={16} /></button>
          </div>
          <button onClick={() => setSelectedFiles(new Set())} className="ml-auto text-xs text-gray-500 hover:text-white">Clear</button>
        </div>
      )}

      {/* File list */}
      {viewMode === 'list' ? (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-5 py-2.5 border-b border-gray-800 text-xs text-gray-500 font-medium uppercase tracking-wider">
            <div className="col-span-1"></div>
            <div className="col-span-5">Name</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {filtered.map(file => {
            const Icon = getFileIcon(file)
            const isSelected = selectedFiles.has(file.id)
            return (
              <div
                key={file.id}
                className={`grid grid-cols-12 gap-4 px-5 py-3 border-b border-gray-800/30 hover:bg-gray-800/30 transition cursor-pointer items-center ${isSelected ? 'bg-blue-500/5' : ''}`}
                onClick={() => toggleSelect(file.id)}
              >
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                </div>
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <Icon size={18} className={file.type === 'folder' ? 'text-blue-400' : 'text-gray-500'} />
                  <span className="text-sm text-gray-200 truncate">{file.name}</span>
                  {file.shared && <Share2 size={12} className="text-cyan-400 shrink-0" />}
                </div>
                <div className="col-span-2 text-sm text-gray-500">
                  {file.type === 'folder' ? `${file.items} items` : formatSize(file.size)}
                </div>
                <div className="col-span-2 text-sm text-gray-500">{file.updatedAt}</div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                  <button className="p-1 text-gray-500 hover:text-white rounded transition" onClick={(e) => e.stopPropagation()}>
                    <Download size={14} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-white rounded transition" onClick={(e) => e.stopPropagation()}>
                    <Share2 size={14} />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-400 rounded transition" onClick={(e) => e.stopPropagation()}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(file => {
            const Icon = getFileIcon(file)
            return (
              <div
                key={file.id}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-gray-700 cursor-pointer transition group"
                onClick={() => toggleSelect(file.id)}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mb-3 mx-auto">
                  <Icon size={24} className={file.type === 'folder' ? 'text-blue-400' : 'text-gray-500'} />
                </div>
                <p className="text-sm text-gray-200 text-center truncate mb-1">{file.name}</p>
                <p className="text-xs text-gray-500 text-center">
                  {file.type === 'folder' ? `${file.items} items` : file.size}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowUpload(false)} />
          <div className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-xl shadow-2xl">
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Upload Files</h2>
              <button onClick={() => setShowUpload(false)} className="p-1 text-gray-500 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition ${dragOver ? 'border-blue-500 bg-blue-500/5' : 'border-gray-700 hover:border-gray-600'}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
              >
                <Upload size={40} className="mx-auto text-gray-500 mb-4" />
                <p className="text-sm text-gray-300 mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-xs text-gray-500 mb-4">No file size limits. Unlimited storage.</p>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition">
                  Browse Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
