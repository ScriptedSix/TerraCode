import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import auth from '../user/auth-helper';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Loading from '../components/Loading';

const JobListings = () => {
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();
  const userRole = jwt?.user?.role;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    // Fetch jobs from API
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/jobs');
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockJobs = [
        {
          _id: '1',
          title: 'Senior Full Stack Developer',
          company: 'Tech Corp',
          location: 'Remote',
          jobType: 'Full-time',
          workMode: 'Remote',
          salary: '$100k - $150k',
          skills: ['React', 'Node.js', 'MongoDB'],
          description: 'Looking for an experienced full stack developer to join our growing team...',
          postedDate: new Date('2024-11-01'),
        },
        {
          _id: '2',
          title: 'Frontend Developer',
          company: 'StartUp Inc',
          location: 'New York, NY',
          jobType: 'Contract',
          workMode: 'Hybrid',
          salary: '$80k - $120k',
          skills: ['React', 'TypeScript', 'CSS'],
          description: 'Join our team to build amazing user interfaces for modern web apps...',
          postedDate: new Date('2024-11-05'),
        },
        {
          _id: '3',
          title: 'Backend Engineer',
          company: 'Cloud Solutions',
          location: 'San Francisco, CA',
          jobType: 'Full-time',
          workMode: 'On-site',
          salary: '$120k - $180k',
          skills: ['Python', 'AWS', 'Docker'],
          description: 'Build scalable backend services that power millions of users...',
          postedDate: new Date('2024-11-10'),
        },
      ];
      
      setJobs(mockJobs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesJobType = !jobTypeFilter || job.jobType === jobTypeFilter;
    const matchesSkill = !skillFilter || job.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    
    return matchesSearch && matchesLocation && matchesJobType && matchesSkill;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        fontWeight="bold"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Find Your Dream Job
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Discover {jobs.length} opportunities waiting for you
      </Typography>

      {/* Filter Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Search jobs..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Location"
              variant="outlined"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select
                value={jobTypeFilter}
                label="Job Type"
                onChange={(e) => setJobTypeFilter(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Skills"
              variant="outlined"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Job Cards */}
      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} key={job._id}>
              <Card 
                elevation={2} 
                sx={{ 
                  transition: 'all 0.3s ease',
                  borderRadius: 2,
                  '&:hover': { 
                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.25)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        {job.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {job.company}
                      </Typography>
                    </Box>
                    <Chip label={job.jobType} color="primary" />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon fontSize="small" sx={{ color: '#667eea' }} />
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {job.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AttachMoneyIcon fontSize="small" sx={{ color: '#667eea' }} />
                      <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {job.salary}
                      </Typography>
                    </Box>
                    {job.workMode && (
                      <Chip 
                        label={job.workMode} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {job.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {job.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/jobs/${job._id}`}
                    variant="contained"
                    size="large"
                    sx={{ 
                      ml: 1, 
                      mb: 1,
                      px: 4,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                        transform: 'scale(1.05)',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    View Details & Apply
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No jobs found matching your criteria
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default JobListings;
