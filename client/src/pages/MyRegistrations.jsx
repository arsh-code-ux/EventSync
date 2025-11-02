import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MyRegistrations = () => {
  const { registrations } = useContext(AuthContext);

  if (!registrations.length) {
    return <div className="py-12 text-center">No registrations found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">My Registrations</h1>
      <div className="grid gap-6">
        {registrations.map(reg => (
          <div key={reg.registrationId} className="border rounded-lg p-6 shadow-md bg-white">
            <div className="mb-2"><span className="font-semibold">Event:</span> {reg.eventName}</div>
            <div className="mb-2"><span className="font-semibold">Date & Time:</span> {reg.eventDate} at {reg.eventTime}</div>
            <div className="mb-2"><span className="font-semibold">Registration ID:</span> {reg.registrationId}</div>
            <Link to={`/admit-card/${reg.registrationId}`} className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View Admit Card</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRegistrations;
