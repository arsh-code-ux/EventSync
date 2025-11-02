import React from 'react'
import { Link } from 'react-router-dom'

export default function EventCard({ event }) {
  const getCategoryColor = (category) => {
    const colors = {
      'Technical': 'bg-blue-100 text-blue-800',
      'Cultural': 'bg-purple-100 text-purple-800',
      'Sports': 'bg-green-100 text-green-800',
      'Workshop': 'bg-yellow-100 text-yellow-800',
      'Seminar': 'bg-red-100 text-red-800',
      'Other': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors['Other']
  }

  const getCategoryImage = (category) => {
    const images = {
      'Technical': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
      'Cultural': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
      'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
      'Workshop': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
      'Seminar': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    }
    return images[category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop'
  }

  const getCategoryGradient = (category) => {
    const gradients = {
      'Technical': 'from-blue-400 via-indigo-500 to-purple-600',
      'Cultural': 'from-purple-400 via-pink-500 to-red-500',
      'Sports': 'from-green-400 via-emerald-500 to-teal-600',
      'Workshop': 'from-yellow-400 via-orange-500 to-red-500',
      'Seminar': 'from-red-400 via-pink-500 to-purple-600',
    }
    return gradients[category] || 'from-indigo-400 via-purple-500 to-pink-600'
  }

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-gray-100">
      <div className="relative overflow-hidden h-56">
        {event.image?.url ? (
          <img 
            src={event.image.url} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
          />
        ) : (
          <>
            <img 
              src={getCategoryImage(event.category)} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(event.category)} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
          <span className={`${getCategoryColor(event.category)} px-4 py-2 rounded-full text-xs font-bold shadow-xl  `}>
            {event.category || 'Event'}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-2 text-white text-sm font-semibold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
            <span>Click to view details</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-teal-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
          {event.title}
        </h3>
        
        <div className="space-y-3 mb-5">
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <div className="bg-teal-100 p-2 rounded-lg mr-3 group-hover:bg-teal-200 transition-colors">
              <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          
          {event.time && (
            <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              <div className="bg-cyan-100 p-2 rounded-lg mr-3 group-hover:bg-cyan-200 transition-colors">
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">{event.time}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
            <div className="bg-emerald-100 p-2 rounded-lg mr-3 group-hover:bg-emerald-200 transition-colors">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="line-clamp-1 font-medium">{event.location}</span>
          </div>
        </div>

        <Link 
          to={`/events/${event._id}`}
          className="block w-full bg-cyan-500 hover:bg-cyan-700 text-white text-center py-3 rounded-xl font-bold transition-all duration-300 transform group-hover:scale-105 shadow-lg shadow-teal-500/50 group-hover:shadow-xl group-hover:shadow-teal-600/50"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}
