import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jobService, applicationService } from '../../utils/services';
import { useForm } from 'react-hook-form';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Auth hook - must be inside component
  const { isAuthenticated, isDeveloper, isCompany, user } = useAuth();
  
  // State
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchJob();
  }, [id]);
  
  // ... rest of component

  const fetchJob = async () => {
    try {
      const response = await jobService.getJobById(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isDeveloper) {
      setError('Only developers can apply to jobs');
      return;
    }
    setApplyDialogOpen(true);
  };

  const onApply = async (data) => {
    setApplying(true);
    setError('');

    try {
      await applicationService.applyToJob({
        jobId: job._id,
        coverLetter: data.coverLetter,
        resume: data.resume,
      });

      setSuccess('Application submitted successfully!');
      setApplyDialogOpen(false);
      reset();
      
      setTimeout(() => {
        navigate('/my-applications');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">Job not found</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {error && !applyDialogOpen && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
              {job.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              {job.company?.name || 'Company Name'}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body1">{job.location}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <WorkIcon color="action" />
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {job.jobType}
                  </Typography>
                </Box>
              </Grid>
              {job.salary && (
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <AttachMoneyIcon color="action" />
                    <Typography variant="body1">
                      {job.salary.currency} ${job.salary.min?.toLocaleString()} - $
                      {job.salary.max?.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <CalendarTodayIcon color="action" />
                  <Typography variant="body1">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Chip
              label={job.experienceLevel}
              color="primary"
              sx={{ textTransform: 'capitalize' }}
            />

                        {/* Only show Apply button for developers */}
            {isDeveloper && (
              <Button
                variant="contained"
                size="large"
                onClick={handleApplyClick}
                sx={{ ml: 2, borderRadius: '25px', px: 4 }}
              >
                Apply Now
              </Button>
            )}

            {/* Show info for companies */}
            {isCompany && (
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2, fontStyle: 'italic' }}>
                Companies cannot apply to jobs
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Job Description
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {job.description}
            </Typography>
          </Box>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Requirements
              </Typography>
              <ul>
                {job.requirements.map((req, index) => (
                  <li key={index}>
                    <Typography variant="body1">{req}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Responsibilities
              </Typography>
              <ul>
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>
                    <Typography variant="body1">{resp}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Required Skills
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {job.skills.map((skill, index) => (
                  <Chip key={index} label={skill} variant="outlined" />
                ))}
              </Box>
            </Box>
          )}
        </Paper>

        {/* Apply Dialog */}
        <Dialog open={applyDialogOpen} onClose={() => setApplyDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <form onSubmit={handleSubmit(onApply)}>
            <DialogContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Cover Letter"
                multiline
                rows={6}
                sx={{ mb: 3 }}
                {...register('coverLetter', {
                  required: 'Cover letter is required',
                  minLength: {
                    value: 50,
                    message: 'Cover letter must be at least 50 characters',
                  },
                })}
                error={!!errors.coverLetter}
                helperText={errors.coverLetter?.message}
              />

              <TextField
                fullWidth
                label="Resume URL (optional)"
                placeholder="https://..."
                {...register('resume')}
                helperText="Link to your resume or portfolio"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setApplyDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={applying}>
                {applying ? 'Submitting...' : 'Submit Application'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  );
};

export default JobDetails;
