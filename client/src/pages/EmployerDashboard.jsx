import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loading from '../components/Loading';

const EmployerDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    interviewScheduled: 0,
  });

  const [jobForm, setJobForm] = useState({
    title: '',
    description: '',
    location: '',
    jobType: 'Full-time',
    salary: '',
    skills: '',
    requirements: '',
    responsibilities: '',
  });

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const fetchEmployerData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      
      // Mock data
      const mockJobs = [
        {
          _id: '1',
          title: 'Senior Full Stack Developer',
          location: 'Remote',
          jobType: 'Full-time',
          status: 'active',
          applicationsCount: 15,
          postedDate: new Date('2024-11-01'),
        },
        {
          _id: '2',
          title: 'Frontend Developer',
          location: 'New York, NY',
          jobType: 'Contract',
          status: 'active',
          applicationsCount: 8,
          postedDate: new Date('2024-11-05'),
        },
      ];

      const mockApplications = [
        {
          _id: '1',
          jobId: '1',
          jobTitle: 'Senior Full Stack Developer',
          candidateName: 'John Doe',
          candidateEmail: 'john@example.com',
          status: 'pending',
          appliedDate: new Date('2024-11-10'),
        },
        {
          _id: '2',
          jobId: '1',
          jobTitle: 'Senior Full Stack Developer',
          candidateName: 'Jane Smith',
          candidateEmail: 'jane@example.com',
          status: 'interviewed',
          appliedDate: new Date('2024-11-08'),
        },
      ];

      setJobs(mockJobs);
      setApplications(mockApplications);
      setStats({
        activeJobs: mockJobs.filter(j => j.status === 'active').length,
        totalApplications: mockApplications.length,
        interviewScheduled: mockApplications.filter(a => a.status === 'interviewed').length,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employer data:', error);
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (job = null) => {
    if (job) {
      setEditingJob(job);
      setJobForm({
        title: job.title,
        description: job.description || '',
        location: job.location,
        jobType: job.jobType,
        salary: job.salary || '',
        skills: job.skills?.join(', ') || '',
        requirements: job.requirements?.join('\n') || '',
        responsibilities: job.responsibilities?.join('\n') || '',
      });
    } else {
      setEditingJob(null);
      setJobForm({
        title: '',
        description: '',
        location: '',
        jobType: 'Full-time',
        salary: '',
        skills: '',
        requirements: '',
        responsibilities: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingJob(null);
  };

  const handleFormChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitJob = async () => {
    try {
      // TODO: Replace with actual API call
      console.log(editingJob ? 'Updating job:' : 'Creating job:', jobForm);
      
      handleCloseDialog();
      fetchEmployerData();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        // TODO: Replace with actual API call
        console.log('Deleting job:', jobId);
        fetchEmployerData();
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
    try {
      // TODO: Replace with actual API call
      console.log('Updating application status:', applicationId, newStatus);
      fetchEmployerData();
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      interviewed: 'info',
      accepted: 'success',
      rejected: 'error',
      active: 'success',
      closed: 'default',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Employer Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Post New Job
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                Active Jobs
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.activeJobs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                Total Applications
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.totalApplications}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2">
                Interviews Scheduled
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {stats.interviewScheduled}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Paper elevation={3}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="My Job Posts" />
          <Tab label="Applications" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* Jobs Tab */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Posted Jobs
              </Typography>
              {jobs.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Applications</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Posted Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {jobs.map((job) => (
                        <TableRow key={job._id}>
                          <TableCell>{job.title}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.jobType}</TableCell>
                          <TableCell>{job.applicationsCount}</TableCell>
                          <TableCell>
                            <Chip
                              label={job.status}
                              color={getStatusColor(job.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{job.postedDate.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpenDialog(job)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteJob(job._id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="text.secondary">No jobs posted yet</Typography>
              )}
            </Box>
          )}

          {/* Applications Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Job Applications
              </Typography>
              {applications.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Candidate</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Applied Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app._id}>
                          <TableCell>{app.candidateName}</TableCell>
                          <TableCell>{app.candidateEmail}</TableCell>
                          <TableCell>{app.jobTitle}</TableCell>
                          <TableCell>{app.appliedDate.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Chip
                              label={app.status}
                              color={getStatusColor(app.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              select
                              size="small"
                              value={app.status}
                              onChange={(e) => handleUpdateApplicationStatus(app._id, e.target.value)}
                              sx={{ minWidth: 120 }}
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="interviewed">Interviewed</MenuItem>
                              <MenuItem value="accepted">Accepted</MenuItem>
                              <MenuItem value="rejected">Rejected</MenuItem>
                            </TextField>
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
        </Box>
      </Paper>

      {/* Job Post Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingJob ? 'Edit Job' : 'Post New Job'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={jobForm.title}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={jobForm.location}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Job Type"
                name="jobType"
                value={jobForm.jobType}
                onChange={handleFormChange}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Salary Range"
                name="salary"
                value={jobForm.salary}
                onChange={handleFormChange}
                placeholder="e.g., $80k - $120k"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Job Description"
                name="description"
                value={jobForm.description}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Required Skills (comma-separated)"
                name="skills"
                value={jobForm.skills}
                onChange={handleFormChange}
                placeholder="React, Node.js, MongoDB"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Requirements (one per line)"
                name="requirements"
                value={jobForm.requirements}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Responsibilities (one per line)"
                name="responsibilities"
                value={jobForm.responsibilities}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitJob} variant="contained">
            {editingJob ? 'Update Job' : 'Post Job'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployerDashboard;
