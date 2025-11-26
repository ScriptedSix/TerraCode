import { AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const { user, isAuthenticated, logout, isDeveloper, isCompany, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const getDashboardLink = () => {
    if (isDeveloper) return '/dashboard/developer';
    if (isCompany) return '/dashboard/company';
    if (isAdmin) return '/dashboard/admin';
    return '/';
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo */}
        <Box 
          component={Link} 
          to="/" 
          sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img src={logo} alt="TerraCode" style={{ height: '40px', marginRight: '10px' }} />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Button 
            component={Link} 
            to="/jobs" 
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            Jobs
          </Button>
          
          <Button 
            component={Link} 
            to={isDeveloper ? "/companies" : "/portfolios"}
            sx={{ color: 'primary.main', fontWeight: 500 }}
          >
            Explore
          </Button>

          {isAuthenticated && (
            <Button 
              component={Link} 
              to={getDashboardLink()} 
              sx={{ color: 'primary.main', fontWeight: 500 }}
            >
              Dashboard
            </Button>
          )}

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <Button 
              component={Link} 
              to="/login"
              variant="contained"
              sx={{ 
                borderRadius: '25px',
                px: 3
              }}
            >
              Sign in
            </Button>
          ) : (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {user?.name?.charAt(0).toUpperCase() || <AccountCircleIcon />}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
                  Profile
                </MenuItem>
                {isDeveloper && (
                  <MenuItem onClick={() => { navigate('/my-portfolio'); handleMenuClose(); }}>
                    My Portfolio
                  </MenuItem>
                )}
                {isDeveloper && (
                  <MenuItem onClick={() => { navigate('/my-applications'); handleMenuClose(); }}>
                    My Applications
                  </MenuItem>
                )}
                {isCompany && (
                  <MenuItem onClick={() => { navigate('/my-jobs'); handleMenuClose(); }}>
                    My Jobs
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
