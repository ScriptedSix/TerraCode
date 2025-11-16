import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import auth from '../user/auth-helper';
import logo from '../static/logo.jpg';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const jwt = auth.isAuthenticated();
  const isAuthenticated = !!jwt;
  const userRole = jwt?.user?.role;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    auth.clearJWT(() => {
      navigate('/');
    });
    handleClose();
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src={logo}
          alt="Scripted Six Logo"
          sx={{
            height: 45,
            width: 45,
            mr: 2,
            borderRadius: 1,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1) rotate(5deg)',
            },
          }}
        />
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          TerraCode
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {/* Show Jobs for everyone */}
          <Button 
            color="inherit" 
            component={Link} 
            to={userRole === 'company' ? '/portfolios' : '/jobs'}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.15)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {userRole === 'company' ? 'Browse Talent' : 'Browse Jobs'}
          </Button>
          
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to={userRole === 'company' ? '/employer-dashboard' : '/dashboard'}
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/profile"
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Profile
              </Button>
              <Button 
                color="inherit" 
                onClick={handleSignout}
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/signin"
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.15)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
              <Button 
                variant="contained" 
                component={Link} 
                to="/signup"
                sx={{
                  bgcolor: 'white',
                  color: '#667eea',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to={userRole === 'company' ? '/portfolios' : '/jobs'}>
              {userRole === 'company' ? 'Browse Talent' : 'Browse Jobs'}
            </MenuItem>
            {isAuthenticated ? (
              <>
                <MenuItem onClick={handleClose} component={Link} to={userRole === 'company' ? '/employer-dashboard' : '/dashboard'}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleClose} component={Link} to="/signin">
                  Sign In
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/signup">
                  Sign Up
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
