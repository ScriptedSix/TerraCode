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
  Card,
  CardContent,
  IconButton,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
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
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 6
    }}>
      <Container maxWidth="lg">
        {/* Header Card */}
        <Card 
          elevation={8}
          sx={{ 
            mb: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }
          }}
        >
          <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    border: '4px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  }}
                >
                  {profile.role === 'company' ? (
                    <BusinessIcon sx={{ fontSize: 60 }} />
                  ) : (
                    <CodeIcon sx={{ fontSize: 60 }} />
                  )}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {profile.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    icon={profile.role === 'company' ? <BusinessIcon /> : <CodeIcon />}
                    label={profile.role === 'company' ? 'Company' : 'Developer'} 
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 'bold',
                      backdropFilter: 'blur(10px)'
                    }} 
                  />
                  {profile.profile.location && (
                    <Chip 
                      icon={<LocationOnIcon />}
                      label={profile.profile.location} 
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        backdropFilter: 'blur(10px)'
                      }} 
                    />
                  )}
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: '600px' }}>
                  {profile.profile.bio || 'No bio added yet'}
                </Typography>
              </Grid>
              <Grid item>
                {!editing && (
                  <Button 
                    variant="contained" 
                    startIcon={<EditIcon />} 
                    onClick={() => setEditing(true)}
                    sx={{
                      bgcolor: 'white',
                      color: '#667eea',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>

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
          {/* Left Column - Contact & Links */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Contact Information */}
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon color="primary" />
                    Contact Information
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon color="action" fontSize="small" />
                      {editing ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={formData.email}
                          onChange={handleChange}
                          name="email"
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          {profile.email}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon color="action" fontSize="small" />
                      {editing ? (
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Location"
                          value={formData.profile.location}
                          onChange={handleChange}
                          name="location"
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          {profile.profile.location || 'Not specified'}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Professional Links */}
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LanguageIcon color="primary" />
                    Professional Links
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={2}>
                    {editing ? (
                      <>
                        <TextField
                          fullWidth
                          size="small"
                          label="GitHub URL"
                          name="github"
                          value={formData.profile.github}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: <GitHubIcon sx={{ mr: 1, color: 'action.active' }} />
                          }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          label="LinkedIn URL"
                          name="linkedin"
                          value={formData.profile.linkedin}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: <LinkedInIcon sx={{ mr: 1, color: 'action.active' }} />
                          }}
                        />
                        <TextField
                          fullWidth
                          size="small"
                          label="Portfolio/Website URL"
                          name="portfolio"
                          value={formData.profile.portfolio}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: <LanguageIcon sx={{ mr: 1, color: 'action.active' }} />
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {profile.profile.github && (
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GitHubIcon />}
                            href={profile.profile.github}
                            target="_blank"
                            sx={{ justifyContent: 'flex-start' }}
                          >
                            GitHub
                          </Button>
                        )}
                        {profile.profile.linkedin && (
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<LinkedInIcon />}
                            href={profile.profile.linkedin}
                            target="_blank"
                            sx={{ justifyContent: 'flex-start' }}
                          >
                            LinkedIn
                          </Button>
                        )}
                        {profile.profile.portfolio && (
                          <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<LanguageIcon />}
                            href={profile.profile.portfolio}
                            target="_blank"
                            sx={{ justifyContent: 'flex-start' }}
                          >
                            Portfolio
                          </Button>
                        )}
                        {!profile.profile.github && !profile.profile.linkedin && !profile.profile.portfolio && (
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                            No links added yet
                          </Typography>
                        )}
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>

              {/* Skills for Developers */}
              {profile.role === 'developer' && (
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CodeIcon color="primary" />
                      Skills
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    {editing ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        label="Skills (comma-separated)"
                        value={formData.profile.skills.join(', ')}
                        onChange={handleSkillsChange}
                        placeholder="React, Node.js, Python, etc."
                      />
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {profile.profile.skills.length > 0 ? (
                          profile.profile.skills.map((skill, i) => (
                            <Chip 
                              key={i} 
                              label={skill} 
                              size="small"
                              sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontWeight: 500
                              }}
                            />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No skills added yet
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>

          {/* Right Column - Details */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* About Section */}
              <Card elevation={4}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="primary" />
                    {profile.role === 'company' ? 'Company Information' : 'About Me'}
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "standard"}
                        InputProps={{ readOnly: !editing }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label={profile.role === 'company' ? 'Company Description' : 'Bio'}
                        name="bio"
                        value={formData.profile.bio}
                        onChange={handleChange}
                        disabled={!editing}
                        variant={editing ? "outlined" : "standard"}
                        InputProps={{ readOnly: !editing }}
                        placeholder={profile.role === 'company' ? 'Tell us about your company...' : 'Tell us about yourself...'}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Experience Section for Developers */}
              {profile.role === 'developer' && (
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkIcon color="primary" />
                      Experience
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Professional Experience"
                      name="experience"
                      value={formData.profile.experience}
                      onChange={handleChange}
                      disabled={!editing}
                      variant={editing ? "outlined" : "standard"}
                      InputProps={{ readOnly: !editing }}
                      placeholder="Describe your work experience, projects, achievements..."
                    />
                  </CardContent>
                </Card>
              )}

              {/* Company Info for Companies */}
              {profile.role === 'company' && (
                <Card elevation={4}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BusinessIcon color="primary" />
                      Company Details
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Industry"
                          name="industry"
                          value={formData.companyInfo?.industry || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            companyInfo: {
                              ...formData.companyInfo,
                              industry: e.target.value
                            }
                          })}
                          disabled={!editing}
                          variant={editing ? "outlined" : "standard"}
                          InputProps={{ readOnly: !editing }}
                          placeholder="e.g., Technology, Finance, Healthcare"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Company Size"
                          name="size"
                          value={formData.companyInfo?.size || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            companyInfo: {
                              ...formData.companyInfo,
                              size: e.target.value
                            }
                          })}
                          disabled={!editing}
                          variant={editing ? "outlined" : "standard"}
                          InputProps={{ readOnly: !editing }}
                          placeholder="e.g., 1-10, 50-100, 500+"
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Founded Year"
                          name="founded"
                          value={formData.companyInfo?.founded || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            companyInfo: {
                              ...formData.companyInfo,
                              founded: e.target.value
                            }
                          })}
                          disabled={!editing}
                          variant={editing ? "outlined" : "standard"}
                          InputProps={{ readOnly: !editing }}
                          placeholder="e.g., 2020"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              )}

              {/* Save/Cancel Buttons */}
              {editing && (
                <Card elevation={4} sx={{ bgcolor: '#f5f5f5' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button 
                        variant="outlined" 
                        onClick={handleCancel}
                        size="large"
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="contained" 
                        onClick={handleSave}
                        size="large"
                        sx={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                          }
                        }}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
