import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function AdminPanel() {
  const [showAllData, setShowAllData] = useState(false)
  const [allData, setAllData] = useState(null)
  const [allDataLoading, setAllDataLoading] = useState(false)
  const [data, setData] = useState(null)
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [analytics, setAnalytics] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, eventsRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/events')
        ])
        setData(dashRes.data)
        setEvents(eventsRes.data)
        setFilteredEvents(eventsRes.data)
        
        // Calculate analytics
        const now = new Date()
        const upcoming = eventsRes.data.filter(e => new Date(e.date) > now)
        const past = eventsRes.data.filter(e => new Date(e.date) <= now)
        const categories = {}
        eventsRes.data.forEach(e => {
          categories[e.category] = (categories[e.category] || 0) + 1
        })
        
        setAnalytics({
          upcomingEvents: upcoming.length,
          pastEvents: past.length,
          categoriesCount: Object.keys(categories).length,
          categoryData: categories,
          avgRegistrations: dashRes.data.totalRegistrations / eventsRes.data.length || 0
        })
      } catch (err) {
        console.error(err)
        if (err.response?.status === 403 || err.response?.status === 401) {
          alert('Admin access required')
          nav('/admin/login')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [nav])

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(e => e.category === categoryFilter)
    }

    // Status filter
    if (statusFilter !== 'all') {
      const now = new Date()
      if (statusFilter === 'upcoming') {
        filtered = filtered.filter(e => new Date(e.date) > now)
      } else if (statusFilter === 'past') {
        filtered = filtered.filter(e => new Date(e.date) <= now)
      }
    }

    setFilteredEvents(filtered)
  }, [searchQuery, categoryFilter, statusFilter, events])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token')
      localStorage.removeItem('adminToken')
      nav('/admin/login')
    }
  }

  const deleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return
    try {
      await api.delete(`/events/${id}`)
      const updatedEvents = events.filter(e => e._id !== id)
      setEvents(updatedEvents)
      setFilteredEvents(updatedEvents)
      alert('Event deleted')
    } catch (err) {
      console.error(err)
      alert('Failed to delete event')
    }
  }

  const getCategories = () => {
    const cats = new Set(events.map(e => e.category).filter(Boolean))
    return Array.from(cats)
  }

  const quickActions = [
    { 
      title: 'Create Event', 
      icon: '➕', 
      action: () => nav('/admin/create-event'),
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      title: 'View Analytics', 
      icon: '📊', 
      action: () => document.getElementById('analytics').scrollIntoView({ behavior: 'smooth' }),
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Export Data', 
      icon: '📥', 
      action: () => setShowAllData(true),
      color: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Refresh Data', 
      icon: '🔄', 
      action: () => window.location.reload(),
      color: 'from-orange-500 to-red-500'
    }
  ]

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading admin dashboard...</p>
      </div>
    </div>
  )
  
  if (!data) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-semibold text-gray-800">Failed to load dashboard</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header with Glassmorphism */}
      <div className="sticky top-0 z-40 backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">Welcome back! Manage your events</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/admin/all-data" 
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                All Data
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                >
                  <span className="text-xl">⚡</span>
                  Quick Actions
                </button>
                {showQuickActions && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in z-50 border border-gray-200">
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.action();
                          setShowQuickActions(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-gray-800 hover:bg-gradient-to-r ${action.color} hover:text-white transition-all duration-200 flex items-center gap-3 border-b border-gray-100 last:border-b-0`}
                      >
                        <span className="text-2xl">{action.icon}</span>
                        <span className="font-semibold">{action.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link 
                to="/admin/create-event" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* All Data Modal/Sheet */}
        {showAllData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-8 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => setShowAllData(false)}
            >
              &times;
            </button>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-cyan-500 bg-clip-text text-transparent">All Data Overview</h2>
              <div className="flex items-center gap-2">
                <select
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  value={window.downloadFormat || 'json'}
                  onChange={e => window.downloadFormat = e.target.value}
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="sheet">Sheet (Excel)</option>
                  <option value="pdf">PDF</option>
                </select>
                <button
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg font-semibold shadow hover:bg-cyan-700 transition-all"
                  onClick={() => {
                    if (!allData) return;
                    const format = window.downloadFormat || 'json';
                    if (format === 'json') {
                      const dataStr = JSON.stringify(allData, null, 2);
                      const blob = new Blob([dataStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'eventsync-data.json';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    } else if (format === 'csv') {
                      // Only export events as CSV for simplicity
                      const flatten = arr => arr.map(ev => ({
                        title: ev.title,
                        date: ev.date,
                        status: ev.status || (new Date(ev.date) > Date.now() ? 'Upcoming' : 'Current'),
                        admin: ev.admin?.name || 'Unknown',
                        registrations: ev.registrations?.length || 0
                      }));
                      const items = flatten(allData.events);
                      const csvRows = [
                        'Title,Date,Status,Admin,Registrations',
                        ...items.map(i => `${JSON.stringify(i.title)},${JSON.stringify(i.date)},${JSON.stringify(i.status)},${JSON.stringify(i.admin)},${i.registrations}`)
                      ];
                      const csvStr = csvRows.join('\n');
                      const blob = new Blob([csvStr], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'eventsync-data.csv';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    } else if (format === 'sheet') {
                      // Minimal Excel export (CSV with .xlsx extension)
                      const flatten = arr => arr.map(ev => ({
                        title: ev.title,
                        date: ev.date,
                        status: ev.status || (new Date(ev.date) > Date.now() ? 'Upcoming' : 'Current'),
                        admin: ev.admin?.name || 'Unknown',
                        registrations: ev.registrations?.length || 0
                      }));
                      const items = flatten(allData.events);
                      const csvRows = [
                        'Title,Date,Status,Admin,Registrations',
                        ...items.map(i => `${JSON.stringify(i.title)},${JSON.stringify(i.date)},${JSON.stringify(i.status)},${JSON.stringify(i.admin)},${i.registrations}`)
                      ];
                      const csvStr = csvRows.join('\n');
                      const blob = new Blob([csvStr], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'eventsync-data.xlsx';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    } else if (format === 'pdf') {
                      // Minimal PDF export using browser print
                      const flatten = arr => arr.map(ev => ({
                        title: ev.title,
                        date: ev.date,
                        status: ev.status || (new Date(ev.date) > Date.now() ? 'Upcoming' : 'Current'),
                        admin: ev.admin?.name || 'Unknown',
                        registrations: ev.registrations?.length || 0
                      }));
                      const items = flatten(allData.events);
                      let html = `<table border='1' style='border-collapse:collapse;width:100%;font-size:14px'><tr><th>Title</th><th>Date</th><th>Status</th><th>Admin</th><th>Registrations</th></tr>`;
                      items.forEach(i => {
                        html += `<tr><td>${i.title}</td><td>${i.date}</td><td>${i.status}</td><td>${i.admin}</td><td>${i.registrations}</td></tr>`;
                      });
                      html += '</table>';
                      const win = window.open('', '', 'width=900,height=700');
                      win.document.write(`<html><head><title>Eventsync Data PDF</title></head><body>${html}</body></html>`);
                      win.document.close();
                      win.print();
                    }
                  }}
                >
                  Download Data
                </button>
              </div>
            </div>
            {allDataLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-teal-600"></div>
              </div>
            ) : allData ? (
              <div className="overflow-x-auto max-h-[60vh]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-cyan-500">
                      <th className="p-3 text-left">Event Title</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3 text-left">Admin</th>
                      <th className="p-3 text-left">Registrations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {allData.events.map(ev => (
                      <tr key={ev._id}>
                        <td className="p-3 font-semibold">{ev.title}</td>
                        <td className="p-3">{new Date(ev.date).toLocaleDateString()}</td>
                        <td className="p-3">{ev.status || (new Date(ev.date) > Date.now() ? 'Upcoming' : 'Current')}</td>
                        <td className="p-3">{ev.admin?.name || 'Unknown'}</td>
                        <td className="p-3">
                          {ev.registrations && ev.registrations.length > 0 ? (
                            <details>
                              <summary className="cursor-pointer text-teal-600 underline">{ev.registrations.length} students</summary>
                              <ul className="mt-2">
                                {ev.registrations.map(reg => (
                                  <li key={reg._id} className="mb-1">
                                    <span className="font-medium">{reg.user?.name || 'Unknown'}</span> - <span className="text-xs text-gray-500">{reg.user?.email}</span>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          ) : '0'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-2">Admins</h3>
                  <ul className="list-disc ml-6">
                    {allData.admins.map(ad => (
                      <li key={ad._id}>
                        <span className="font-semibold">{ad.name}</span> - <span className="text-xs text-gray-500">{ad.email}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-2">Students</h3>
                  <ul className="list-disc ml-6">
                    {allData.students.map(st => (
                      <li key={st._id}>
                        <span className="font-semibold">{st.name}</span> - <span className="text-xs text-gray-500">{st.email}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No data found.</div>
            )}
          </div>
        </div>
      )}

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">📅</div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2">{data.totalEvents}</div>
            <div className="text-cyan-100 font-medium">Total Events</div>
            <div className="mt-3 flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full w-fit">
              <span>↗</span>
              <span>+{analytics?.upcomingEvents || 0} upcoming</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">👥</div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2">{data.totalRegistrations}</div>
            <div className="text-green-100 font-medium">Total Registrations</div>
            <div className="mt-3 flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full w-fit">
              <span>📈</span>
              <span>Avg: {analytics?.avgRegistrations.toFixed(1) || 0}/event</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">🎯</div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2">{analytics?.upcomingEvents || 0}</div>
            <div className="text-purple-100 font-medium">Upcoming Events</div>
            <div className="mt-3 flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full w-fit">
              <span>⏱️</span>
              <span>{analytics?.pastEvents || 0} completed</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="text-5xl group-hover:scale-110 transition-transform">📊</div>
              <div className="bg-white/20 p-3 rounded-xl">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2">{analytics?.categoriesCount || 0}</div>
            <div className="text-orange-100 font-medium">Event Categories</div>
            <div className="mt-3 flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full w-fit">
              <span>🏷️</span>
              <span>Diverse content</span>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div id="analytics" className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Events by Category
            </h3>
            <div className="space-y-4">
              {analytics && Object.entries(analytics.categoryData).map(([category, count]) => {
                const percentage = (count / events.length) * 100
                const colors = ['bg-cyan-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-orange-500', 'bg-blue-500', 'bg-red-500', 'bg-indigo-500', 'bg-yellow-500']
                const colorIndex = Object.keys(analytics.categoryData).indexOf(category) % colors.length
                
                return (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{category}</span>
                      <span className="text-sm text-gray-600">{count} events ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full ${colors[colorIndex]} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🔔</span>
              Recent Activity
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {data.recentRegs.slice(0, 8).map((r, i) => (
                <div key={r._id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    i % 3 === 0 ? 'bg-cyan-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'
                  }`}>
                    {r.user?.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{r.user?.name || 'Unknown User'}</div>
                    <div className="text-sm text-gray-600">Registered for {r.event?.title || 'Event deleted'}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(r.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-3xl">🎯</span>
              Event Management
            </h2>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-64 pl-10 pr-4 py-2 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:outline-none transition-all"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:outline-none transition-all font-semibold"
              >
                <option value="all">All Categories</option>
                {getCategories().map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:outline-none transition-all font-semibold"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-gray-600">
            Showing <span className="font-bold text-cyan-600">{filteredEvents.length}</span> of <span className="font-bold">{events.length}</span> events
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <tr>
                  <th className="text-left p-4 font-semibold">Event</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Location</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-right p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event, index) => {
                  const isUpcoming = new Date(event.date) > new Date()
                  return (
                    <tr key={event._id} className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200">
                      <td className="p-4">
                        <div className="font-semibold text-gray-800">{event.title}</div>
                        <div className="text-xs text-gray-500">{event.description?.substring(0, 50)}...</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="p-4 text-sm text-gray-600">{event.location}</td>
                      <td className="p-4">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {event.category || 'General'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isUpcoming 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {isUpcoming ? '🟢 Upcoming' : '⚪ Past'}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <Link 
                          to={`/events/${event._id}`}
                          className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                          View
                        </Link>
                        <button 
                          onClick={() => deleteEvent(event._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Export Data Modal */}
      {showAllData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full mx-4 p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => setShowAllData(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                📊 Complete Data Export
              </h2>
              <p className="text-gray-600">Download all your data in various formats</p>
            </div>

            <div className="flex items-center gap-4 mb-8 bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:outline-none font-semibold"
                  value={window.downloadFormat || 'json'}
                  onChange={e => window.downloadFormat = e.target.value}
                >
                  <option value="json">📄 JSON Format</option>
                  <option value="csv">📊 CSV (Spreadsheet)</option>
                </select>
              </div>
              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                onClick={async () => {
                  setAllDataLoading(true)
                  try {
                    const res = await api.get('/admin/all-data')
                    const allData = res.data
                    const format = window.downloadFormat || 'json'
                    
                    if (format === 'json') {
                      const dataStr = JSON.stringify(allData, null, 2)
                      const blob = new Blob([dataStr], { type: 'application/json' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `eventsync-data-${new Date().toISOString().split('T')[0]}.json`
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                    } else if (format === 'csv') {
                      const flatten = arr => arr.map(ev => ({
                        title: ev.title,
                        date: ev.date,
                        location: ev.location,
                        category: ev.category,
                        status: new Date(ev.date) > Date.now() ? 'Upcoming' : 'Past',
                        registrations: ev.registrations?.length || 0
                      }))
                      const items = flatten(allData.events)
                      const csvRows = [
                        'Title,Date,Location,Category,Status,Registrations',
                        ...items.map(i => `"${i.title}","${i.date}","${i.location}","${i.category}","${i.status}",${i.registrations}`)
                      ]
                      const csvStr = csvRows.join('\n')
                      const blob = new Blob([csvStr], { type: 'text/csv' })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = `eventsync-data-${new Date().toISOString().split('T')[0]}.csv`
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                    }
                    setAllData(allData)
                    alert('Data exported successfully!')
                  } catch (err) {
                    alert('Failed to fetch data')
                  }
                  setAllDataLoading(false)
                }}
              >
                {allDataLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Data
                  </>
                )}
              </button>
            </div>

            {allData && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📊</span> Data Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-cyan-600">{allData.events.length}</div>
                      <div className="text-gray-600 font-medium">Events</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-purple-600">{allData.students.length}</div>
                      <div className="text-gray-600 font-medium">Students</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-pink-600">{allData.admins.length}</div>
                      <div className="text-gray-600 font-medium">Admins</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-sm">
                      <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white sticky top-0">
                        <tr>
                          <th className="p-4 text-left font-semibold">Event Title</th>
                          <th className="p-4 text-left font-semibold">Date</th>
                          <th className="p-4 text-left font-semibold">Category</th>
                          <th className="p-4 text-left font-semibold">Location</th>
                          <th className="p-4 text-left font-semibold">Registrations</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {allData.events.map((ev, i) => (
                          <tr key={ev._id} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="p-4 font-semibold text-gray-800">{ev.title}</td>
                            <td className="p-4 text-gray-600">{new Date(ev.date).toLocaleDateString()}</td>
                            <td className="p-4">
                              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                                {ev.category}
                              </span>
                            </td>
                            <td className="p-4 text-gray-600">{ev.location}</td>
                            <td className="p-4">
                              {ev.registrations && ev.registrations.length > 0 ? (
                                <details className="cursor-pointer">
                                  <summary className="text-cyan-600 font-semibold hover:underline">
                                    {ev.registrations.length} students
                                  </summary>
                                  <ul className="mt-2 space-y-1 ml-4">
                                    {ev.registrations.map(reg => (
                                      <li key={reg._id} className="text-xs text-gray-600">
                                        • {reg.user?.name || 'Unknown'} ({reg.user?.email})
                                      </li>
                                    ))}
                                  </ul>
                                </details>
                              ) : (
                                <span className="text-gray-400">No registrations</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
