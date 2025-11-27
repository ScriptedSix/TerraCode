const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    skillName: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
