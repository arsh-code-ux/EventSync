const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const activeEvents = await Event.countDocuments({ status: 'active' });
    
    res.json({
      totalUsers,
      totalEvents,
      activeEvents,
      totalRegistrations: totalUsers * 2 // placeholder
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.json({
      totalUsers: 0,
      totalEvents: 0,
      activeEvents: 0,
      totalRegistrations: 0
    });
  }
});

module.exports = router;
