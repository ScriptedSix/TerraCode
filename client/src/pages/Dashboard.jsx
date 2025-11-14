import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import auth from '../user/auth-helper';
import Loading from '../components/Loading';

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('jobseeker'); // or 'employer'
  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    portfolioViews: 0,
  });
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // const user = auth.isAuthenticated().user;
      // setUserRole(user.role);
      
      // Mock data
      const mockApplications = [
        {
          _id: '1',
          job: {
            title: 'Senior Full Stack Developer',
            company: 'Tech Corp',
          },
          status: 'pending',
          appliedDate: new Date('2024-11-01'),
        },
        {
          _id: '2',
          job: {
            title: 'Frontend Developer',
            company: 'StartUp Inc',
          },
          status: 'interviewed',
          appliedDate: new Date('2024-10-25'),
        },
      ];

      const mockSavedJobs = [
        {
          _id: '3',
          title: 'Backend Engineer',
          company: 'Cloud Solutions',
          location: 'Remote',
        },
      ];

      setApplications(mockApplications);
      setSavedJobs(mockSavedJobs);
      setStats({
        applications: mockApplications.length,
        savedJobs: mockSavedJobs.length,
        portfolioViews: 127,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      interviewed: 'info',
      accepted: 'success',
      rejected: 'error',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
            },
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="rgba(255,255,255,0.9)" variant="body2" fontWeight="500">
                    Applications
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.applications}
                  </Typography>
                </Box>
                <DescriptionIcon sx={{ fontSize: 48, opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 20px rgba(240, 147, 251, 0.4)',
            },
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="rgba(255,255,255,0.9)" variant="body2" fontWeight="500">
                    Saved Jobs
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.savedJobs}
                  </Typography>
                </Box>
                <WorkIcon sx={{ fontSize: 48, opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 20px rgba(79, 172, 254, 0.4)',
            },
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="rgba(255,255,255,0.9)" variant="body2" fontWeight="500">
                    Portfolio Views
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stats.portfolioViews}
                  </Typography>
                </Box>
                <FolderIcon sx={{ fontSize: 48, opacity: 0.5 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Paper elevation={3}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="My Applications" />
          <Tab label="Saved Jobs" />
          <Tab label="Portfolio" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Applications Tab */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                My Job Applications
              </Typography>
              {applications.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>Applied Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell>{app.job.title}</TableCell>
                          <TableCell>{app.job.company}</TableCell>
                          <TableCell>{app.appliedDate.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip
                              label={app.status}
                              color={getStatusColor(app.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button size="small" component={Link} to={`/jobs/${app.job._id}`}>
                              View Job
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="text.secondary">No applications yet</Typography>
              )}
            </Box>
          )}

          {/* Saved Jobs Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Saved Jobs
              </Typography>
              {savedJobs.length > 0 ? (
                <Grid container spacing={2}>
                  {savedJobs.map((job) => (
                    <Grid item xs={12} key={job._id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6">{job.title}</Typography>
                          <Typography color="text.secondary">{job.company}</Typography>
                          <Typography variant="body2">{job.location}</Typography>
                          <Button
                            component={Link}
                            to={`/jobs/${job._id}`}
                            sx={{ mt: 2 }}
                            variant="outlined"
                          >
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="text.secondary">No saved jobs yet</Typography>
              )}
            </Box>
          )}

          {/* Portfolio Tab */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                My Portfolio
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography color="text.secondary">
                  Manage your portfolio to showcase your work to employers
                </Typography>
                <Button variant="contained" component={Link} to="/portfolio/edit">
                  Edit Portfolio
                </Button>
              </Box>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Portfolio Stats
                  </Typography>
                  <Typography>Views: {stats.portfolioViews}</Typography>
                  <Typography>Last Updated: {new Date().toLocaleDateString()}</Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
