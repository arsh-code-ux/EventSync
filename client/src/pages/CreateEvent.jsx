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
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
    }
    reader.readAsDataURL(file)
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const eventData = { title, description, date, time, category, location }
      if (image) eventData.image = image

      await api.post('/events', eventData)
      alert('Event created successfully!')
      nav('/admin')
    } catch (err) {
      console.error(err)
      setError(err?.response?.data?.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Event Title *</label>
          <input 
            type="text"
            value={title} 
            onChange={e=>setTitle(e.target.value)} 
            placeholder="Annual Tech Fest 2025" 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            value={description} 
            onChange={e=>setDescription(e.target.value)} 
            placeholder="Event description..." 
            rows="4"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input 
              type="date"
              value={date} 
              onChange={e=>setDate(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input 
              type="time"
              value={time} 
              onChange={e=>setTime(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              value={category} 
              onChange={e=>setCategory(e.target.value)} 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Select category</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <input 
              type="text"
              value={location} 
              onChange={e=>setLocation(e.target.value)} 
              placeholder="College Auditorium" 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Event Image</label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageUpload} 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500 outline-none"
          />
          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded" />
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-medium transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
          <button 
            type="button"
            onClick={() => nav('/admin')}
            className="px-6 py-2 border rounded hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
