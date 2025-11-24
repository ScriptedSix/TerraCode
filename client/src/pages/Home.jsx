import { Container, Typography, Button, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import heroImage from '../static/hero-laptop.png';

const Home = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #d9e4ff 0%, #ffe4c4 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 4,
    }}>
      {/* Hero card matching TerraCode prototype */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          borderRadius: 8,
          overflow: 'hidden',
          position: 'relative',
          minHeight: { xs: 400, md: 500 },
          background: 'linear-gradient(135deg, rgba(250, 252, 255, 0.92) 0%, rgba(255, 248, 236, 0.96) 100%)',
          boxShadow: '0 24px 70px rgba(15, 35, 95, 0.2)',
          mb: 4,
        }}
      >
        {/* Background laptop image - positioned absolutely behind text */}
        <Box
          component="img"
          src={heroImage}
          alt="TerraCode hero laptop"
          sx={{
            position: 'absolute',
            right: { xs: '5%', md: '8%' },
            top: '50%',
            transform: 'translateY(-50%)',
            width: { xs: '60%', md: '52%' },
            height: 'auto',
            opacity: 0.85,
            filter: 'drop-shadow(0 22px 55px rgba(0,0,0,0.2))',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Text content overlay - positioned above the image */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            px: { xs: 4, md: 6 },
            py: { xs: 6, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            maxWidth: { xs: '100%', md: '55%' },
          }}
        >
              <Typography
                variant="h5"
                sx={{ color: '#143a5b', fontWeight: 600, mb: 1 }}
              >
                Hi I’m :
              </Typography>
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: '2.1rem', md: '2.8rem' },
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: '#123663',
                  mb: 2,
                }}
              >
                Where Tech talent
                <br />
                meets opportunity
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.98rem', md: '1.05rem' },
                  color: '#2f4764',
                  maxWidth: 450,
                  mb: 3,
                }}
              >
                Connecting innovative companies with top-tier talent, globally. Build your
                team, or launch your career.
              </Typography>

              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/jobs"
                sx={{
                  alignSelf: 'flex-start',
                  px: 4,
                  py: 1.3,
                  borderRadius: 999,
                  backgroundColor: '#003b8e',
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 16px 40px rgba(0, 59, 142, 0.45)',
                  '&:hover': {
                    backgroundColor: '#002e6c',
                    boxShadow: '0 20px 50px rgba(0, 46, 108, 0.6)',
                  },
                }}
              >
                Get Started
              </Button>
          </Box>
      </Box>

      {/* Trusted strip */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          borderRadius: 8,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: '#05396b',
          py: 3.5,
          textAlign: 'center',
          color: '#f7fbff',
          fontWeight: 600,
          mb: 4,
        }}
      >
        Trusted by many users across the world
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
