import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Chip,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import auth from '../user/auth-helper';
import { read, update } from '../api/api-user';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    profile: {
      bio: '',
      skills: [],
      experience: '',
      location: '',
      github: '',
      linkedin: '',
      portfolio: '',
    },
  });

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    fetchProfile();
  }, []);


  // FETCH PROFILE FROM SERVER
  const fetchProfile = async () => {
    setLoading(true);
    setError('');

    try {
      const jwt = auth.isAuthenticated();

      if (!jwt || !jwt.user || !jwt.user._id || !jwt.token) {
        setError('Authentication expired. Please log in again.');
        auth.clearJWT(() => {});
        return;
      }

      const data = await read(
        { userId: jwt.user._id },
        { t: jwt.token }
      );

      if (data && data.error) {
        setError(data.error);
      } else {
        const profileData = {
          ...data,
          profile: {
            bio: data.profile?.bio || '',
            skills: Array.isArray(data.profile?.skills) ? data.profile.skills : [],
            experience: data.profile?.experience || '',
            location: data.profile?.location || '',
            github: data.profile?.github || '',
            linkedin: data.profile?.linkedin || '',
            portfolio: data.profile?.portfolio || '',
          },
        };

        setProfile(profileData);
        setFormData(profileData);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  // HANDLE FIELD CHANGE

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nested = [
      'bio',
      'experience',
      'location',
      'github',
      'linkedin',
      'portfolio',
    ];

    if (nested.includes(name)) {
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  // HANDLE SKILLS (comma-separated)
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s);

    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        skills: skillsArray,
      },
    });
  };


  // SAVE PROFILE CHANGES

  const handleSave = async () => {
    setError('');
    setSuccess('');

    try {
      const jwt = auth.isAuthenticated();

      if (!jwt || !jwt.user || !jwt.user._id || !jwt.token) {
        setError('Invalid authentication. Please log in again.');
        auth.clearJWT(() => {});
        return;
      }

      const data = await update(
        { userId: jwt.user._id },
        { t: jwt.token },
        formData
      );

      if (data && data.error) {
        setError(data.error);
      } else {
        setProfile(formData);

        // Update user in localStorage
        auth.updateUser(data, () => {});

        setEditing(false);
        setSuccess('Profile updated successfully!');

        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
  };


  // LOADING STATE

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading profile...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold">
            My Profile
          </Typography>
          {!editing && (
            <Button variant="contained" startIcon={<EditIcon />} onClick={() => setEditing(true)}>
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Left column - Avatar */}
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                <PersonIcon sx={{ fontSize: 80 }} />
              </Avatar>

              {editing && (
                <Button variant="outlined" size="small">
                  Change Photo
                </Button>
              )}
            </Box>
          </Grid>

          {/* Right column - Profile fields */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.profile.location}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Role" name="role" value={formData.role} disabled />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Bio"
                  name="bio"
                  value={formData.profile.bio}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Experience"
                  name="experience"
                  value={formData.profile.experience}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Professional Links */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Professional Links</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="GitHub URL"
                  name="github"
                  value={formData.profile.github}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="LinkedIn URL"
                  name="linkedin"
                  value={formData.profile.linkedin}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Portfolio URL"
                  name="portfolio"
                  value={formData.profile.portfolio}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Skills for developers only */}
          {profile.role === 'developer' && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Skills</Typography>

              {!editing ? (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {profile.profile.skills.length > 0 ? (
                    profile.profile.skills.map((skill, i) => (
                      <Chip key={i} label={skill} color="primary" />
                    ))
                  ) : (
                    <Typography color="text.secondary">No skills added yet</Typography>
                  )}
                </Box>
              ) : (
                <TextField
                  fullWidth
                  label="Skills (comma-separated)"
                  value={formData.profile.skills.join(', ')}
                  onChange={handleSkillsChange}
                />
              )}
            </Grid>
          )}
        </Grid>

        {/* Save / Cancel Buttons */}
        {editing && (
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
