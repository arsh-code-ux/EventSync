import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import QRCode from 'react-qr-code';

export default function EventRegistration() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [admitCard, setAdmitCard] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    college: '',
    branch: '',
    year: '',
    rollNumber: '',
    address: '',
    emergencyContact: '',
    specialRequirements: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      alert('Please login to register for events');
      navigate('/login');
      return;
    }

    api.get(`/events/${id}`)
      .then(res => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        alert('Event not found');
        navigate('/events');
      });
  }, [id, user, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.college.trim()) newErrors.college = 'College name is required';
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    else if (!/^\d{10}$/.test(formData.emergencyContact)) newErrors.emergencyContact = 'Invalid emergency contact';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill all required fields correctly');
      return;
    }

    setSubmitting(true);
    
    try {
      const response = await api.post('/register', {
        eventId: id,
        ...formData
      });

      // Generate admit card data
      const registration = response.data.registration;
      const qrData = `EVENT:${id}|USER:${user._id}|REG:${registration._id}`;
      
      setAdmitCard({
        ...registration,
        qrData,
        registrationNumber: `EVT${Date.now().toString().slice(-8)}`,
        registrationDate: new Date().toLocaleDateString(),
        eventDetails: event
      });

      setShowForm(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
          <p className="text-gray-600 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) return null;

  // Admit Card View
  if (admitCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Message */}
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 mb-8 text-center no-print">
            <h2 className="text-3xl font-bold text-green-800 mb-2">Registration Successful!</h2>
            <p className="text-green-700 text-lg">Your admit card has been generated. Please save it for event entry.</p>
          </div>

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
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <QRCode value={admitCard.qrData} size={150} className="mx-auto" />
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
                        <p className="font-bold text-cyan-600 text-lg">{admitCard.registrationNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Registration Date</p>
                        <p className="font-semibold">{admitCard.registrationDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-semibold">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-sm">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-semibold">{formData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Roll Number</p>
                        <p className="font-semibold">{formData.rollNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">College</p>
                        <p className="font-semibold">{formData.college}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Branch & Year</p>
                        <p className="font-semibold">{formData.branch} - {formData.year}</p>
                      </div>
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
  }

  // Registration Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Event Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-8">
            <h1 className="text-4xl font-extrabold mb-2">{event.title}</h1>
            <p className="text-cyan-100 text-lg">{event.description}</p>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-bold text-gray-800">{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-bold text-gray-800">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏷️</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-bold text-gray-800">{event.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!showForm ? (
          /* Registration Landing */
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="text-7xl mb-6">🎓</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Event Registration</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Complete your registration to receive an official admit card. Please fill all required details accurately.
            </p>
            
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6 mb-8 max-w-xl mx-auto">
              <h3 className="font-bold text-gray-800 mb-4">What you'll need:</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">✓</span>
                  <span>Personal information (Name, Email, Phone)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">✓</span>
                  <span>College details (Name, Branch, Year, Roll Number)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">✓</span>
                  <span>Emergency contact number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600">✓</span>
                  <span>Address for correspondence</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <span>Proceed to Registration Form</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          /* Registration Form */
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Emergency Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="Emergency contact number"
                      maxLength="10"
                    />
                    {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                    placeholder="Your complete address"
                    rows="2"
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Academic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      College/University Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.college ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="Enter college name"
                    />
                    {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Branch/Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.branch ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="e.g., Computer Science"
                    />
                    {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.year ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Final Year">Final Year</option>
                    </select>
                    {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.rollNumber ? 'border-red-500' : 'border-gray-300'} focus:border-cyan-500 focus:outline-none`}
                      placeholder="Enter roll number"
                    />
                    {errors.rollNumber && <p className="text-red-500 text-sm mt-1">{errors.rollNumber}</p>}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Requirements (if any)
                  </label>
                  <textarea
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-cyan-500 focus:outline-none"
                    placeholder="Any dietary restrictions, accessibility needs, etc."
                    rows="3"
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-5 h-5" />
                  <span className="text-sm text-gray-700">
                    I agree to the terms and conditions. I confirm that all information provided is accurate and I will follow all event guidelines.
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 justify-end pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-100 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-12 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Registration</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
