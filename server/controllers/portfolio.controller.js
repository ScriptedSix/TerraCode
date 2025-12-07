const Portfolio = require('../models/portfolio.model');
const User = require('../models/user.model');

// @desc    Get all portfolios
// @route   GET /api/portfolio
// @access  Public
exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find()
      .populate('user', 'name email role profile')
      .sort('-createdAt');

    res.status(200).json({
      count: portfolios.length,
      portfolios
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create or update portfolio
// @route   POST /api/portfolio
// @access  Private
exports.createOrUpdatePortfolio = async (req, res) => {
  try {
    const { projects } = req.body;

    // Check if portfolio already exists for this user
    let portfolio = await Portfolio.findOne({ user: req.user._id });

    if (portfolio) {
      // Update existing portfolio
      portfolio.projects = projects;
      await portfolio.save();
      
      return res.status(200).json({
        message: 'Portfolio updated successfully',
        portfolio
      });
    }

    // Create new portfolio
    portfolio = await Portfolio.create({
      user: req.user._id,
      projects
    });

    res.status(201).json({
      message: 'Portfolio created successfully',
      portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get portfolio by user ID
// @route   GET /api/portfolio/user/:userId
// @access  Public
exports.getPortfolioByUserId = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.params.userId })
      .populate('user', 'name email role profile');

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get current user's portfolio
// @route   GET /api/portfolio/my-portfolio
// @access  Private
exports.getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id })
      .populate('user', 'name email role profile');

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolio/:id
// @access  Private
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check if user owns this portfolio
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this portfolio' });
    }

    await portfolio.deleteOne();

    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add project to portfolio
// @route   POST /api/portfolio/project
// @access  Private
exports.addProject = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found. Create portfolio first.' });
    }

    portfolio.projects.push(req.body);
    await portfolio.save();

    res.status(201).json({
      message: 'Project added successfully',
      portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update project in portfolio
// @route   PUT /api/portfolio/project/:projectId
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    const project = portfolio.projects.id(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project fields
    Object.assign(project, req.body);
    await portfolio.save();

    res.status(200).json({
      message: 'Project updated successfully',
      portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete project from portfolio
// @route   DELETE /api/portfolio/project/:projectId
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    portfolio.projects.pull(req.params.projectId);
    await portfolio.save();

    res.status(200).json({
      message: 'Project deleted successfully',
      portfolio
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};