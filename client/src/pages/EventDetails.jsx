import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { AuthContext } from '../context/AuthContext'

export default function EventDetails() {
  const { user } = useContext(AuthContext)
  const [showRegModal, setShowRegModal] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '' })
  const [formError, setFormError] = useState('')
  const [qrModal, setQrModal] = useState(false)
  const [qrCode, setQrCode] = useState('')
  const [regDetails, setRegDetails] = useState(null)
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const nav = useNavigate()

  useEffect(() => {
    setLoading(true)
    api.get(`/events/${id}`)
      .then(res => {
        setEvent(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const getCategoryImage = (category) => {
    const images = {
      'Technical': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
      'Cultural': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=600&fit=crop',
      'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=600&fit=crop',
      'Workshop': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop',
      'Seminar': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop',
    }
    return images[category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop'
  }

  const register = async () => {
    setFormError('')
    setRegistering(true)
    try {
  const res = await api.post('/register', { eventId: id, ...form })
  // Generate QR code data with public domain and correct userId
  const userId = res.data.registration.user?._id || res.data.registration.user || user?._id || '';
  const qrData = `https://eventsync.com/qr/EVENT:${id}|USER:${userId}`;
  setQrCode(qrData)
      setRegDetails(res.data)
      setShowRegModal(false)
      setQrModal(true)
    } catch (err) {
      setFormError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setRegistering(false)
    }
  }

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
    } else {
      setShowShareModal(true)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
    setShowShareModal(false)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading event details...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Event not found</h3>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist</p>
          <button onClick={() => nav('/events')} className="px-6 py-3 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-700 transition-all duration-300">
            Browse All Events
          </button>
        </div>
      </div>
    )
  }

  const eventDate = new Date(event.date)
  const isPastEvent = eventDate < new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4 animate-fade-in">
        {/* Hero Image Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-[500px] overflow-hidden group">
            {event.image?.url ? (
              <img 
                src={event.image.url} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <>
                <img 
                  src={getCategoryImage(event.category)} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/60 via-cyan-600/60 to-emerald-600/60"></div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Floating Action Buttons */}
            <div className="absolute top-6 right-6 flex gap-3">
              <button onClick={() => nav('/events')} className="  p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-110">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button onClick={shareEvent} className="  p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg transform hover:scale-110">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>

            {/* Event Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="  text-white px-6 py-2 rounded-full text-sm font-bold border border-white/30">
                  {event.category || 'Event'}
                </span>
                {isPastEvent && (
                  <span className="bg-red-500/90  text-white px-6 py-2 rounded-full text-sm font-bold">
                    Past Event
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl">{event.title}</h1>
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center gap-2   px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold">{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2   px-4 py-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold">{event.time || 'Time TBA'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              {event.description && (
                <div className="bg-cyan-500 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About this Event
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                    {event.description}
                  </p>
                </div>
              )}

              {/* Event Highlights */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Event Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl hover:bg-teal-100 transition-colors duration-300">
                    <div className="bg-teal-600 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Networking</h4>
                      <p className="text-sm text-gray-600">Connect with like-minded people</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors duration-300">
                    <div className="bg-purple-600 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Learning</h4>
                      <p className="text-sm text-gray-600">Gain valuable knowledge and skills</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors duration-300">
                    <div className="bg-pink-600 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Resources</h4>
                      <p className="text-sm text-gray-600">Access exclusive materials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors duration-300">
                    <div className="bg-green-600 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Certificate</h4>
                      <p className="text-sm text-gray-600">Receive participation certificate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-5">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="bg-teal-100 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">TIME</p>
                      <p className="text-sm font-semibold text-gray-900">{event.time || 'Time TBA'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">LOCATION</p>
                      <p className="text-sm font-semibold text-gray-900">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="bg-pink-100 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">CATEGORY</p>
                      <p className="text-sm font-semibold text-gray-900">{event.category || 'Event'}</p>
                    </div>
                  </div>
                </div>

                {/* Register Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {!isPastEvent ? (
                    user ? (
                      <button 
                        onClick={() => nav(`/events/${id}/register`)}
                        disabled={registering}
                        className="w-full bg-cyan-500 hover:bg-cyan-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/50 flex items-center justify-center gap-2"
                      >
                        Register Now
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 text-center">Please log in to register</p>
                        <button 
                          onClick={() => nav('/login')}
                          className="w-full bg-cyan-500 hover:bg-cyan-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/50"
                        >
                          Login to Register
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                      <p className="text-red-600 font-semibold">This event has ended</p>
                    </div>
                  )}
                </div>
      {/* Registration Form Modal */}
      {showRegModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4" onClick={() => setShowRegModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Register for {event.title}</h3>
            <form onSubmit={e => { e.preventDefault(); register(); }} className="space-y-4">
              <input type="text" required placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              <input type="text" required placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              {formError && <div className="text-red-600 text-sm mb-2">{formError}</div>}
              <button type="submit" disabled={registering} className="w-full bg-cyan-500 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50">{registering ? 'Registering...' : 'Submit & Get QR'}</button>
            </form>
            <button onClick={() => setShowRegModal(false)} className="mt-4 w-full px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-all duration-300">Cancel</button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4" onClick={() => setQrModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Event QR Code</h3>
            <p className="text-gray-600 mb-6">Show this QR code at the event entrance</p>
            <div className="flex justify-center mb-6">
              {/* Use a QR code library or external API for rendering */}
              <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCode)}&size=200x200`} alt="Event QR" className="rounded-xl shadow-lg" />
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-700">
                <p className="font-semibold">Event:</p>
                <p className="mt-2">{event.title}</p>
                <p>{eventDate.toLocaleDateString()} {event.time}</p>
                <p>{event.location}</p>
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <p className="font-semibold">Your Details:</p>
                <p className="mt-2">{form.name}</p>
                <p>{form.email}</p>
                <p>{form.phone}</p>
              </div>
            </div>
            <button onClick={() => setQrModal(false)} className="w-full bg-cyan-500 text-white py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all duration-300">Close</button>
          </div>
        </div>
      )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Share Event</h3>
            <p className="text-gray-600 mb-6">Share this event with your friends!</p>
            <div className="flex gap-3">
              <button onClick={copyLink} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Copy Link
              </button>
              <button onClick={() => setShowShareModal(false)} className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-all duration-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
