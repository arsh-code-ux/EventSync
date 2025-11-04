import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function CreateEvent() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [capacity, setCapacity] = useState('')
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const nav = useNavigate()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
      setImagePreview(reader.result)
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('eventsync_token')
      if (!token) {
        setError('Please login as admin to create events')
        setLoading(false)
        return
      }

      const eventData = { 
        title, 
        description, 
        date, 
        time, 
        category, 
        location,
        capacity: capacity ? parseInt(capacity) : 100
      }
      if (image) eventData.image = image

      const response = await api.post('/events', eventData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setSuccess(true)
      setTimeout(() => {
        nav('/admin')
      }, 1500)
    } catch (err) {
      console.error('Create event error:', err)
      setError(err?.response?.data?.message || 'Failed to create event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold mb-3">
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              Create New Event
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Fill in the details to create an amazing event</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3 animate-fade-in">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Event created successfully! Redirecting...</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-2xl shadow-lg flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-cyan-100">
          <form onSubmit={submit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                value={title} 
                onChange={e=>setTitle(e.target.value)} 
                placeholder="Annual Tech Fest 2025" 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea 
                value={description} 
                onChange={e=>setDescription(e.target.value)} 
                placeholder="Describe your event in detail..." 
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800 resize-none"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date"
                  value={date} 
                  onChange={e=>setDate(e.target.value)} 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                <input 
                  type="time"
                  value={time} 
                  onChange={e=>setTime(e.target.value)} 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800"
                />
              </div>
            </div>

            {/* Category and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={e=>setCategory(e.target.value)} 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800 bg-white"
                >
                  <option value="">Select category</option>
                  <option value="Technology">Technology</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts">Arts</option>
                  <option value="Music">Music</option>
                  <option value="Business">Business</option>
                  <option value="Science">Science</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  value={location} 
                  onChange={e=>setLocation(e.target.value)} 
                  placeholder="College Auditorium, City" 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800"
                  required
                />
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Capacity</label>
              <input 
                type="number"
                value={capacity} 
                onChange={e=>setCapacity(e.target.value)} 
                placeholder="100" 
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all text-gray-800"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum number of participants (default: 100)</p>
            </div>

            {/* Event Image */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Event Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all">
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload} 
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-xl" />
                      <p className="text-sm text-cyan-600 font-semibold">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-600 font-medium">Click to upload event image</p>
                      <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button 
                type="submit" 
                disabled={loading || success}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Create Event</span>
                  </>
                )}
              </button>
              
              <button 
                type="button"
                onClick={() => nav('/admin')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-2xl p-6 border-2 border-cyan-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-cyan-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Tips for creating a great event</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Use a clear and descriptive title</li>
                <li>• Add detailed information in the description</li>
                <li>• Upload an attractive event image</li>
                <li>• Set the correct date, time, and location</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

