import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Landing() {
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState('monthly')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState({})
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [openFAQ, setOpenFAQ] = useState(null)
  const heroRef = useRef(null)
  const nav = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: "🎯",
      title: "Smart Discovery",
      description: "AI-powered event recommendations based on your interests",
      color: "from-blue-500 to-cyan-1000"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Register in under 10 seconds with one-click sign up",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🎫",
      title: "Digital Tickets",
      description: "QR codes delivered instantly to your email",
      color: "from-cyan-600 to-red-500"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Track attendance and engagement in real-time",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description: "Your data protected with 256-bit encryption",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🌐",
      title: "Cross-Platform",
      description: "Works seamlessly on all devices and browsers",
      color: "from-pink-500 to-rose-500"
    }
  ]

  const stats = [
    { number: "10K+", label: "Active Users", icon: "👥" },
    { number: "500+", label: "Events Hosted", icon: "🎉" },
    { number: "100+", label: "Colleges", icon: "🏫" },
    { number: "99.9%", label: "Uptime", icon: "⚡" }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Student, IIT Delhi",
      image: "👩‍🎓",
      text: "EventSync transformed how our college manages events. The QR code system is brilliant!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Event Coordinator",
      image: "👨‍💼",
      text: "Best event management platform I've used. Simple, fast, and reliable.",
      rating: 5
    },
    {
      name: "Ananya Patel",
      role: "Student, NIT Trichy",
      image: "👩‍💻",
      text: "I never miss an event now! The notifications and dashboard are super helpful.",
      rating: 5
    }
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Create Account",
      description: "Sign up in seconds with your email",
      icon: "📝",
      color: "bg-cyan-500"
    },
    {
      step: "2",
      title: "Browse Events",
      description: "Discover events happening near you",
      icon: "🔍",
      color: "bg-cyan-500"
    },
    {
      step: "3",
      title: "Register & Attend",
      description: "Get your QR code and check in instantly",
      icon: "🎫",
      color: "bg-cyan-500"
    }
  ]

  const parallaxOffset = scrollY * 0.5

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 overflow-hidden">
      {/* Floating Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 100 ? '  shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🎉</span>
              <span className="text-2xl font-bold bg-cyan-500 bg-clip-text text-transparent">
                EventSync
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#section-features" onClick={(e) => { e.preventDefault(); document.getElementById('section-features')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-700 hover:text-teal-600 transition-colors cursor-pointer">Features</a>
              <a href="#section-how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('section-how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-700 hover:text-teal-600 transition-colors cursor-pointer">How It Works</a>
              <a href="#section-testimonials" onClick={(e) => { e.preventDefault(); document.getElementById('section-testimonials')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-700 hover:text-teal-600 transition-colors cursor-pointer">Reviews</a>
              <Link to="/login" className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all">Login</Link>
              <Link to="/register" className="px-6 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-700 transform hover:scale-105 transition-all shadow-lg">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-cyan-50 to-emerald-100">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: `translateY(${parallaxOffset}px)`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-200/30 rounded-full blur-2xl animate-bounce-slow"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2   px-4 py-2 rounded-full border border-teal-200 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-700">🎉 Over 10,000 students already joined</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                Discover. Register.
              </span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                Experience Events
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for college event management. 
              <span className="text-teal-600 font-semibold"> Lightning fast</span>, 
              <span className="text-cyan-600 font-semibold"> secure</span>, and 
              <span className="text-emerald-600 font-semibold"> beautiful</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => nav('/register')}
                className="group px-8 py-4 bg-cyan-500 text-white rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-teal-500/50 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <Link 
                to="/events"
                className="px-8 py-4   border border-teal-200 text-gray-700 rounded-xl font-semibold text-lg hover:bg-white transition-all duration-300 flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
                <span>Browse Events</span>
              </Link>
            </div>

            {/* Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-16">
              {stats.map((stat, i) => (
                <div 
                  key={i}
                  className="  border border-teal-100 rounded-2xl p-6 hover:bg-white hover:border-teal-300 transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-cyan-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section id="section-features" className={`py-32 relative bg-white ${isVisible['section-features'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-cyan-500 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage events, all in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-teal-300 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-teal-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Timeline */}
      <section id="section-how-it-works" className={`py-32 relative bg-cyan-500 ${isVisible['section-how-it-works'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-cyan-500 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-600">Get started in 3 simple steps</p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {howItWorks.map((item, i) => (
                <div 
                  key={i}
                  className="group relative"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  {/* Step Card */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:border-teal-300 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
                    {/* Step Number */}
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto transform group-hover:rotate-360 transition-transform duration-700 shadow-2xl text-white`}>
                      {item.icon}
                    </div>
                    
                    <div className="text-center">
                      <div className="text-teal-600 font-bold text-sm mb-2">STEP {item.step}</div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {/* Connecting Dot */}
                  <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full shadow-lg z-20 group-hover:scale-150 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-bold mb-4 text-sm tracking-wider uppercase">What's the Problem?</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Event organizers who want to manage their<br />guest list digitally face two main problems
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-cyan-500 border-l-4 border-red-400 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-red-600 font-bold text-xl mb-4">Problems with ticket delivery</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">❌</span>
                    <span>Ticket ended up in spam?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">❌</span>
                    <span>E-Mail missed?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">❌</span>
                    <span>Typo in the email address?</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-500 border-l-4 border-cyan-300 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-cyan-500 font-bold text-xl mb-4">Access management chaos</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-500 text-xl">⚠️</span>
                    <span>Long queues at entrance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-500 text-xl">⚠️</span>
                    <span>Manual verification is slow</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-500 text-xl">⚠️</span>
                    <span>No real-time attendance tracking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="bg-cyan-500 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center text-2xl">✅</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Our Solution</h3>
                      <p className="text-gray-600">EventSync solves this!</p>
                    </div>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-2xl">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Instant QR Code Delivery</p>
                        <p className="text-sm text-gray-600">Direct to email, no spam issues</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-2xl">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Lightning Fast Check-in</p>
                        <p className="text-sm text-gray-600">Scan QR code in 2 seconds</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-2xl">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">Real-time Analytics</p>
                        <p className="text-sm text-gray-600">Track who attended instantly</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 text-2xl">✓</span>
                      <div>
                        <p className="font-semibold text-gray-900">No Hassle Management</p>
                        <p className="text-sm text-gray-600">Everything in one dashboard</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="section-pricing" className="py-32 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-bold mb-4 text-sm tracking-wider uppercase">Pricing</p>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-cyan-500 bg-clip-text text-transparent">
                Simple, transparent, and fair.
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">Start for free. No credit card required.</p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'monthly'
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'yearly'
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-teal-300 hover:shadow-2xl transition-all duration-300 relative">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">Free</span>
                </div>
                <p className="text-gray-600">Perfect for students</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">1 Event per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Up to 50 registrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">QR code generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Email notifications</span>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <svg className="w-6 h-6 text-gray-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-400">Analytics dashboard</span>
                </li>
              </ul>

              <button 
                onClick={() => nav('/register')}
                className="w-full py-4 border-2 border-teal-600 text-teal-600 rounded-xl font-bold hover:bg-teal-50 transition-all duration-300"
              >
                Get Started Free
              </button>
            </div>

            {/* Premium Plan - Featured */}
            <div className="bg-cyan-500 text-white rounded-3xl p-8 shadow-2xl transform scale-105 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ MOST POPULAR
                </span>
              </div>

              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="mb-2">
                  {activeTab === 'monthly' ? (
                    <>
                      <span className="text-3xl line-through opacity-70">₹99</span>
                      <span className="text-5xl font-bold ml-2">₹49</span>
                      <span className="text-xl opacity-80">/month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-5xl font-bold">₹470</span>
                      <span className="text-xl opacity-80">/year</span>
                    </>
                  )}
                </div>
                <p className="text-indigo-100 text-sm">• Limited time offer - 50% off</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Unlimited events</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Unlimited registrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Custom branding</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Export data</span>
                </li>
              </ul>

              <button 
                onClick={() => nav('/register')}
                className="w-full py-4 bg-white text-teal-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Premium Now
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold bg-cyan-500 bg-clip-text text-transparent">Custom</span>
                </div>
                <p className="text-gray-600">For large organizations</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Everything in Premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">API access</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">Custom integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700">SLA guarantee</span>
                </li>
              </ul>

              <button className="w-full py-4 bg-cyan-500 text-white rounded-xl font-bold hover:bg-cyan-700 transition-all duration-300 shadow-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="section-faq" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-teal-600 font-bold mb-4 text-sm tracking-wider uppercase">Got Questions? We've Got Answers!</p>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-cyan-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is EventSync?",
                a: "EventSync is a digital guest management system designed specifically for college events. With EventSync, you can quickly distribute tickets or entire ticket quotas to guests, artists, VIPs, or friends, making event management seamless and stress-free."
              },
              {
                q: "How does it work?",
                a: "Simply create an account, set up your event, and share the registration link. Attendees register online, receive instant QR codes via email, and check in at your event by scanning their codes. It's that simple!"
              },
              {
                q: "Who can use EventSync?",
                a: "EventSync is perfect for students, event organizers, college clubs, and anyone hosting events. Whether you're organizing a technical workshop, cultural fest, sports tournament, or seminar, EventSync has got you covered."
              },
              {
                q: "Is EventSync GDPR compliant?",
                a: "Yes! We take data privacy seriously. All user data is encrypted and stored securely. We comply with GDPR regulations and never share your data with third parties without explicit consent."
              },
              {
                q: "Can I customize my event page?",
                a: "Absolutely! Premium users can customize their event pages with custom branding, colors, and logos to match their event theme or organization's identity."
              },
              {
                q: "Can I rent EventSync for my event?",
                a: "Yes! We offer flexible rental options for events. Contact our sales team for custom pricing and dedicated support for your event."
              },
              {
                q: "Is there a smartphone app for Android/iOS?",
                a: "Our web platform works perfectly on all devices and browsers. A dedicated mobile app is coming soon! Stay tuned for updates."
              },
              {
                q: "Can I customize my platform to match my branding?",
                a: "Yes! Premium and Enterprise plans include custom branding options. You can add your logo, choose colors, and even use custom domains."
              }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-teal-300 transition-colors duration-300">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-8">{faq.q}</span>
                  <svg 
                    className={`w-6 h-6 text-teal-600 flex-shrink-0 transform transition-transform duration-300 ${openFAQ === i ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFAQ === i ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <Link 
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Contact Support</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Carousel */}
      <section id="section-testimonials" className={`py-32 relative bg-white ${isVisible['section-testimonials'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-cyan-500 bg-clip-text text-transparent">
                Loved by Students
              </span>
            </h2>
            <p className="text-xl text-gray-600">See what our users have to say</p>
          </div>

          <div className="relative">
            {/* Testimonial Card */}
            <div className="bg-cyan-500 border border-teal-200 rounded-3xl p-12 shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="text-7xl mb-6">{testimonials[currentTestimonial].image}</div>
                
                {/* Stars */}
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-2xl text-gray-700 mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div>
                  <div className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-teal-600">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentTestimonial 
                      ? 'bg-teal-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-cyan-500">
        <div className="absolute inset-0 bg-cyan-500 opacity-50"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="bg-cyan-500 rounded-3xl p-16 text-center shadow-2xl text-white">
            <h2 className="text-5xl font-bold mb-6">
              Ready to Transform Your Events?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Join thousands of students and organizers who are already using EventSync
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => nav('/register')}
                className="px-10 py-5 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Get Started Free →
              </button>
              <Link 
                to="/admin/login"
                className="px-10 py-5   border border-white/20 rounded-xl font-bold text-lg hover: transition-all duration-300"
              >
                Admin Login
              </Link>
            </div>

            <p className="text-indigo-100 text-sm mt-6">
              No credit card required • Free forever • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🎉</span>
                <span className="text-xl font-bold bg-cyan-500 bg-clip-text text-transparent">
                  EventSync
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Making college events accessible and manageable for everyone.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#section-features" onClick={(e) => { e.preventDefault(); document.getElementById('section-features')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors cursor-pointer">Features</a></li>
                <li><a href="#section-how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('section-how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-teal-400 transition-colors cursor-pointer">How It Works</a></li>
                <li><Link to="/events" className="hover:text-teal-400 transition-colors">Browse Events</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-sm">
              © 2025 EventSync. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.430.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
