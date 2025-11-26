import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../utils/services';

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    jobType: '',
    experienceLevel: '',
  });

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobService.getAllJobs(filters);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
          Find Your Dream Job
        </Typography>

        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search by title or description..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Job Type</InputLabel>
                  <Select
                    value={filters.jobType}
                    label="Job Type"
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="full-time">Full-time</MenuItem>
                    <MenuItem value="part-time">Part-time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Experience Level</InputLabel>
                  <Select
                    value={filters.experienceLevel}
                    label="Experience Level"
                    onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="entry">Entry</MenuItem>
                    <MenuItem value="mid">Mid</MenuItem>
                    <MenuItem value="senior">Senior</MenuItem>
                    <MenuItem value="lead">Lead</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Box>

        {/* Results Count */}
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
          {loading ? 'Loading...' : `${jobs.length} jobs found`}
        </Typography>

        {/* Jobs List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : jobs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No jobs found. Try adjusting your filters.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} key={job._id}>
                <Card
                  sx={{
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                          {job.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                          {job.company?.name || 'Company Name'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                          <LocationOnIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {job.location}
                          </Typography>
                          <WorkIcon fontSize="small" color="action" sx={{ ml: 2 }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.jobType}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Chip
                          label={job.experienceLevel}
                          color="primary"
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {job.description}
                    </Typography>

                    {job.skills && job.skills.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {job.skills.slice(0, 5).map((skill, index) => (
                          <Chip key={index} label={skill} size="small" variant="outlined" />
                        ))}
                      </Box>
                    )}

                    {job.salary && (
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {job.salary.currency} ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Jobs;
