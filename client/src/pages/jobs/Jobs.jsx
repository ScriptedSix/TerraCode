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
  IconButton,
  Menu,
  MenuItem as MenuItemOption,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jobService } from '../../utils/services';

const Jobs = () => {
  const navigate = useNavigate();
  const { user, isCompany } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [otherJobs, setOtherJobs] = useState([]);
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
      const allJobs = response.data.jobs;

      if (isCompany && user) {
        // Separate company's own jobs from others
        const ownJobs = allJobs.filter(job => job.company._id === user._id);
        const othersJobs = allJobs.filter(job => job.company._id !== user._id);
        setMyJobs(ownJobs);
        setOtherJobs(othersJobs);
      } else {
        setJobs(allJobs);
      }
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


const handleToggleStatus = async (job) => {
  try {
    const newStatus = job.status === 'active' ? 'closed' : 'active';
    await jobService.updateJob(job._id, { status: newStatus });
    fetchJobs();
  } catch (error) {
    console.error('Error updating job status:', error);
    alert('Failed to update job status');
  }
};

const handleDeleteJob = async (job) => {
  if (!window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
    return;
  }

  try {
    await jobService.deleteJob(job._id);
    fetchJobs();
  } catch (error) {
    console.error('Error deleting job:', error);
    alert('Failed to delete job');
  }
};

  const JobCard = ({ job, isOwn = false }) => (
  <Card
    sx={{
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        transform: 'translateY(-2px)',
      },
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
    }}
    onClick={() => navigate(`/jobs/${job._id}`)}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {job.title}
            </Typography>
            {isOwn && (
              <Chip
                label="Your Job"
                size="small"
                color="secondary"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
            {job.company?.name || 'Company Name'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
            <LocationOnIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {job.location}
            </Typography>
            <WorkIcon fontSize="small" color="action" sx={{ ml: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
              {job.jobType}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <Chip
            label={job.experienceLevel}
            color="primary"
            size="small"
            sx={{ textTransform: 'capitalize' }}
          />
          <Chip
            label={job.status}
            color={job.status === 'active' ? 'success' : job.status === 'closed' ? 'error' : 'default'}
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
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
          {job.salary.currency} ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
        </Typography>
      )}

      {/* Action Buttons for Own Jobs */}
      {isOwn && (
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 1, 
            mt: 2, 
            pt: 2, 
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent card click
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={job.status === 'active' ? <ToggleOffIcon /> : <ToggleOnIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleStatus(job);
            }}
            sx={{ flex: 1 }}
          >
            {job.status === 'active' ? 'Mark Closed' : 'Mark Active'}
          </Button>
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit-job/${job._id}`);
            }}
            sx={{ flex: 1 }}
          >
            Edit
          </Button>
          
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteJob(job);
            }}
          >
            Delete
          </Button>
        </Box>
      )}
    </CardContent>
  </Card>
);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {isCompany ? 'Browse Jobs' : 'Find Your Dream Job'}
            </Typography>
            {isCompany && (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                View your posted jobs and explore what others are offering
              </Typography>
            )}
          </Box>
          {isCompany && (
            <Button
              variant="contained"
              onClick={() => navigate('/post-job')}
              sx={{ borderRadius: '25px', px: 3 }}
            >
              Post New Job
            </Button>
          )}
        </Box>

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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Company View: Show Own Jobs First */}
            {isCompany ? (
              <>
                {/* My Jobs Section */}
                <Box sx={{ mb: 6 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Your Posted Jobs ({myJobs.length})
                  </Typography>
                  {myJobs.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        You haven't posted any jobs yet.
                      </Typography>
                      <Button variant="contained" onClick={() => navigate('/post-job')}>
                        Post Your First Job
                      </Button>
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {myJobs.map((job) => (
                        <Grid item xs={12} key={job._id}>
                          <JobCard job={job} isOwn={true} />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Other Companies' Jobs */}
                <Box>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    Jobs from Other Companies ({otherJobs.length})
                  </Typography>
                  {otherJobs.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No other jobs available at the moment.
                      </Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {otherJobs.map((job) => (
                        <Grid item xs={12} key={job._id}>
                          <JobCard job={job} isOwn={false} />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </>
            ) : (
              /* Developer/Visitor View: All Jobs */
              <>
                <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                  {jobs.length} jobs found
                </Typography>
                {jobs.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      No jobs found. Try adjusting your filters.
                    </Typography>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {jobs.map((job) => (
                      <Grid item xs={12} key={job._id}>
                        <JobCard job={job} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </>
        )}

        {/* Action Menu for Company's Own Jobs */}
        
      </Container>
    </Box>
  );
};

export default Jobs;