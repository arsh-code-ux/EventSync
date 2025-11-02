// Sample script to add test events
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event');

const sampleEvents = [
  {
    title: "Tech Fest 2025",
    description: "Annual technology festival featuring coding competitions, hackathons, and tech talks from industry experts.",
    date: new Date("2025-11-15T10:00:00"),
    time: "10:00 AM",
    category: "Technical",
    location: "College Auditorium"
  },
  {
    title: "Cultural Night",
    description: "A vibrant evening of music, dance, and drama performances by talented students.",
    date: new Date("2025-11-20T18:00:00"),
    time: "6:00 PM",
    category: "Cultural",
    location: "Open Air Theatre"
  },
  {
    title: "Web Development Workshop",
    description: "Learn modern web development with React, Node.js, and MongoDB. Hands-on coding session.",
    date: new Date("2025-11-10T14:00:00"),
    time: "2:00 PM",
    category: "Workshop",
    location: "Computer Lab A"
  }
];

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing events (optional)
    // await Event.deleteMany({});
    
    const events = await Event.insertMany(sampleEvents);
    console.log(`✓ ${events.length} sample events created!`);
    
    events.forEach(e => {
      console.log(`  - ${e.title} (${new Date(e.date).toLocaleDateString()})`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding events:', err.message);
    process.exit(1);
  }
};

seedEvents();
