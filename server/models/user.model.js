const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false // Don't return password by default in queries
  },
  role: {
    type: String,
    enum: ['developer', 'company', 'admin'],
    default: 'developer'
  },
  // Developer-specific fields
  profile: {
    bio: String,
    skills: [String],
    experience: String,
    location: String,
    github: String,
    linkedin: String,
    portfolio: String,
    profilePicture: String
  },
  // Company-specific fields
  companyInfo: {
    companyName: String,
    industry: String,
    companySize: String,
    website: String,
    location: String,
    description: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);