import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationService, jobService } from '../../utils/services';

const JobApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [jobId]);

  const fetchData = async () => {
    try {
      const [jobResponse, appsResponse] = await Promise.all([
        jobService.getJobById(jobId),
        applicationService.getApplicationsForJob(jobId),
      ]);

      setJob(jobResponse.data);
      setApplications(appsResponse.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError(error.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, { status: newStatus });
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating status:', error);
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Button onClick={() => navigate('/dashboard/company')} sx={{ mb: 2 }}>
          ← Back to Dashboard
        </Button>

        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Applications for: {job?.title}
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
          {applications.length} {applications.length === 1 ? 'Application' : 'Applications'}
        </Typography>

        {applications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="body1" color="text.secondary">
              No applications yet for this position.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {applications.map((application) => (
              <Grid item xs={12} key={application._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {application.developer?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {application.developer?.email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Applied on {new Date(application.appliedAt).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application._id, e.target.value)}
                          displayEmpty
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="reviewed">Reviewed</MenuItem>
                          <MenuItem value="accepted">Accepted</MenuItem>
                          <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Cover Letter:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {application.coverLetter}
                      </Typography>
                    </Box>

                    {application.resume && (
                      <Button
                        variant="outlined"
                        size="small"
                        href={application.resume}
                        target="_blank"
                      >
                        View Resume
                      </Button>
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

export default JobApplications;