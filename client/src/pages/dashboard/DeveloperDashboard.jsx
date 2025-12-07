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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { applicationService, portfolioService } from '../../utils/services';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';
import PendingIcon from '@mui/icons-material/Pending';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsResponse, portfolioResponse] = await Promise.all([
        applicationService.getMyApplications(),
        portfolioService.getMyPortfolio().catch(() => ({ data: null })),
      ]);

      setApplications(appsResponse.data.applications);
      setPortfolio(portfolioResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'reviewed':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Here's what's happening with your job search
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
                      {applications.length}
                    </Typography>
                    <Typography variant="body2">Total Applications</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PendingIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {applications.filter((a) => a.status === 'pending').length}
                    </Typography>
                    <Typography variant="body2">Pending</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FolderIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {portfolio?.projects?.length || 0}
                    </Typography>
                    <Typography variant="body2">Portfolio Projects</Typography>
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
              onClick={() => navigate('/jobs')}
              sx={{ borderRadius: '25px' }}
            >
              Browse Jobs
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/my-portfolio')}
              sx={{ borderRadius: '25px' }}
            >
              {portfolio ? 'Edit Portfolio' : 'Create Portfolio'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/profile')}
              sx={{ borderRadius: '25px' }}
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>

        {/* Recent Applications */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Recent Applications
        </Typography>

        {applications.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              You haven't applied to any jobs yet.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={2}>
            {applications.slice(0, 5).map((application) => (
              <Grid item xs={12} key={application._id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
                  }}
                  onClick={() => navigate(`/jobs/${application.job._id}`)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {application.job?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {application.job?.company?.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Applied {new Date(application.appliedAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {applications.length > 5 && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button variant="outlined" onClick={() => navigate('/my-applications')}>
              View All Applications
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default DeveloperDashboard;
