import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Chip,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { portfolioService } from '../../utils/services';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';

const PortfolioDetails = () => {
  const { userId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolio();
  }, [userId]);

  const fetchPortfolio = async () => {
    try {
      const response = await portfolioService.getPortfolioByUserId(userId);
      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Portfolio not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !portfolio) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">{error || 'Portfolio not found'}</Typography>
      </Container>
    );
  }

  const user = portfolio.user;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Profile Header */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
              }}
            >
              {user?.profile?.profilePicture ? (
                <img
                  src={user.profile.profilePicture}
                  alt={user.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <PersonIcon sx={{ fontSize: 60 }} />
              )}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {user?.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {user?.profile?.bio || 'UI Designer'}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {user?.profile?.location || 'Location not specified'}
              </Typography>

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user?.profile?.experience || '5'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Years of Experience
                  </Typography>
                </Box>
                <Box sx={{ borderLeft: '1px solid', borderColor: 'divider' }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {portfolio.projects?.length || 0}+
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Projects
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{ borderRadius: '25px', px: 3 }}
                href={`mailto:${user?.email}`}
              >
                Contact for Work
              </Button>
            </Box>
          </Box>

          {/* Social Links */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {user?.profile?.github && (
              <MuiLink href={user.profile.github} target="_blank" rel="noopener">
                <Button variant="outlined" startIcon={<GitHubIcon />}>
                  GitHub
                </Button>
              </MuiLink>
            )}
            {user?.profile?.linkedin && (
              <MuiLink href={user.profile.linkedin} target="_blank" rel="noopener">
                <Button variant="outlined" startIcon={<LinkedInIcon />}>
                  LinkedIn
                </Button>
              </MuiLink>
            )}
            {user?.profile?.portfolio && (
              <MuiLink href={user.profile.portfolio} target="_blank" rel="noopener">
                <Button variant="outlined" startIcon={<LanguageIcon />}>
                  Website
                </Button>
              </MuiLink>
            )}
          </Box>
        </Paper>

        {/* About Me */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            About Me
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {user?.profile?.bio || 'No bio available'}
          </Typography>
        </Paper>

        {/* Skills */}
        {user?.profile?.skills && user.profile.skills.length > 0 && (
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {user.profile.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" variant="outlined" />
              ))}
            </Box>
          </Paper>
        )}

        {/* Projects */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Projects
        </Typography>

        {portfolio.projects && portfolio.projects.length > 0 ? (
          <Grid container spacing={3}>
            {portfolio.projects.map((project) => (
              <Grid item xs={12} md={6} key={project._id}>
                <Card
                  sx={{
                    height: '100%',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {project.image && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>

                    {project.technologies && project.technologies.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        {project.technologies.map((tech, index) => (
                          <Chip key={index} label={tech} size="small" />
                        ))}
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {project.githubLink && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<GitHubIcon />}
                          href={project.githubLink}
                          target="_blank"
                        >
                          Code
                        </Button>
                      )}
                      {project.liveLink && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<LanguageIcon />}
                          href={project.liveLink}
                          target="_blank"
                        >
                          Live Demo
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No projects added yet.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default PortfolioDetails;
