const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const register = async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: false }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password, adminKey } = req.body;
    if (!email || !password || !adminKey) return res.status(400).json({ message: 'Email, password and adminKey are required' });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid admin credentials' });

    // If account is blocked, disallow login
    if (admin.isBlocked) return res.status(403).json({ message: 'Account is blocked due to multiple failed admin key attempts' });

    // Ensure server admin passkey is configured
    const SERVER_KEY = process.env.ADMIN_PASSKEY;
    if (!SERVER_KEY) {
      console.error('ADMIN_PASSKEY not configured in environment');
      return res.status(500).json({ message: 'Server not configured for admin key authentication' });
    }

    // Check admin key first. If wrong, increment attempts and possibly block.
    if (adminKey !== SERVER_KEY) {
      admin.adminKeyAttempts = (admin.adminKeyAttempts || 0) + 1;
      if (admin.adminKeyAttempts >= 3) {
        admin.isBlocked = true;
      }
      await admin.save();
      if (admin.isBlocked) {
        return res.status(403).json({ message: 'Account blocked after multiple failed admin key attempts' });
      }
      return res.status(400).json({ message: `Invalid admin key. Attempts: ${admin.adminKeyAttempts}/3` });
    }

    // adminKey correct -> reset attempts if any
    if (admin.adminKeyAttempts && admin.adminKeyAttempts > 0) {
      admin.adminKeyAttempts = 0;
      await admin.save();
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: 'Invalid admin credentials' });
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: admin._id, name: admin.name, email: admin.email, isAdmin: true }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const adminRegister = async (req, res) => {
  try {
    const { name, email, password, adminKey } = req.body;
    if (!name || !email || !password || !adminKey) return res.status(400).json({ message: 'Name, email, password and adminKey are required' });

    // Ensure server admin passkey is configured
    const SERVER_KEY = process.env.ADMIN_PASSKEY;
    if (!SERVER_KEY) {
      console.error('ADMIN_PASSKEY not configured in environment');
      return res.status(500).json({ message: 'Server not configured for admin key authentication' });
    }

    // Require correct admin key for registration
    if (adminKey !== SERVER_KEY) {
      return res.status(400).json({ message: 'Invalid admin key' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin email already in use' });
    const hash = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hash });
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: admin._id, name: admin.name, email: admin.email, isAdmin: true }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id || req.user._id;

    // Determine if user is admin or regular user by checking the collection name
    const isAdmin = req.user.constructor.modelName === 'Admin';
    const Model = isAdmin ? Admin : User;

    // Check if email is already taken by another user in the same collection
    if (email !== req.user.email) {
      const existing = await Model.findOne({ email, _id: { $ne: userId } });
      if (existing) return res.status(400).json({ message: 'Email already in use' });
    }

    const updatedUser = await Model.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    ).select('-password');

    res.json({ user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, isAdmin } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id || req.user._id;

    // Determine if user is admin or regular user
    const isAdmin = req.user.constructor.modelName === 'Admin';
    const Model = isAdmin ? Admin : User;

    const user = await Model.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: 'Current password is incorrect' });

    // Hash and save new password
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    // Determine if user is admin or regular user
    const isAdmin = req.user.constructor.modelName === 'Admin';
    const Model = isAdmin ? Admin : User;
    
    await Model.findByIdAndDelete(userId);
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Returns whether ADMIN_PASSKEY is configured on the server
const adminKeyStatus = async (req, res) => {
  try {
    const enabled = !!process.env.ADMIN_PASSKEY;
    res.json({ enabled });
  } catch (err) {
    console.error('adminKeyStatus error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, adminLogin, adminRegister, updateProfile, changePassword, deleteAccount, adminKeyStatus };
