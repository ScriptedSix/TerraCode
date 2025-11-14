import { Container, Typography, Button, Box, Grid, Card, CardContent, Paper, alpha } from '@mui/material';
import { Link } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
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
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 2, animation: 'fadeInDown 0.8s ease-out' }}>
            <RocketLaunchIcon sx={{ fontSize: 60, mb: 2 }} />
          </Box>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.75rem' },
              animation: 'fadeInUp 0.8s ease-out',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Connect with Top Tech Talent Worldwide
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              animation: 'fadeInUp 0.8s ease-out 0.2s',
              animationFillMode: 'both',
              opacity: 0.95,
            }}
          >
            TerraCode - Your platform to find exceptional developers and tech experts
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.4s',
            animationFillMode: 'both',
          }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/jobs"
              sx={{ 
                px: 4, 
                py: 1.5,
                bgcolor: 'white',
                color: '#667eea',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Browse Jobs
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5, 
                color: 'white', 
                borderColor: 'white',
                borderWidth: 2,
                fontWeight: 'bold',
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
              component={Link}
              to="/portfolios"
            >
              View Portfolios
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
          Why Choose TechHire?
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          The ultimate marketplace for tech talent and opportunities
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              textAlign: 'center', 
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              },
            }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              }}>
                <WorkIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Quality Jobs
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse through hundreds of tech jobs from top companies worldwide
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              textAlign: 'center', 
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              },
            }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)',
              }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Expert Talent
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access a global pool of skilled developers and tech professionals
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              textAlign: 'center', 
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              },
            }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 4px 12px rgba(250, 112, 154, 0.4)',
              }}>
                <StarIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Portfolio Showcase
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Developers can showcase their work and skills to potential employers
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              height: '100%', 
              textAlign: 'center', 
              p: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
              },
            }}>
              <Box sx={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 4px 12px rgba(79, 172, 254, 0.4)',
              }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Track Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage applications and track hiring progress seamlessly
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 8 
      }}>
        <Container maxWidth="md">
          <Paper elevation={6} sx={{ 
            p: 6, 
            textAlign: 'center',
            borderRadius: 3,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of tech professionals and companies finding their perfect match
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/signup"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontWeight: 'bold',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign Up as Job Seeker
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/signup"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderWidth: 2,
                  borderColor: '#667eea',
                  color: '#667eea',
                  fontWeight: 'bold',
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign Up as Employer
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.1)' },
            }}>
              <Typography 
                variant="h3" 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                10,000+
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="500">
                Active Jobs
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.1)' },
            }}>
              <Typography 
                variant="h3" 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                50,000+
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="500">
                Tech Professionals
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.1)' },
            }}>
              <Typography 
                variant="h3" 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                5,000+
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight="500">
                Companies Hiring
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
