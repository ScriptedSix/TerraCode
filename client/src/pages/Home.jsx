import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroLaptop from '../assets/hero-laptop.png';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      {/* Hero Section with Background */}
      <Box
        sx={{
          minHeight: '90vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          // Background image
          backgroundImage: `linear-gradient(135deg, rgba(232, 244, 248, 0.3) 0%, rgba(255, 248, 231, 0.2) 100%), url(${heroLaptop})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: '700px',
              zIndex: 2,
            }}
          >
            {/* Text Content */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
                textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
              }}
            >
              Hi I'm :
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: 'primary.main',
                mb: 3,
                textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
                lineHeight: 1.2,
              }}
            >
              Where Tech talent meets opportunity
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'text.primary',
                mb: 4,
                fontWeight: 500,
                textShadow: '1px 1px 2px rgba(255,255,255,0.9)',
              }}
            >
              Connecting innovative companies with top-tier talent, globally. 
              Build your team, or launch your career.
            </Typography>

            <Button
              component={Link}
              to={isAuthenticated ? "/jobs" : "/signup"}
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: '30px',
                boxShadow: '0 4px 12px rgba(0,51,102,0.3)',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(0,51,102,0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>

        {/* Decorative overlay gradient for better text readability on the right */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(232, 244, 248, 0.3) 100%)',
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Box>

      {/* Trust Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 500, color: 'white' }}>
          Trusted by many users across the world
        </Typography>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" sx={{ mb: 6, fontWeight: 700, color: 'primary.main' }}>
          Why Choose TerraCode?
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {/* Feature 1 */}
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
              For Developers
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Showcase your portfolio, apply to jobs, and connect with top companies worldwide.
            </Typography>
          </Box>

          {/* Feature 2 */}
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
              For Companies
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Post jobs, discover talented developers, and build your dream team effortlessly.
            </Typography>
          </Box>

          {/* Feature 3 */}
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
              Global Reach
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Connect with opportunities and talent from around the world, all in one platform.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;