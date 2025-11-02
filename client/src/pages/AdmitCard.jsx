import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import QRCode from 'react-qr-code';

const AdmitCard = () => {
  const { registrationId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      alert('Please login to view admit card');
      navigate('/login');
      return;
    }
    fetchRegistration();
  }, [registrationId, user, navigate]);

  const fetchRegistration = async () => {
    try {
      const token = localStorage.getItem('eventsync_token');
      const response = await api.get('/register/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const reg = response.data.find(r => r._id === registrationId);
      if (!reg) {
        alert('Registration not found');
        navigate('/dashboard');
        return;
      }
      
      setRegistration(reg);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching registration:', err);
      alert('Failed to load admit card');
      navigate('/dashboard');
    }
  };

  const downloadAdmitCard = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading admit card...</p>
        </div>
      </div>
    );
  }

  if (!registration) return null;

  const event = registration.event;
  const qrData = `EVENT:${event._id}|USER:${user._id}|REG:${registration._id}`;
  const registrationNumber = `EVT${registration._id.slice(-8).toUpperCase()}`;
  const registrationDate = new Date(registration.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Admit Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-cyan-500" id="admit-card">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-8 text-center">
            <h1 className="text-4xl font-extrabold mb-2">ADMIT CARD</h1>
            <p className="text-xl">EventSync College</p>
            <p className="text-cyan-100 mt-2">Official Event Registration</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left: Participant Photo & QR */}
              <div className="text-center">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-6xl font-bold mb-4">
                  {(registration.name || user.name).charAt(0).toUpperCase()}
                </div>
                <div className="bg-gray-100 p-4 rounded-xl">
                  <QRCode value={qrData} size={150} className="mx-auto" />
                  <p className="text-xs text-gray-600 mt-2">Scan for verification</p>
                </div>
              </div>

              {/* Middle: Participant Details */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-gradient-to-r from-cyan-50 to-teal-50 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Participant Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Registration No.</p>
                      <p className="font-bold text-cyan-600 text-lg">{registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Registration Date</p>
                      <p className="font-semibold">{registrationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold">{registration.name || user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-sm">{registration.email || user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold">{registration.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Roll Number</p>
                      <p className="font-semibold">{registration.rollNumber || 'N/A'}</p>
                    </div>
                    {registration.college && (
                      <div>
                        <p className="text-sm text-gray-600">College</p>
                        <p className="font-semibold">{registration.college}</p>
                      </div>
                    )}
                    {registration.branch && registration.year && (
                      <div>
                        <p className="text-sm text-gray-600">Branch & Year</p>
                        <p className="font-semibold">{registration.branch} - {registration.year}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Details */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Event Details</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Event Name</p>
                      <p className="font-bold text-lg text-purple-600">{event.title}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-semibold">{event.time || '10:00 AM'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Venue</p>
                        <p className="font-semibold">{event.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-semibold">{event.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <span>⚠️</span> Important Instructions
              </h4>
              <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                <li>Carry this admit card and a valid ID proof on the event day</li>
                <li>Report to the venue 15 minutes before the scheduled time</li>
                <li>This admit card is non-transferable</li>
                <li>Follow all event guidelines and instructions</li>
              </ul>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t-2 border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-2">This is a computer-generated admit card. No signature required.</p>
              <p className="text-xs text-gray-500">For queries, contact: events@eventsync.edu | +91-1234567890</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8 no-print">
          <button
            onClick={downloadAdmitCard}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download / Print Admit Card
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
          }
          #admit-card {
            box-shadow: none;
            border: 2px solid #000;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmitCard;
