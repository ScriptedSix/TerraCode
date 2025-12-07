import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { userService } from '../utils/services';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    // Pre-fill form with current user data
    if (user) {
      setValue('name', user.name || '');
      setValue('bio', user.profile?.bio || '');
      setValue('location', user.profile?.location || '');
      setValue('github', user.profile?.github || '');
      setValue('linkedin', user.profile?.linkedin || '');
      setValue('portfolio', user.profile?.portfolio || '');
      setValue('experience', user.profile?.experience || '');
      
      // Company fields
      setValue('companyName', user.companyInfo?.companyName || '');
      setValue('industry', user.companyInfo?.industry || '');
      setValue('website', user.companyInfo?.website || '');
      setValue('companyDescription', user.companyInfo?.description || '');
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updateData = {
        name: data.name,
      };

      if (user.role === 'developer') {
        updateData.profile = {
          bio: data.bio,
          location: data.location,
          github: data.github,
          linkedin: data.linkedin,
          portfolio: data.portfolio,
          experience: data.experience,
        };
      } else if (user.role === 'company') {
        updateData.companyInfo = {
          companyName: data.companyName,
          industry: data.industry,
          website: data.website,
          description: data.companyDescription,
        };
      }

      await userService.updateUser(user._id, updateData);
      updateUser(updateData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
          Edit Profile
        </Typography>

        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Info */}
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Basic Information
            </Typography>

            <TextField
              fullWidth
              label="Name"
              sx={{ mb: 3 }}
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            {/* Developer Fields */}
            {user?.role === 'developer' && (
              <>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={3}
                  sx={{ mb: 3 }}
                  {...register('bio')}
                />

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Location"
                      {...register('location')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      {...register('experience')}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>
                  Social Links
                </Typography>

                <TextField
                  fullWidth
                  label="GitHub URL"
                  placeholder="https://github.com/username"
                  sx={{ mb: 2 }}
                  {...register('github')}
                />

                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/username"
                  sx={{ mb: 2 }}
                  {...register('linkedin')}
                />

                <TextField
                  fullWidth
                  label="Portfolio Website"
                  placeholder="https://yourportfolio.com"
                  sx={{ mb: 3 }}
                  {...register('portfolio')}
                />
              </>
            )}

            {/* Company Fields */}
            {user?.role === 'company' && (
              <>
                <TextField
                  fullWidth
                  label="Company Name"
                  sx={{ mb: 3 }}
                  {...register('companyName')}
                />

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Industry"
                      {...register('industry')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Website"
                      placeholder="https://company.com"
                      {...register('website')}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Company Description"
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                  {...register('companyDescription')}
                />
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ borderRadius: '25px', px: 4 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;