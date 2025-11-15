const express = require('express');
const router = express.Router();
const { getUserById, updateUser, deleteUser } = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Public route - anyone can view profiles
router.get('/:id', getUserById);

// Protected routes - must be logged in
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;