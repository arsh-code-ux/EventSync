const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/admin');
const Registration = require('../models/Registration');
const { dashboard, adminAllData, sendNotifications } = require('../controllers/adminController');

router.get('/dashboard', isAdmin, dashboard);
router.get('/all-data', isAdmin, adminAllData);
router.post('/send-notifications', isAdmin, sendNotifications);

// Get registrations for a specific event
router.get('/events/:eventId/registrations', isAdmin, async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await Registration.find({ event: eventId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    console.error('Error fetching event registrations:', err);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});

// Get all users (optional, for user management)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
