const express = require('express');
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/application.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// All routes require authentication
router.post('/', verifyToken, applyToJob);
router.get('/my-applications', verifyToken, getMyApplications);
router.get('/job/:jobId', verifyToken, getApplicationsForJob);
router.put('/:id', verifyToken, updateApplicationStatus);
router.delete('/:id', verifyToken, deleteApplication);

module.exports = router;