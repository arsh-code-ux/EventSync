import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import api from '../api/axios';

export default function CheckInScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (data) => {
    if (data) {
      setLoading(true);
      setError('');
      try {
        // Send QR data to backend to get student/registration info
        const res = await api.post('/register/scan', { qr: data });
        setScanResult(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Scan failed');
        setScanResult(null);
      }
      setLoading(false);
    }
  };

  const handleError = (err) => {
    setError('Scanner error');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 p-8">
      <h1 className="text-4xl font-bold mb-6">Student Check-In Scanner</h1>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '100%' }}
        />
      </div>
      {loading && <div className="text-teal-600 font-semibold">Loading...</div>}
      {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
      {scanResult && (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Student Details</h2>
          <p><strong>Name:</strong> {scanResult.user?.name}</p>
          <p><strong>Email:</strong> {scanResult.user?.email}</p>
          <h2 className="text-xl font-bold mt-4 mb-2">Registration Details</h2>
          <p><strong>Event:</strong> {scanResult.event?.title}</p>
          <p><strong>Date:</strong> {scanResult.event?.date}</p>
          <p><strong>Location:</strong> {scanResult.event?.location}</p>
          <p><strong>Checked In:</strong> {scanResult.checkedIn ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
}
