import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const Events = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setLoading(false);
    }
  };

  const handleRegister = (event) => {
    if (!user) {
      alert('Please login to register for events.');
      navigate('/login');
      return;
    }
    navigate(`/events/${event._id}/register`);
  };

  const categories = ['All', 'Technology', 'Sports', 'Arts', 'Music', 'Business', 'Science', 'Education', 'Health', 'Other'];
  const filteredEvents = selectedCategory === 'All' ? events : events.filter(e => e.category === selectedCategory);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-cyan-500">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-teal-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <div className="inline-block mb-4">
              <span className="bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                OUR EVENTS
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Explore Amazing <span className="text-cyan-500">Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover and register for exciting college events. From tech workshops to cultural festivals, find your next experience here.
            </p>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Filter by Category</h2>
            <span className="text-gray-600 font-semibold">{filteredEvents.length} Events Found</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-cyan-700 hover:text-cyan-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-3xl shadow-lg p-12 max-w-lg mx-auto border border-gray-200">
                <div className="w-24 h-24 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Events Found</h3>
                <p className="text-gray-600">No events available in this category at the moment. Check back soon!</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event._id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image?.url || getCategoryImage(event.category)}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-white bg-opacity-90  rounded-2xl px-3 py-2 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs font-semibold text-gray-600 uppercase">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time || new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      {event.maxParticipants && (
                        <div className="flex items-center text-sm text-gray-700">
                          <svg className="w-5 h-5 mr-3 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span>{event.maxParticipants} participants max</span>
                        </div>
                      )}
                    </div>

                    {/* Register Button */}
                    <button
                      onClick={() => handleRegister(event)}
                      className="w-full bg-cyan-500 hover:bg-cyan-700 text-white py-3 px-6 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>Register Now</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
