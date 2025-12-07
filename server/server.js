require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/user.routes')); 
app.use('/api/portfolio', require('./routes/portfolio.routes'));
app.use('/api/jobs', require('./routes/job.routes'));
app.use('/api/applications', require('./routes/application.routes'));
app.use('/uploads', express.static('uploads'));

app.use('/api/search', require('./routes/search.routes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running at: http://localhost:${PORT}`);
});
