import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroLaptop from '../assets/hero-laptop.png';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '90vh',
          background: 'linear-gradient(135deg, #E8F4F8 0%, #FFF8E7 100%)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            {/* Left Content */}
            <Box sx={{ flex: 1, minWidth: '300px' }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                Hi I'm :
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 3,
                }}
              >
                Where Tech talent meets opportunity
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '500px',
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
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
            </Box>

            {/* Right Image */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '300px',
              }}
            >
              <img
                src={heroLaptop}
                alt="Tech Laptop"
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: 'auto',
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
                }}
              />
            </Box>
          </Box>
        </Container>
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
        <Typography variant="h3" align="center" sx={{ mb: 6 }}>
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
