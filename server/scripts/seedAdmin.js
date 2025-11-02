require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Check if admin already exists
    const existing = await Admin.findOne({ email: 'admin@eventsync.com' });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await Admin.create({
      name: 'Admin User',
      email: 'admin@eventsync.com',
      password: hashedPassword
    });

    console.log('✓ Admin user created successfully!');
    console.log('  Email:', admin.email);
    console.log('  Password: admin123');
    console.log('  (Change this password in production!)');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
