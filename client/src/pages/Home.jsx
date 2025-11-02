import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Home() {
  const nav = useNavigate()
  const [stats, setStats] = useState({ users: 0, events: 0, colleges: 0 })

  useEffect(() => {
    api.get('/stats').then(res => setStats(res.data)).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-6">
              <div className="inline-block">
                <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  WELCOME TO EVENTSYNC
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Start Your Beautiful<br/>
                And <span className="text-cyan-500">Bright</span> Future
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                There are many variations of passages available but the majority have suffered alteration in some form by injected humour or randomized.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/register" className="bg-cyan-500 hover:bg-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  JOIN US
                </Link>
                <Link to="/events" className="bg-transparent border-2 border-white hover:bg-white hover:text-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300">
                  LEARN MORE →
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=600&fit=crop" 
                  alt="Students celebrating"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              {/* Decorative circle */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section with Numbers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 01 */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="absolute -top-4 -right-4 bg-cyan-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                01
              </div>
              <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scholarship Facility</h3>
              <p className="text-gray-600 leading-relaxed">
                It is a long established fact that a reader will be distracted by content.
              </p>
            </div>

            {/* Feature 02 */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="absolute -top-4 -right-4 bg-cyan-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                02
              </div>
              <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Skilled Lecturers</h3>
              <p className="text-gray-600 leading-relaxed">
                It is a long established fact that a reader will be distracted by content.
              </p>
            </div>

            {/* Feature 03 */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="absolute -top-4 -right-4 bg-cyan-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                03
              </div>
              <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book Library Facility</h3>
              <p className="text-gray-600 leading-relaxed">
                It is a long established fact that a reader will be distracted by content.
              </p>
            </div>

            {/* Feature 04 */}
            <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
              <div className="absolute -top-4 -right-4 bg-cyan-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                04
              </div>
              <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable Price</h3>
              <p className="text-gray-600 leading-relaxed">
                It is a long established fact that a reader will be distracted by content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Image - Only Background Image */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" alt="Students" className="rounded-3xl shadow-lg" />
                <div className="bg-white bg-opacity-20 rounded-3xl p-8 text-white">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 w-16 h-16 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">30+</div>
                      <div className="text-sm">Years Of<br/>Quality Service</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop" alt="Learning" className="rounded-3xl shadow-lg" />
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop" alt="Team" className="rounded-3xl shadow-lg" />
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6 text-white bg-black bg-opacity-50 p-8 rounded-3xl">
              <span className="text-white font-semibold text-sm tracking-wider">ABOUT US</span>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Our Education System<br/>
                <span className="text-cyan-400">Inspires</span> You More.
              </h2>
              <p className="text-gray-100 leading-relaxed">
                There are many variations of passages available but the majority have suffered alteration in some form by injected humour randomised words which don't look even slightly.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-white bg-opacity-20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Education Services</h4>
                    <p className="text-gray-200">It is a long established fact that a reader will be distracted by content.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white bg-opacity-20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">International Hubs</h4>
                    <p className="text-gray-200">It is a long established fact that a reader will be distracted by content.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-cyan-500 hover:bg-cyan-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2">
                  <span>DISCOVER MORE</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <div className="inline-flex items-center ml-8">
                  <div className="bg-cyan-500 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-200">Call Us Now</div>
                    <div className="font-bold text-lg">+123 456 7890</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - White Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div className="text-5xl font-bold mb-2 text-cyan-500">{stats.events || '500'}</div>
              <div className="text-lg font-semibold text-gray-700">Total Events</div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
              </div>
              <div className="text-5xl font-bold mb-2 text-cyan-500">{stats.users || '1900'}</div>
              <div className="text-lg font-semibold text-gray-700">Our Students</div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <div className="text-5xl font-bold mb-2 text-cyan-500">{stats.colleges || '750'}</div>
              <div className="text-lg font-semibold text-gray-700">Skilled Lecturers</div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <div className="text-5xl font-bold mb-2 text-cyan-500">30</div>
              <div className="text-lg font-semibold text-gray-700">Win Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4 text-cyan-500">
              Powerful Features
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to manage college events seamlessly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-cyan-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">Register in under 10 seconds with our streamlined one-click sign-up process</p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-cyan-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🎫</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Digital Tickets</h3>
                <p className="text-gray-600 leading-relaxed">Instant QR codes delivered to your email for hassle-free event entry</p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-cyan-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">📊</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Real-time Analytics</h3>
                <p className="text-gray-600 leading-relaxed">Track attendance and engagement metrics with live dashboard updates</p>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-cyan-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🔒</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Bank-Level Security</h3>
                <p className="text-gray-600 leading-relaxed">Your data protected with military-grade 256-bit encryption</p>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-cyan-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">🌐</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Cross-Platform</h3>
                <p className="text-gray-600 leading-relaxed">Seamless experience across all devices and browsers</p>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-cyan-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="font-bold text-2xl mb-3 text-gray-900">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed">Round-the-clock assistance from our dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events/Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-500 font-semibold text-sm tracking-wider">OUR EVENTS</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Let's Check Our <span className="text-cyan-500">Events</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop" 
                  alt="Event" 
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    $49.00
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    19 Lectures
                  </span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(5.0)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors">
                  It is a long established fact that a reader
                </h3>
                <Link to="/events" className="text-cyan-500 font-semibold inline-flex items-center hover:gap-2 transition-all">
                  View Details
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop" 
                  alt="Event" 
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    $59.00
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    24 Lectures
                  </span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(4.8)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors">
                  It is a long established fact that a reader
                </h3>
                <Link to="/events" className="text-cyan-500 font-semibold inline-flex items-center hover:gap-2 transition-all">
                  View Details
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=300&fit=crop" 
                  alt="Event" 
                  className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    FREE
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                    15 Lectures
                  </span>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">(4.9)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors">
                  It is a long established fact that a reader
                </h3>
                <Link to="/events" className="text-cyan-500 font-semibold inline-flex items-center hover:gap-2 transition-all">
                  View Details
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/events" className="inline-flex items-center px-8 py-4 bg-cyan-500 hover:bg-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              View All Events
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Only Background Image */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform<br/>Your Event Experience?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students and organizers who are already using EventSync
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/register" className="px-10 py-5 bg-cyan-500 hover:bg-cyan-700 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-2xl transform hover:scale-105">
                Get Started Now
              </Link>
              <Link to="/login" className="px-10 py-5 bg-white bg-opacity-20 border-2 border-white hover:bg-white hover:text-gray-900 text-white rounded-full font-bold text-lg transition-all duration-300">
                Sign In →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🎓</span>
                </div>
                <span className="text-2xl font-bold">EventSync</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Making college events accessible and manageable for everyone. Your gateway to amazing experiences.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-cyan-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-cyan-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-cyan-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-cyan-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg>
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/events" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> Browse Events
                </Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> About Us
                </Link></li>
                <li><Link to="/why-events" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> Why Events
                </Link></li>
                <li><Link to="/dashboard" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> Dashboard
                </Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> Help Center
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> FAQs
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> Contact Us
                </a></li>
                <li><a href="#" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm flex items-center group">
                  <span className="mr-2 group-hover:mr-3 transition-all">→</span> Community
                </a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start text-sm text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 University Ave, Campus City, ST 12345</span>
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@eventsync.com</span>
                </li>
                <li className="flex items-center text-sm text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+123 456 7890</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">© 2025 EventSync. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-cyan-700 transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
