import { Box, Container, Typography, TextField, Button, Link as MuiLink, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import logo from '../../assets/logo.jpg';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
  }

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    const result = await login(data.email, data.password);

    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'developer') {
        navigate('/dashboard/developer');
      } else if (result.user.role === 'company') {
        navigate('/dashboard/company');
      } else if (result.user.role === 'admin') {
        navigate('/dashboard/admin');
      }
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #E8F4F8 0%, #FFF8E7 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 4,
            p: 5,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <img src={logo} alt="TerraCode" style={{ height: '80px' }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}
          >
            Welcome Back to TerraCode
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              sx={{ mb: 3 }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mb: 2 }}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <MuiLink
                component={Link}
                to="/forgot-password"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'underline',
                  '&:hover': { color: 'primary.dark' },
                }}
              >
                Forgot Password
              </MuiLink>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: 'primary.main',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '30px',
                mb: 3,
              }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Typography align="center" variant="body1">
              New to TerraCode?{' '}
              <MuiLink
                component={Link}
                to="/signup"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  '&:hover': { color: 'primary.dark' },
                }}
              >
                Create an Account
              </MuiLink>
            </Typography>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
