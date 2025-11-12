const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Try to find user in User collection first
    let user = await User.findById(decoded.id).select('-password');
    
    // If not found, try Admin collection
    if (!user) {
      user = await Admin.findById(decoded.id).select('-password');
    }
    
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token verification failed' });
  }
};

module.exports = auth;
