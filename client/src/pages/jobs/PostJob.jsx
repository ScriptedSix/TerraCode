import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { jobService } from '../../utils/services';

const PostJob = () => {
  const navigate = useNavigate();
  const { isCompany } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: 'active',
      jobType: 'full-time',
      experienceLevel: 'entry',
    },
  });

  if (!isCompany) {
    navigate('/');
    return null;
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter((skill) => skill !== skillToDelete));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    // Add skills array
    const jobData = {
      ...data,
      skills,
      requirements: data.requirements.split('\n').filter((r) => r.trim()),
      responsibilities: data.responsibilities.split('\n').filter((r) => r.trim()),
      salary: {
        min: parseInt(data.salaryMin),
        max: parseInt(data.salaryMax),
        currency: 'CAD',
      },
    };

    // Remove temporary fields
    delete jobData.salaryMin;
    delete jobData.salaryMax;

    try {
      const response = await jobService.createJob(jobData);
      navigate(`/jobs/${response.data.job._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F4F8 0%, #FFF8E7 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}
        >
          Post a New Job
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Fill in the details below to find the best tech talent
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Job Details Section */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Job Details
            </Typography>

            <TextField
              fullWidth
              label="Job Title"
              placeholder="e.g. Senior Full Stack Developer"
              sx={{ mb: 3 }}
              {...register('title', {
                required: 'Job title is required',
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              fullWidth
              label="Company Name"
              sx={{ mb: 3 }}
              {...register('companyName')}
              helperText="Leave blank to use your profile company name"
            />

            <TextField
              fullWidth
              label="Location"
              sx={{ mb: 3 }}
              {...register('location', {
                required: 'Location is required',
              })}
              error={!!errors.location}
              helperText={errors.location?.message}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Job Type</InputLabel>
              <Controller
                name="jobType"
                control={control}
                rules={{ required: 'Job type is required' }}
                render={({ field }) => (
                  <Select {...field} label="Job Type">
                    <MenuItem value="full-time">Full-time</MenuItem>
                    <MenuItem value="part-time">Part-time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Experience Level</InputLabel>
              <Controller
                name="experienceLevel"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Experience Level">
                    <MenuItem value="entry">Entry</MenuItem>
                    <MenuItem value="mid">Mid</MenuItem>
                    <MenuItem value="senior">Senior</MenuItem>
                    <MenuItem value="lead">Lead</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            {/* Job Description Section */}
            <Typography variant="h5" sx={{ mb: 3, mt: 4, fontWeight: 600 }}>
              Job Description
            </Typography>

            <TextField
              fullWidth
              label="Description"
              multiline
              rows={6}
              placeholder="Describe the role, responsibilities and team culture"
              sx={{ mb: 3 }}
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 50,
                  message: 'Description must be at least 50 characters',
                },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              fullWidth
              label="Requirements (one per line)"
              multiline
              rows={4}
              placeholder="Bachelor's degree in Computer Science&#10;3+ years of experience with React&#10;Strong problem-solving skills"
              sx={{ mb: 3 }}
              {...register('requirements')}
            />

            <TextField
              fullWidth
              label="Responsibilities (one per line)"
              multiline
              rows={4}
              placeholder="Design and develop web applications&#10;Collaborate with cross-functional teams&#10;Write clean, maintainable code"
              sx={{ mb: 3 }}
              {...register('responsibilities')}
            />

            {/* Skills */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Required Skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Add a skill (e.g. React, Node.js)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button variant="outlined" onClick={handleAddSkill}>
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                  color="primary"
                />
              ))}
            </Box>

            {/* Salary */}
            <Typography variant="h6" sx={{ mb: 2 }}>
              Salary Range (CAD)
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Minimum"
                  type="number"
                  {...register('salaryMin')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Maximum"
                  type="number"
                  {...register('salaryMax')}
                />
              </Grid>
            </Grid>

            {/* Application Deadline */}
            <TextField
              fullWidth
              label="Application Deadline"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
              {...register('applicationDeadline')}
            />

            {/* Status */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Status</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Status">
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                borderRadius: '30px',
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              {loading ? 'Posting Job...' : 'Post Job'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default PostJob;
