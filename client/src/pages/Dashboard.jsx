import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all, upcoming, past
  const [view, setView] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('eventsync_token');
      if (!token) {
        setError('Please login to view your registrations');
        setLoading(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }
      const response = await api.get('/register/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Registration fetch error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to fetch registrations');
      setLoading(false);
    }
  };

  const now = new Date();
  const totalEvents = registrations.length;
  const upcomingEvents = registrations.filter(reg => new Date(reg.event.date) > now);
  const pastEvents = registrations.filter(reg => new Date(reg.event.date) <= now);
  const attendedEvents = registrations.filter(reg => reg.checkedIn).length;

  // Filter logic
  const getFilteredEvents = () => {
    let filtered = registrations;

    // Tab filter
    if (activeTab === 'upcoming') {
      filtered = upcomingEvents;
    } else if (activeTab === 'past') {
      filtered = pastEvents;
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(reg =>
        reg.event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.event.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.event.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(reg => reg.event.category === categoryFilter);
    }

    return filtered;
  };

  const filteredEvents = getFilteredEvents();
  const categories = [...new Set(registrations.map(reg => reg.event.category))];

  const getCategoryIcon = (category) => {
    const icons = {
      'Technology': '💻', 'Sports': '⚽', 'Arts': '🎨', 'Music': '🎵',
      'Business': '💼', 'Science': '🔬', 'Education': '📚', 'Health': '🏥', 'Other': '📌'
    };
    return icons[category] || icons['Other'];
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'from-blue-500 to-indigo-500', 'Sports': 'from-green-500 to-emerald-500',
      'Arts': 'from-purple-500 to-pink-500', 'Music': 'from-pink-500 to-rose-500',
      'Business': 'from-yellow-500 to-orange-500', 'Science': 'from-teal-500 to-cyan-500',
      'Education': 'from-red-500 to-pink-500', 'Health': 'from-teal-500 to-green-500',
      'Other': 'from-gray-500 to-gray-600'
    };
    return colors[category] || colors['Other'];
  };

  const getCategoryImage = (category) => {
    const images = {
      'Technology': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
      'Arts': 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
      'Music': 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400&h=300&fit=crop',
      'Business': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop',
      'Science': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
      'Education': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
      'Health': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    };
    return images[category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop';
  };

  const EventCard = ({ registration }) => {
    const { event, checkedIn } = registration;
    const eventDate = new Date(event.date);
    const isUpcoming = eventDate > now;
    const daysUntil = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24));

    return view === 'grid' ? (
      <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image?.url || getCategoryImage(event.category)}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(event.category)} opacity-20`}></div>
          
          {/* Status badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {checkedIn && (
              <div className="bg-green-500 rounded-full px-3 py-1 shadow-lg flex items-center gap-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-xs font-bold">Attended</span>
              </div>
            )}
            {isUpcoming && daysUntil <= 7 && (
              <div className="bg-orange-500 rounded-full px-3 py-1 shadow-lg animate-pulse">
                <span className="text-white text-xs font-bold">In {daysUntil} days</span>
              </div>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <div className={`bg-gradient-to-r ${getCategoryColor(event.category)} rounded-full px-3 py-1 shadow-lg`}>
              <span className="text-white text-xs font-bold">{getCategoryIcon(event.category)} {event.category}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

          {/* Event details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium">{event.time || eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium line-clamp-1">{event.location}</span>
            </div>
          </div>

          {/* Action button */}
          {isUpcoming && (
            <button 
              onClick={() => navigate(`/admit-card/${registration._id}`)}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              View Admit Card
            </button>
          )}
        </div>
      </div>
    ) : (
      // List view
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex">
        <div className="w-48 h-32 flex-shrink-0">
          <img
            src={event.image?.url || getCategoryImage(event.category)}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6 flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className={`bg-gradient-to-r ${getCategoryColor(event.category)} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                {getCategoryIcon(event.category)} {event.category}
              </span>
              {checkedIn && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Attended
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {eventDate.toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {event.location}
              </span>
            </div>
          </div>
          {isUpcoming && (
            <button 
              onClick={() => navigate(`/admit-card/${registration._id}`)}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-2 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View Admit Card
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-extrabold mb-2">
                <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Welcome back, {user?.name}!
                </span>
                <span className="ml-3">👋</span>
              </h1>
              <p className="text-gray-600 text-lg">Track your registered events and attendance</p>
            </div>
            <button
              onClick={() => setShowStats(!showStats)}
              className="bg-white rounded-xl p-3 shadow-md hover:shadow-lg transition-all"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <svg className="w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <p className="text-cyan-100 text-sm font-medium mb-1">Total Events</p>
              <p className="text-5xl font-extrabold">{totalEvents}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <svg className="w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-purple-100 text-sm font-medium mb-1">Upcoming</p>
              <p className="text-5xl font-extrabold">{upcomingEvents.length}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <svg className="w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-green-100 text-sm font-medium mb-1">Attended</p>
              <p className="text-5xl font-extrabold">{attendedEvents}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <svg className="w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-orange-100 text-sm font-medium mb-1">Past Events</p>
              <p className="text-5xl font-extrabold">{pastEvents.length}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {registrations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-100 to-teal-100 rounded-full flex items-center justify-center mb-6">
              <svg className="h-16 w-16 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">No Events Yet</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">You haven't registered for any events yet. Explore our exciting events and register now!</p>
            <Link 
              to="/events" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Events
            </Link>
          </div>
        ) : (
          <>
            {/* Filters and Tabs */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex gap-2 bg-gray-100 rounded-2xl p-1">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'all'
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All ({totalEvents})
                  </button>
                  <button
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'upcoming'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Upcoming ({upcomingEvents.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === 'past'
                        ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Past ({pastEvents.length})
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search events..."
                      className="pl-10 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:outline-none w-64"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
                    ))}
                  </select>

                  {/* View Toggle */}
                  <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setView('grid')}
                      className={`p-3 rounded-lg transition-all ${
                        view === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setView('list')}
                      className={`p-3 rounded-lg transition-all ${
                        view === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                      }`}
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Results count */}
              {(searchQuery || categoryFilter !== 'all') && (
                <div className="mt-4 text-gray-600">
                  Showing <span className="font-bold text-cyan-600">{filteredEvents.length}</span> of <span className="font-bold">{activeTab === 'all' ? totalEvents : activeTab === 'upcoming' ? upcomingEvents.length : pastEvents.length}</span> events
                </div>
              )}
            </div>

            {/* Events Display */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredEvents.map((registration) => (
                  <EventCard key={registration._id} registration={registration} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
