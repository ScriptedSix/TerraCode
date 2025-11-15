const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByCompany,
  adminDeleteJob
} = require('../controllers/job.controller');
const { verifyToken, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.get('/company/:companyId', getJobsByCompany);

// Protected routes (companies only)
router.post('/', verifyToken, authorize('company'), createJob);
router.put('/:id', verifyToken, updateJob);
router.delete('/:id', verifyToken, deleteJob);

// Admin routes
router.delete('/admin/:id', verifyToken, authorize('admin'), adminDeleteJob);

module.exports = router;