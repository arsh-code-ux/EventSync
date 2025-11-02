import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Dummy event data for demo
const eventsList = [
  { id: '1', name: 'Tech Symposium', date: '2025-11-10', time: '10:00 AM' },
  { id: '2', name: 'Cultural Fest', date: '2025-11-15', time: '6:00 PM' },
];

const RegisterForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { registrations, setRegistrations } = useContext(AuthContext);

  const event = eventsList.find(e => e.id === eventId);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    contact: '',
    department: '',
    eventName: event ? event.name : '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const registrationId = 'REG-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const registration = {
      ...form,
      registrationId,
      eventDate: event ? event.date : '',
      eventTime: event ? event.time : '',
    };
    setRegistrations([...registrations, registration]);
    navigate(`/admit-card/${registrationId}`);
  };

  if (!event) return <div className="py-12 text-center">Event not found.</div>;

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Register for {event.name}</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name" className="w-full border rounded px-3 py-2" />
        <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input name="contact" value={form.contact} onChange={handleChange} required placeholder="Contact Number" className="w-full border rounded px-3 py-2" />
        <input name="department" value={form.department} onChange={handleChange} required placeholder="Department / Year" className="w-full border rounded px-3 py-2" />
        <input name="eventName" value={form.eventName} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Submit Registration</button>
      </form>
    </div>
  );
};

export default RegisterForm;
