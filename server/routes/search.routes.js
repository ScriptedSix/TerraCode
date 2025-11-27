const express = require('express');
const router = express.Router();
const { textSearchJobs } = require('../controllers/search.controller');

router.get('/jobs', textSearchJobs);

module.exports = router;
