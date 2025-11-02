const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/admin');
const { validateEvent } = require('../middlewares/validation');
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent } = require('../controllers/eventsController');

// public
router.get('/', getEvents);
router.get('/:id', getEvent);

// admin-protected
router.post('/', isAdmin, validateEvent, createEvent);
router.put('/:id', isAdmin, validateEvent, updateEvent);
router.delete('/:id', isAdmin, deleteEvent);

module.exports = router;
