const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projects: [{
    title: {
      type: String,
      required: [true, 'Project title is required']
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    technologies: [String],
    githubLink: String,
    liveLink: String,
    image: String,
    startDate: Date,
    endDate: Date,
    featured: {
      type: Boolean,
      default: false
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
portfolioSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);