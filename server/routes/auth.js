const express = require('express');
const router = express.Router();
const { register, login, adminLogin, adminRegister, updateProfile, changePassword, deleteAccount } = require('../controllers/authController');
const { validateAuth, validateRegistration } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

router.post('/register', validateRegistration, register);
router.post('/login', validateAuth, login);
router.post('/admin/login', validateAuth, adminLogin);
router.post('/admin/register', validateRegistration, adminRegister);

// Profile management routes (protected)
router.put('/profile', auth, updateProfile);
router.put('/change-password', auth, changePassword);
router.delete('/profile', auth, deleteAccount);

module.exports = router;
