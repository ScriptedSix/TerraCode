const Job = require('../models/job.model');

// GET /api/search/jobs?query=developer
exports.textSearchJobs = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // TEXT SEARCH
    const jobs = await Job.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.status(200).json({
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
