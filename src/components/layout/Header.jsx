import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Bell, Plus, ChevronDown, Menu, X, BookOpen, GitFork, Star, Cloud, Code2, Settings, LogOut, User, Compass, FileCode } from 'lucide-react'
import { currentUser, notifications } from '../../data/mockData'

export default function Header({ isLoggedIn, onLogin, onLogout }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const profileRef = useRef(null)
  const notifRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-800/50">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl hover:opacity-90 transition shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <span className="hidden sm:inline">CodeBook</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { to: '/explore', label: 'Explore' },
              { to: '/storage', label: 'Storage' },
              { to: '/snippets', label: 'Snippets' },
            ].map(link => (
              <Link key={link.to} to={link.to} className="px-3 py-1.5 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-800/50 transition">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search repositories, code, users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 border border-gray-700 rounded px-1.5 py-0.5">/</kbd>
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Mobile search */}
          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition">
            <Search size={20} />
          </button>

          {isLoggedIn ? (
            <>
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-800 font-medium text-sm">Notifications</div>
                    {notifications.map(n => (
                      <div key={n.id} className={`px-4 py-3 hover:bg-gray-800/50 cursor-pointer border-b border-gray-800/50 ${!n.read ? 'bg-blue-500/5' : ''}`}>
                        <div className="flex items-start gap-2">
                          {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />}
                          <div>
                            <p className="text-sm text-gray-200">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{n.repo} &middot; {n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* New menu */}
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition">
                  <Plus size={20} />
                  <ChevronDown size={12} />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden" onClick={() => setMenuOpen(false)}>
                    <Link to="/new" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <GitFork size={16} /> New repository
                    </Link>
                    <Link to="/snippets" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <FileCode size={16} /> New snippet
                    </Link>
                    <div className="border-t border-gray-800 my-1" />
                    <Link to="/storage" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <Cloud size={16} /> Upload files
                    </Link>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800/50 transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                    {currentUser.name.charAt(0)}
                  </div>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden" onClick={() => setProfileOpen(false)}>
                    <div className="px-4 py-3 border-b border-gray-800">
                      <p className="font-medium text-sm">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.username}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <User size={16} /> Your profile
                    </Link>
                    <Link to="/" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <BookOpen size={16} /> Your repositories
                    </Link>
                    <Link to="/storage" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <Cloud size={16} /> Cloud storage
                    </Link>
                    <Link to="/snippets" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <Code2 size={16} /> Your snippets
                    </Link>
                    <Link to="/explore" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <Compass size={16} /> Explore
                    </Link>
                    <div className="border-t border-gray-800 my-1" />
                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white">
                      <Settings size={16} /> Settings
                    </Link>
                    <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white w-full">
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={onLogin} className="px-4 py-1.5 text-sm text-gray-300 hover:text-white rounded-lg border border-gray-700 hover:border-gray-600 transition">
                Sign in
              </button>
              <button onClick={onLogin} className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition">
                Sign up
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </form>
        </div>
      )}

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-800 px-4 py-3 flex flex-col gap-1" onClick={() => setMobileMenuOpen(false)}>
          <Link to="/explore" className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-800/50">Explore</Link>
          <Link to="/storage" className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-800/50">Cloud Storage</Link>
          <Link to="/snippets" className="px-3 py-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-800/50">Snippets</Link>
        </nav>
      )}
    </header>
  )
}
