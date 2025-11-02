// Input validation utilities
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateRequired = (fields, body) => {
  const missing = [];
  for (const field of fields) {
    if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
      missing.push(field);
    }
  }
  return missing;
};

const validateEvent = (req, res, next) => {
  const { title, date, location } = req.body;
  
  const missing = validateRequired(['title', 'date', 'location'], req.body);
  if (missing.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  }

  // Validate date format
  const eventDate = new Date(date);
  if (isNaN(eventDate.getTime())) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  next();
};

const validateAuth = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  next();
};

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  const missing = validateRequired(['name', 'email', 'password'], req.body);
  if (missing.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' });
  }

  next();
};

module.exports = {
  validateEvent,
  validateAuth,
  validateRegistration,
  validateEmail,
  validatePassword
};
