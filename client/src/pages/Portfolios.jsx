import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  TextField,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import Loading from '../components/Loading';
import { list } from '../api/api-portfolio';

const Portfolios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const abortController = new AbortController();
      const signal = abortController.signal;

      const data = await list(signal);
      
      if (data && data.users) {
        // Filter only developers
        const developers = data.users.filter(user => user.role === 'developer');
        setUsers(developers);
      } else if (Array.isArray(data)) {
        const developers = data.filter(user => user.role === 'developer');
        setUsers(developers);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.profile?.bio && user.profile.bio.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = !skillFilter || 
      (user.profile?.skills && user.profile.skills.some(skill => 
        skill.toLowerCase().includes(skillFilter.toLowerCase())
      ));
    
    return matchesSearch && matchesSkill;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Developer Portfolios
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Discover talented developers and their work
      </Typography>

      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search developers..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Filter by skill"
              variant="outlined"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      {/* User Cards */}
      <Grid container spacing={3}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user._id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': { 
                  boxShadow: '0 12px 28px rgba(102, 126, 234, 0.25)',
                  transform: 'translateY(-8px)',
                },
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                      {user.profile?.profilePicture ? (
                        <img src={user.profile.profilePicture} alt={user.name} />
                      ) : (
                        <PersonIcon fontSize="large" />
                      )}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.role}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" paragraph>
                    {user.profile?.bio || 'No bio available'}
                  </Typography>

                  {user.profile?.skills && user.profile.skills.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {user.profile.skills.slice(0, 5).map((skill, index) => (
                          <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                        ))}
                        {user.profile.skills.length > 5 && (
                          <Chip label={`+${user.profile.skills.length - 5}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                  )}

                  {user.profile?.location && (
                    <Typography variant="body2" color="text.secondary">
                      📍 {user.profile.location}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {user.profile?.github && (
                        <Button
                          size="small"
                          href={user.profile.github}
                          target="_blank"
                          startIcon={<GitHubIcon />}
                        >
                          GitHub
                        </Button>
                      )}
                      {user.profile?.linkedin && (
                        <Button
                          size="small"
                          href={user.profile.linkedin}
                          target="_blank"
                          startIcon={<LinkedInIcon />}
                        >
                          LinkedIn
                        </Button>
                      )}
                    </Box>
                    <Button
                      component={Link}
                      to={`/portfolios/${user._id}`}
                      variant="contained"
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No developers found
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Portfolios;