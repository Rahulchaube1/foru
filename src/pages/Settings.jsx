import { useState } from 'react'
import { Settings as SettingsIcon, User, Shield, Bell, Paintbrush, Key, Globe, Monitor, Moon, Sun, Save, Eye, EyeOff } from 'lucide-react'
import { currentUser } from '../data/mockData'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)
  const [bio, setBio] = useState(currentUser.bio)
  const [location, setLocation] = useState(currentUser.location)
  const [company, setCompany] = useState(currentUser.company)
  const [website, setWebsite] = useState(currentUser.website)
  const [theme, setTheme] = useState('dark')
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [prNotifs, setPrNotifs] = useState(true)
  const [issueNotifs, setIssueNotifs] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Paintbrush },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Key },
  ]

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <SettingsIcon size={28} className="text-gray-400" /> Settings
      </h1>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <nav className="space-y-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-9">
          {activeTab === 'profile' && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Public Profile</h2>
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Bio</label>
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500 resize-none" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Company</label>
                    <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Website</label>
                  <input value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:border-blue-500" />
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition">
                  <Save size={16} /> {saved ? 'Saved!' : 'Save changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Appearance</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', icon: Sun },
                      { id: 'dark', label: 'Dark', icon: Moon },
                      { id: 'system', label: 'System', icon: Monitor },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition ${
                          theme === t.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <t.icon size={24} className={theme === t.id ? 'text-blue-400' : 'text-gray-500'} />
                        <span className={`text-sm ${theme === t.id ? 'text-blue-400' : 'text-gray-400'}`}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-3">Editor Font Size</label>
                  <select className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-blue-500">
                    <option>12px</option>
                    <option>13px</option>
                    <option selected>14px</option>
                    <option>15px</option>
                    <option>16px</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', desc: 'Receive email notifications for important updates', state: emailNotifs, setter: setEmailNotifs },
                  { label: 'Pull request reviews', desc: 'Get notified when someone reviews your PR', state: prNotifs, setter: setPrNotifs },
                  { label: 'Issue mentions', desc: 'Get notified when you\'re mentioned in an issue', state: issueNotifs, setter: setIssueNotifs },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                    <div>
                      <div className="text-sm text-gray-200 font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => item.setter(!item.state)}
                      className={`w-11 h-6 rounded-full transition-colors relative ${item.state ? 'bg-blue-600' : 'bg-gray-700'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${item.state ? 'translate-x-5.5 left-[1px]' : 'left-[2px]'}`}
                        style={{ transform: item.state ? 'translateX(21px)' : 'translateX(0)' }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Username</label>
                  <input value={currentUser.username} readOnly className="w-full px-4 py-2.5 bg-gray-800/30 border border-gray-700 rounded-lg text-sm text-gray-400" />
                </div>
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <h3 className="text-sm font-medium text-red-400 mb-2">Danger Zone</h3>
                  <p className="text-xs text-gray-500 mb-3">Once you delete your account, there is no going back.</p>
                  <button className="px-4 py-2 text-sm bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition">
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Security</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Change Password</h3>
                  <div className="space-y-3">
                    <input type="password" placeholder="Current password" className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500" />
                    <input type="password" placeholder="New password" className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500" />
                    <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500" />
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition">Update password</button>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Two-Factor Authentication</h3>
                  <p className="text-xs text-gray-500 mb-3">Add an extra layer of security to your account.</p>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
