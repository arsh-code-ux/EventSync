const Event = require('../models/Event');
const Registration = require('../models/Registration');
const Admin = require('../models/Admin');
const User = require('../models/User');
const { sendMail } = require('../utils/mailer');

const dashboard = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalRegistrations = await Registration.countDocuments();
    const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(5);
    const recentRegs = await Registration.find().sort({ createdAt: -1 }).limit(10).populate('user event');
    res.json({ totalEvents, totalRegistrations, recentEvents, recentRegs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch dashboard' });
  }
};

const adminAllData = async (req, res) => {
  try {
    // Fetch events and populate creator
    const events = await Event.find().sort({ date: -1 }).populate('createdBy').lean();

    // For each event, attach registrations with user populated
    const eventsWithRegs = await Promise.all(events.map(async ev => {
      const regs = await Registration.find({ event: ev._id }).populate('user').lean();
      return { ...ev, registrations: regs };
    }));

    const admins = await Admin.find().select('name email createdAt').lean();
    const students = await User.find().select('name email createdAt').lean();

    return res.json({ events: eventsWithRegs, admins, students });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch all data' });
  }
}

// Send notifications to event registrants
const sendNotifications = async (req, res) => {
  try {
    const { eventId, subject, message } = req.body;
    
    if (!eventId || !subject || !message) {
      return res.status(400).json({ message: 'Event ID, subject, and message are required' });
    }

    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get all registrations for this event
    const registrations = await Registration.find({ event: eventId }).populate('user');
    
    if (registrations.length === 0) {
      return res.status(400).json({ message: 'No registrations found for this event' });
    }

    // Send email to all registered users
    const emailPromises = registrations.map(reg => {
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">EventSync Notification</h2>
          <h3>Event: ${event.title}</h3>
          <p>Hi ${reg.user.name},</p>
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            ${message}
          </div>
          <p><strong>Event Details:</strong></p>
          <ul>
            <li>Date: ${new Date(event.date).toLocaleDateString()}</li>
            <li>Time: ${event.time}</li>
            <li>Location: ${event.location}</li>
          </ul>
          <p>See you at the event!</p>
          <p style="color: #666; font-size: 12px;">This is an automated notification from EventSync</p>
        </div>
      `;
      
      return sendMail({
        to: reg.user.email,
        subject: `[EventSync] ${subject}`,
        html
      }).catch(err => {
        console.error(`Failed to send email to ${reg.user.email}:`, err.message);
        return { error: true, email: reg.user.email };
      });
    });

    const results = await Promise.all(emailPromises);
    const failed = results.filter(r => r && r.error);
    
    res.json({ 
      message: `Notifications sent to ${registrations.length - failed.length} users`,
      total: registrations.length,
      sent: registrations.length - failed.length,
      failed: failed.length
    });
  } catch (err) {
    console.error('Send notifications error:', err);
    res.status(500).json({ message: 'Failed to send notifications' });
  }
};

module.exports = { dashboard, adminAllData, sendNotifications };
