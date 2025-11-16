import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Button,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Loading from '../components/Loading';
import auth from '../user/auth-helper';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const jwt = auth.isAuthenticated();
  const userRole = jwt?.user?.role;
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/jobs/${jobId}`);
      // const data = await response.json();
      
      // Mock data
      const mockJob = {
        _id: jobId,
        title: 'Senior Full Stack Developer',
        company: 'Tech Corp',
        location: 'Remote',
        jobType: 'Full-time',
        salary: '$100k - $150k',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        description: 'We are looking for an experienced full stack developer to join our team...',
        requirements: [
          '5+ years of experience in full stack development',
          'Strong knowledge of React and Node.js',
          'Experience with cloud platforms (AWS, Azure)',
          'Excellent problem-solving skills',
          'Bachelor\'s degree in Computer Science or related field'
        ],
        responsibilities: [
          'Design and develop scalable web applications',
          'Collaborate with cross-functional teams',
          'Write clean, maintainable code',
          'Participate in code reviews',
          'Mentor junior developers'
        ],
        postedDate: new Date('2024-11-01'),
        applicationDeadline: new Date('2024-12-01'),
      };
      
      setJob(mockJob);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!auth.isAuthenticated()) {
      navigate('/signin');
      return;
    }
    setOpenDialog(true);
  };

  const handleSubmitApplication = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/applications`, {
      //   method: 'POST',
      //   body: JSON.stringify({ jobId, coverLetter, resume }),
      // });
      
      console.log('Application submitted:', { jobId, coverLetter, resume });
      setOpenDialog(false);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Job not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
          <Box>
            <Typography variant="h3" gutterBottom fontWeight="bold">
              {job.title}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {job.company}
            </Typography>
          </Box>
          <Chip label={job.jobType} color="primary" size="large" />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon color="action" />
              <Typography>{job.location}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AttachMoneyIcon color="action" />
              <Typography>{job.salary}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon color="action" />
              <Typography>Posted: {job.postedDate.toLocaleDateString()}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <WorkIcon color="action" />
              <Typography>{job.jobType}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Required Skills
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {job.skills.map((skill, index) => (
              <Chip key={index} label={skill} color="primary" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Job Description
          </Typography>
          <Typography variant="body1" paragraph>
            {job.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Requirements
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            {job.requirements.map((req, index) => (
              <Typography component="li" key={index} variant="body1" paragraph>
                {req}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Responsibilities
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            {job.responsibilities.map((resp, index) => (
              <Typography component="li" key={index} variant="body1" paragraph>
                {resp}
              </Typography>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {userRole !== 'company' && (
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleApply}
              sx={{ 
                px: 6, 
                py: 1.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Apply Now
            </Button>
          </Box>
        )}

        {userRole === 'company' && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Companies cannot apply to jobs
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Application Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Cover Letter"
            variant="outlined"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Resume URL or upload link"
            variant="outlined"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitApplication} variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetails;
