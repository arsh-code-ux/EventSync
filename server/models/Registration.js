const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  
  // Personal Information
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  emergencyContact: { type: String, required: true },
  
  // Academic Information
  college: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: String, required: true },
  rollNumber: { type: String, required: true },
  
  // Additional Information
  specialRequirements: { type: String },
  
  // Registration Details
  qrCodeDataUrl: { type: String },
  checkedIn: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
