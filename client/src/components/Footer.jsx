import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              TerraCode
            </Typography>
            <Typography variant="body2">
              Connecting tech experts worldwide with companies and clients.
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
              Developed by Scripted Six
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link component={RouterLink} to="/jobs" color="inherit" display="block" sx={{ mb: 1 }}>
              Browse Jobs
            </Link>
            <Link component={RouterLink} to="/portfolios" color="inherit" display="block" sx={{ mb: 1 }}>
              Portfolios
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block">
              About Us
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: info@terracode.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} TerraCode by Scripted Six. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
