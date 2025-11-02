import React, { createContext, useState, useEffect } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('eventsync_token')
    const userStr = localStorage.getItem('eventsync_user')
    if (token && userStr) setUser(JSON.parse(userStr))
  }, [])

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      const { token, user } = res.data
      localStorage.setItem('eventsync_token', token)
      localStorage.setItem('eventsync_user', JSON.stringify(user))
      setUser(user)
      return res
    } catch (err) {
      throw err
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password })
      const { token, user } = res.data
      localStorage.setItem('eventsync_token', token)
      localStorage.setItem('eventsync_user', JSON.stringify(user))
      setUser(user)
      return res
    } catch (err) {
      console.error('Register error:', err)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('eventsync_token')
    localStorage.removeItem('eventsync_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}
