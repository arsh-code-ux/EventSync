import React, { useState, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../api/axios'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [keyConfigured, setKeyConfigured] = useState(null)
  const { setUser } = useContext(AuthContext)
  const nav = useNavigate()
  const location = useLocation()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      console.log('Admin login attempt:', { email })
      const res = await api.post('/auth/admin/login', { email, password, adminKey })
      const { token, user } = res.data
      console.log('Admin login successful:', user)
      localStorage.setItem('eventsync_token', token)
      localStorage.setItem('eventsync_user', JSON.stringify(user))
      if (setUser) setUser(user) // Update context if available
      
      // Redirect to the page user came from, or default to admin dashboard
      const from = location.state?.from || '/admin'
      nav(from)
    } catch (err) {
      console.error('Admin login error:', err)
      setError(err?.response?.data?.message || 'Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  // Check whether server has ADMIN_PASSKEY configured
  React.useEffect(() => {
    let mounted = true
    api.get('/auth/admin/key-status')
      .then(res => {
        if (!mounted) return
        setKeyConfigured(res.data?.enabled === true)
      })
      .catch(err => {
        console.error('Failed to fetch admin key status', err)
        if (!mounted) return
        setKeyConfigured(false)
      })
    return () => { mounted = false }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative p-10 rounded-3xl shadow-2xl animate-fade-in border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-cyan-500 rounded-2xl mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-cyan-500 bg-clip-text text-transparent mb-2">
              Admin Portal 🔐
            </h2>
            <p className="text-gray-600">Secure admin access to EventSync</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg animate-shake">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input 
                  type="email"
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                  placeholder="admin@eventsync.com" 
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all bg-white/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  placeholder="Enter admin password" 
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all bg-white/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={adminKey}
                  onChange={e => setAdminKey(e.target.value)}
                  placeholder="Enter admin passkey"
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all bg-white/50"
                  required
                />
              </div>
              {keyConfigured === false && (
                <p className="text-xs text-yellow-600 mt-2">Admin key not configured on server. Ask the maintainer to set ADMIN_PASSKEY.</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-700 text-white px-6 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Login as Admin
                </>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Need admin access?</span>
              </div>
            </div>
            <Link 
              to="/admin/register" 
              className="block w-full text-center py-3 px-4 border-2 border-cyan-500 text-cyan-700 rounded-xl font-semibold hover:bg-cyan-50 transition-all duration-200"
            >
              Register as Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
