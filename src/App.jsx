import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Repository from './pages/Repository'
import Wiki from './pages/Wiki'
import Issues from './pages/Issues'
import PullRequests from './pages/PullRequests'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Storage from './pages/Storage'
import Snippets from './pages/Snippets'
import Settings from './pages/Settings'
import NewRepo from './pages/NewRepo'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/' && !isLoggedIn

  return (
    <div className="min-h-screen bg-gray-950">
      {!isLanding && <Header isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} onLogout={() => setIsLoggedIn(false)} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Landing onGetStarted={() => setIsLoggedIn(true)} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/repo/:owner/:name" element={<Repository />} />
        <Route path="/repo/:owner/:name/wiki" element={<Wiki />} />
        <Route path="/repo/:owner/:name/issues" element={<Issues />} />
        <Route path="/repo/:owner/:name/pulls" element={<PullRequests />} />
        <Route path="/new" element={<NewRepo />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/snippets" element={<Snippets />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  )
}
