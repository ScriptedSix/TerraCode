const express = require('express');
const router = express.Router();
const {
  getAllPortfolios,
  createOrUpdatePortfolio,
  getPortfolioByUserId,
  getMyPortfolio,
  deletePortfolio,
  addProject,
  updateProject,
  deleteProject
} = require('../controllers/portfolio.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Portfolio routes
router.get('/', getAllPortfolios);
router.post('/', verifyToken, createOrUpdatePortfolio);
router.get('/my-portfolio', verifyToken, getMyPortfolio);
router.get('/user/:userId', getPortfolioByUserId);
router.delete('/:id', verifyToken, deletePortfolio);

// Project routes (within portfolio)
router.post('/project', verifyToken, addProject);
router.put('/project/:projectId', verifyToken, updateProject);
router.delete('/project/:projectId', verifyToken, deleteProject);

module.exports = router;