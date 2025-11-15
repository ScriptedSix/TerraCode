import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Loading from '../components/Loading';
import { read } from '../api/api-portfolio';

const PortfolioDetails = () => {
  const { portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolioDetails();
  }, [portfolioId]);

  const fetchPortfolioDetails = async () => {
    try {
      setLoading(true);
      const abortController = new AbortController();
      const signal = abortController.signal;
      
      // Fetch portfolio data from backend
      const data = await read({ portfolioId }, signal);
      
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setPortfolio(data);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio details:', error);
      setError('Failed to load portfolio');
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !portfolio || !user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">{error || 'Portfolio not found'}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}>
            {user.profile?.profilePicture ? (
              <img src={user.profile.profilePicture} alt={user.name} />
            ) : (
              <PersonIcon fontSize="large" />
            )}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {user.role}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<EmailIcon />} href={`mailto:${user.email}`}>
              Contact
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" paragraph>
          {user.profile?.bio || 'No bio available'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {user.profile?.github && (
            <IconButton href={user.profile.github} target="_blank" color="primary">
              <GitHubIcon />
            </IconButton>
          )}
          {user.profile?.linkedin && (
            <IconButton href={user.profile.linkedin} target="_blank" color="primary">
              <LinkedInIcon />
            </IconButton>
          )}
          {user.profile?.portfolio && (
            <IconButton href={user.profile.portfolio} target="_blank" color="primary">
              <LanguageIcon />
            </IconButton>
          )}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Projects */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Projects
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {portfolio.projects && portfolio.projects.length > 0 ? (
              portfolio.projects.map((project, index) => (
                <Box key={project._id || index} sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {project.description}
                  </Typography>
                  {project.technologies && project.technologies.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                      {project.technologies.map((tech, idx) => (
                        <Chip key={idx} label={tech} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    {project.githubLink && (
                      <Button size="small" href={project.githubLink} target="_blank">
                        GitHub
                      </Button>
                    )}
                    {project.liveLink && (
                      <Button size="small" href={project.liveLink} target="_blank">
                        Live Demo
                      </Button>
                    )}
                  </Box>
                  {project.startDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      {new Date(project.startDate).toLocaleDateString()} 
                      {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                    </Typography>
                  )}
                  {index < portfolio.projects.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No projects available
              </Typography>
            )}
          </Paper>

          {/* Experience */}
          {user.profile?.experience && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Experience
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                {user.profile.experience}
              </Typography>
            </Paper>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Skills */}
          {user.profile?.skills && user.profile.skills.length > 0 && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {user.profile.skills.map((skill, index) => (
                  <Chip key={index} label={skill} color="primary" />
                ))}
              </Box>
            </Paper>
          )}

          {/* Location */}
          {user.profile?.location && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Location
              </Typography>
              <Typography variant="body2">
                {user.profile.location}
              </Typography>
            </Paper>
          )}

          {/* Contact */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
              {user.email}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortfolioDetails;