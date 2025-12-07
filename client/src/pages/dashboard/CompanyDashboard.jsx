import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jobService } from '../../utils/services';
import WorkIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getJobsByCompany(user._id);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeJobs = jobs.filter((j) => j.status === 'active');
  const draftJobs = jobs.filter((j) => j.status === 'draft');

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your job postings and find the best talent
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <WorkIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {jobs.length}
                    </Typography>
                    <Typography variant="body2">Total Job Posts</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <VisibilityIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {activeJobs.length}
                    </Typography>
                    <Typography variant="body2">Active Jobs</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PeopleIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {draftJobs.length}
                    </Typography>
                    <Typography variant="body2">Draft Jobs</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/post-job')}
              sx={{ borderRadius: '25px' }}
            >
              Post New Job
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/portfolios')}
              sx={{ borderRadius: '25px' }}
            >
              Browse Developers
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/profile')}
              sx={{ borderRadius: '25px' }}
            >
              Edit Company Profile
            </Button>
          </Box>
        </Paper>

        {/* Job Listings */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Your Job Postings
        </Typography>

        {jobs.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              You haven't posted any jobs yet.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/post-job')}>
              Post Your First Job
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Job Title</strong></TableCell>
                  <TableCell><strong>Location</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Posted</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job._id} hover>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{job.jobType}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.status}
                        color={job.status === 'active' ? 'success' : 'default'}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>{new Date(job.postedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => navigate(`/jobs/${job._id}`)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        onClick={() => navigate(`/job-applications/${job._id}`)}
                      >
                        View Applications
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default CompanyDashboard;
