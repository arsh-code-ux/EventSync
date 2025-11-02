import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function AdminAllData() {
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState('registrations'); // registrations, events, students
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Check for both adminToken and regular token
      const token = localStorage.getItem('adminToken') || localStorage.getItem('eventsync_token') || localStorage.getItem('token');
      
      if (!token) {
        navigate('/admin/login', { state: { from: '/admin/all-data' } });
        return;
      }

      // Fetch all registrations with populated data
      const [eventsRes, usersRes] = await Promise.all([
        api.get('/events', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/admin/users', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] }))
      ]);

      setEvents(eventsRes.data);
      setUsers(usersRes.data);

      // Fetch registrations for each event
      const allRegs = [];
      for (const event of eventsRes.data) {
        try {
          const regRes = await api.get(`/admin/events/${event._id}/registrations`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          regRes.data.forEach(reg => {
            allRegs.push({
              ...reg,
              eventTitle: event.title,
              eventCategory: event.category,
              eventDate: event.date,
              eventLocation: event.location,
              eventId: event._id
            });
          });
        } catch (err) {
          console.log(`No registrations for event: ${event.title}`);
        }
      }

      setAllRegistrations(allRegs);
      setFilteredData(allRegs);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  // Filter data
  useEffect(() => {
    let filtered = allRegistrations;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(reg => 
        reg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.phone?.includes(searchQuery) ||
        reg.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.eventTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.college?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Event filter
    if (eventFilter !== 'all') {
      filtered = filtered.filter(reg => reg.eventId === eventFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const regDate = new Date(filtered[0]?.createdAt);
      
      if (dateFilter === 'today') {
        filtered = filtered.filter(reg => {
          const d = new Date(reg.createdAt);
          return d.toDateString() === now.toDateString();
        });
      } else if (dateFilter === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        filtered = filtered.filter(reg => new Date(reg.createdAt) >= weekAgo);
      } else if (dateFilter === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filtered = filtered.filter(reg => new Date(reg.createdAt) >= monthAgo);
      }
    }

    setFilteredData(filtered);
  }, [searchQuery, eventFilter, dateFilter, allRegistrations]);

  // Download as CSV
  const downloadCSV = () => {
    const headers = ['Registration ID', 'Name', 'Email', 'Phone', 'College', 'Branch', 'Year', 'Roll Number', 'Event Name', 'Event Category', 'Event Date', 'Event Location', 'Registration Date', 'Emergency Contact', 'Address', 'Special Requirements'];
    
    const csvData = filteredData.map(reg => [
      reg._id,
      reg.name || 'N/A',
      reg.email || 'N/A',
      reg.phone || 'N/A',
      reg.college || 'N/A',
      reg.branch || 'N/A',
      reg.year || 'N/A',
      reg.rollNumber || 'N/A',
      reg.eventTitle || 'N/A',
      reg.eventCategory || 'N/A',
      new Date(reg.eventDate).toLocaleDateString(),
      reg.eventLocation || 'N/A',
      new Date(reg.createdAt).toLocaleDateString(),
      reg.emergencyContact || 'N/A',
      reg.address || 'N/A',
      reg.specialRequirements || 'N/A'
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Download as JSON
  const downloadJSON = () => {
    const json = JSON.stringify(filteredData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-registrations-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Download as PDF
  const downloadPDF = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Event Registrations Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #0891b2; text-align: center; }
            .meta { text-align: center; margin-bottom: 20px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #0891b2; color: white; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .summary { margin: 20px 0; padding: 15px; background: #f0f9ff; border-left: 4px solid #0891b2; }
          </style>
        </head>
        <body>
          <h1>EventSync - Event Registrations Report</h1>
          <div class="meta">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Total Registrations: ${filteredData.length}</p>
          </div>
          
          <div class="summary">
            <h3>Summary Statistics</h3>
            <p>Total Events: ${events.length}</p>
            <p>Total Registrations: ${allRegistrations.length}</p>
            <p>Filtered Results: ${filteredData.length}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>College</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Roll No</th>
                <th>Event Name</th>
                <th>Category</th>
                <th>Event Date</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map((reg, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${reg.name || 'N/A'}</td>
                  <td>${reg.email || 'N/A'}</td>
                  <td>${reg.phone || 'N/A'}</td>
                  <td>${reg.college || 'N/A'}</td>
                  <td>${reg.branch || 'N/A'}</td>
                  <td>${reg.year || 'N/A'}</td>
                  <td>${reg.rollNumber || 'N/A'}</td>
                  <td>${reg.eventTitle || 'N/A'}</td>
                  <td>${reg.eventCategory || 'N/A'}</td>
                  <td>${new Date(reg.eventDate).toLocaleDateString()}</td>
                  <td>${new Date(reg.createdAt).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading all data...</p>
        </div>
      </div>
    );
  }

  const categories = {};
  filteredData.forEach(reg => {
    categories[reg.eventCategory] = (categories[reg.eventCategory] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Complete Registration Data
              </h1>
              <p className="text-gray-600">Comprehensive view of all event registrations</p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-5xl">📊</span>
              <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-1">Total Registrations</h3>
            <p className="text-4xl font-extrabold">{allRegistrations.length}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-5xl">🎯</span>
              <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-1">Total Events</h3>
            <p className="text-4xl font-extrabold">{events.length}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-5xl">🔍</span>
              <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-1">Filtered Results</h3>
            <p className="text-4xl font-extrabold">{filteredData.length}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-5xl">📂</span>
              <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-1">Categories</h3>
            <p className="text-4xl font-extrabold">{Object.keys(categories).length}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-3xl shadow-xl p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('registrations')}
              className={`flex-1 min-w-fit px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'registrations'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📊 All Registrations ({allRegistrations.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 min-w-fit px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🎯 All Events ({events.length})
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`flex-1 min-w-fit px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              👥 Students ({users.length})
            </button>
          </div>
        </div>

        {/* Filters and Search - Show only for registrations tab */}
        {activeTab === 'registrations' && (
          <>
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Filters & Search</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name, email, phone, roll number, event..."
                      className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Event Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event</label>
                  <select
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="all">All Events</option>
                    {events.map(event => (
                      <option key={event._id} value={event._id}>{event.title}</option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Registration Date</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-3xl shadow-xl p-6 mb-8 border-2 border-cyan-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Download Data</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={downloadCSV}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="text-left">
                    <div>Download as CSV</div>
                    <div className="text-xs opacity-90">Excel compatible spreadsheet</div>
                  </div>
                </button>

                <button
                  onClick={downloadJSON}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <div className="text-left">
                    <div>Download as JSON</div>
                    <div className="text-xs opacity-90">Raw data format</div>
                  </div>
                </button>

                <button
                  onClick={downloadPDF}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="text-left">
                    <div>Download as PDF</div>
                    <div className="text-xs opacity-90">Printable report</div>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Content based on active tab */}
        {activeTab === 'registrations' && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-cyan-600 to-teal-600">
            <h2 className="text-2xl font-bold text-white">Registration Records ({filteredData.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">S.No</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">College</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Branch</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Roll No</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Event Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Registered On</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
                      <div className="text-6xl mb-4">📭</div>
                      <p className="text-xl font-semibold">No registration data found</p>
                      <p className="text-sm mt-2">Try adjusting your filters or search query</p>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((reg, index) => (
                    <tr key={reg._id} className="border-b border-gray-200 hover:bg-cyan-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{reg.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.email || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.phone || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.college || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.branch || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.year || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{reg.rollNumber || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm font-medium text-purple-600">{reg.eventTitle || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-semibold">
                          {reg.eventCategory || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {reg.eventDate ? new Date(reg.eventDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* All Events Tab */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
              <h2 className="text-2xl font-bold text-white">All Events ({events.length})</h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-xl font-semibold text-gray-600">No events found</p>
                  </div>
                ) : (
                  events.map(event => {
                    const eventRegs = allRegistrations.filter(reg => reg.eventId === event._id);
                    return (
                      <div key={event._id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                          <span className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold">
                            {event.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-700">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {event.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {event.capacity} capacity
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border-2 border-purple-300">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-700">Registrations</span>
                            <span className="text-2xl font-bold text-purple-600">{eventRegs.length}</span>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            {event.capacity - eventRegs.length} spots remaining
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-emerald-600 to-green-600">
              <h2 className="text-2xl font-bold text-white">All Students ({users.length})</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">S.No</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Joined On</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Total Registrations</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                        <div className="text-6xl mb-4">👥</div>
                        <p className="text-xl font-semibold">No students found</p>
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => {
                      const userRegs = allRegistrations.filter(reg => reg.user?._id === user._id || reg.email === user.email);
                      return (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-emerald-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{user.phone || 'N/A'}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold">
                              {userRegs.length} events
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
