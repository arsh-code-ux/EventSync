import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    nav('/')
    setMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-2xl">�</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              EventSync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-cyan-500 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                isActive('/about') 
                  ? 'bg-cyan-500 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/why-events" 
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                isActive('/why-events') 
                  ? 'bg-cyan-500 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
              }`}
            >
              Why Events
            </Link>
            
            {user ? (
              <>
                {user.isAdmin ? (
                  <Link 
                    to="/admin" 
                    className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                      isActive('/') 
                        ? 'bg-cyan-500 text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-600'
                    }`}
                  >
                    <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin Panel
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/events" 
                      className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                        isActive('/admin') 
                          ? 'bg-cyan-500 text-white shadow-lg' 
                          : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-600'
                      }`}
                    >
                      Events
                    </Link>
                    <Link 
                      to="/dashboard" 
                        className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                          isActive('/dashboard') 
                            ? 'bg-cyan-500 text-white shadow-lg' 
                            : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-600'
                        }`}
                    >
                      <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Dashboard
                    </Link>
                  </>
                )}
                
                {/* User Profile Avatar - Clickable */}
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <Link to="/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="group flex items-center space-x-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-700 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <Link 
                  to="/login" 
                  className="px-5 py-2.5 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-600 rounded-full transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Get Started
                </Link>
                <Link 
                  to="/admin/login" 
                  className="text-sm text-gray-500 hover:text-cyan-600 transition-colors font-medium"
                >
                  Admin
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-cyan-50 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-full font-semibold transition-all ${
                  isActive('/') 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-full font-semibold transition-all ${
                  isActive('/about') 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
                }`}
              >
                About
              </Link>
              <Link 
                to="/why-events" 
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-full font-semibold transition-all ${
                  isActive('/why-events') 
                    ? 'bg-cyan-500 text-white' 
                    : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
                }`}
              >
                Why Events
              </Link>
              
              {user ? (
                <>
                  {user.isAdmin ? (
                    <Link 
                      to="/admin" 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-full font-semibold transition-all ${
                        isActive('/admin') 
                          ? 'bg-cyan-500 text-white' 
                          : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
                      }`}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <>
                      <Link 
                        to="/events" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-full font-semibold transition-all ${
                          isActive('/events') 
                            ? 'bg-cyan-500 text-white' 
                            : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
                        }`}
                      >
                        Events
                      </Link>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3 rounded-full font-semibold transition-all ${
                          isActive('/dashboard') 
                            ? 'bg-cyan-500 text-white' 
                            : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-700'
                        }`}
                      >
                        Dashboard
                      </Link>
                    </>
                  )}
                  
                  <div className="px-4 py-3 bg-cyan-50 rounded-full border border-cyan-200">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-3 bg-cyan-500 text-white rounded-full font-semibold hover:bg-cyan-700 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-gray-700 font-semibold hover:bg-cyan-50 hover:text-cyan-700 rounded-full transition-all"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-700 transition-all"
                  >
                    Get Started
                  </Link>
                  <Link 
                    to="/admin/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm text-gray-500 hover:text-cyan-700 transition-colors text-center"
                  >
                    Admin Login
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
