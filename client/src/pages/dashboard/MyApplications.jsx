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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { applicationService } from '../../utils/services';

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, applicationId: null });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getMyApplications();
      setApplications(response.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await applicationService.deleteApplication(deleteDialog.applicationId);
      setApplications(applications.filter((a) => a._id !== deleteDialog.applicationId));
      setDeleteDialog({ open: false, applicationId: null });
    } catch (error) {
      console.error('Error deleting application:', error);
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
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
          My Applications
        </Typography>

        {applications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              You haven't applied to any jobs yet.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {applications.map((application) => (
              <Grid item xs={12} key={application._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                          {application.job?.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                          {application.job?.company?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {application.job?.location} • {application.job?.jobType}
                        </Typography>
                      </Box>
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>

                    <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Cover Letter:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {application.coverLetter}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          onClick={() => navigate(`/jobs/${application.job._id}`)}
                        >
                          View Job
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => setDeleteDialog({ open: true, applicationId: application._id })}
                        >
                          Withdraw
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, applicationId: null })}>
          <DialogTitle>Withdraw Application</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to withdraw this application? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, applicationId: null })}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Withdraw
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default MyApplications;
