import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function QrDetails() {
  const { code } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    api.post('/register/scan', { code })
      .then(res => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Invalid or expired QR code');
        setLoading(false);
      });
  }, [code]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">{error}</div>;
  if (!details) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-teal-700">Registration Details</h2>
        <p><strong>Name:</strong> {details.name}</p>
        <p><strong>Email:</strong> {details.email}</p>
        <p><strong>Phone:</strong> {details.phone}</p>
        <p><strong>Event:</strong> {details.eventTitle}</p>
        <p><strong>Status:</strong> Registered</p>
      </div>
    </div>
  );
}
