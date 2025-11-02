const Event = require('../models/Event');
const cloudinary = require('../utils/cloudinary');

// Create event (admin)
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, category, location, image } = req.body;
    const event = { title, description, date, time, category, location };
    if (image) {
      // image can be a dataURL or remote URL
      const result = await cloudinary.uploader.upload(image, { folder: 'events' });
      event.image = { url: result.secure_url, public_id: result.public_id };
    }
    if (req.admin) event.createdBy = req.admin._id;
    const created = await Event.create(event);
    res.json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create event' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch events' });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.image) {
      const result = await cloudinary.uploader.upload(updates.image, { folder: 'events' });
      updates.image = { url: result.secure_url, public_id: result.public_id };
    }
    const event = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    // optionally remove cloudinary image
    if (event.image && event.image.public_id) {
      await cloudinary.uploader.destroy(event.image.public_id);
    }
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not delete event' });
  }
};

module.exports = { createEvent, getEvents, getEvent, updateEvent, deleteEvent };
