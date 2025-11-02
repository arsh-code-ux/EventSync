const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const User = require('../models/User');
const Event = require('../models/Event');

// ...existing code...

// QR code scan endpoint
router.post('/scan', async (req, res) => {
	try {
		const { qr } = req.body;
		// Example QR format: EVENT:eventId|USER:userId
		if (!qr || !qr.startsWith('EVENT:')) return res.status(400).json({ message: 'Invalid QR code' });
		const eventMatch = qr.match(/EVENT:([^|]+)/);
		const userMatch = qr.match(/USER:([^|]+)/);
		if (!eventMatch || !userMatch) return res.status(400).json({ message: 'Invalid QR code format' });
		const eventId = eventMatch[1];
		const userId = userMatch[1];
		const registration = await Registration.findOne({ event: eventId, user: userId }).populate('user event');
		if (!registration) return res.status(404).json({ message: 'Registration not found' });
		res.json({
			user: registration.user,
			event: registration.event,
			checkedIn: registration.checkedIn,
			registrationId: registration._id
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Scan failed' });
	}
});

// ...existing code...
const auth = require('../middlewares/auth');
const { registerForEvent, getUserRegistrations } = require('../controllers/registerController');

router.post('/', auth, registerForEvent);
router.get('/me', auth, getUserRegistrations);

module.exports = router;
