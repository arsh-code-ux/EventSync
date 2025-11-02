import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import WhyEvents from './pages/WhyEvents';
import Events from './pages/Events';
import Home from './pages/Home';
import RegisterForm from './pages/RegisterForm';
import EventRegistration from './pages/EventRegistration';
import AdmitCard from './pages/AdmitCard';
import MyRegistrations from './pages/MyRegistrations';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import AdminAllData from './pages/AdminAllData';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-events" element={<WhyEvents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id/register" element={<EventRegistration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:eventId" element={<RegisterForm />} />
        <Route path="/admit-card/:registrationId" element={<AdmitCard />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/all-data" element={<AdminAllData />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
