const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return res.status(403).json({ message: 'Admin access required' });
    req.admin = admin;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Admin authentication failed' });
  }
};

module.exports = isAdmin;
