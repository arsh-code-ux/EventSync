const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  // Number of consecutive wrong admin-key attempts (for login)
  adminKeyAttempts: { type: Number, default: 0 },
  // If true, admin account is blocked from login/register actions
  isBlocked: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
