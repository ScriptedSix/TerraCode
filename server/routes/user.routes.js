const express = require('express');
const router = express.Router();
const { 
  getUserById, 
  updateUser, 
  deleteUser, 
  uploadProfilePicture,
  getAllUsers,
  adminDeleteUser
} = require('../controllers/user.controller');
const { verifyToken, authorize } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

// Public routes
router.get('/:id', getUserById);

// Protected routes
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/upload-profile-picture', verifyToken, upload.single('profilePicture'), uploadProfilePicture);

// Admin routes
router.get('/', verifyToken, authorize('admin'), getAllUsers);
router.delete('/admin/:id', verifyToken, authorize('admin'), adminDeleteUser);

module.exports = router;