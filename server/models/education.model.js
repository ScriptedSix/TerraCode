const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    certificateName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
