import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link as MuiLink,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import logo from '../../assets/logo.jpg';

const techSkills = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'React',
  'Node.js',
  'Angular',
  'Vue.js',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'Swift',
  'Kotlin',
  'TypeScript',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Kubernetes',
];

const Signup = () => {
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
  register,
  handleSubmit,
  control,
  watch,
  formState: { errors },
} = useForm({
  defaultValues: {
    role: 'developer',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    primarySkill: '',
  },
});

  const watchRole = watch('role');
  const watchPassword = watch('password');

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
  }

const onSubmit = async (data) => {
  setLoading(true);
  setError('');

  try {
    // Remove confirmPassword and primarySkill before sending
    const { confirmPassword, primarySkill, ...userData } = data;

    // Don't send profile object - backend doesn't need it on registration
    // Just send basic fields
    const registrationData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    const result = await registerUser(registrationData);

    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'developer') {
        navigate('/dashboard/developer');
      } else if (result.user.role === 'company') {
        navigate('/dashboard/company');
      }
    } else {
      setError(result.error);
    }
  } catch (err) {
    setError('Registration failed. Please try again.');
    console.error('Registration error:', err);
  } finally {
    setLoading(false);
  }
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #E8F4F8 0%, #FFF8E7 100%)',
        py: 4,
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
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={logo} alt="TerraCode" style={{ height: '60px' }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}
          >
            Create Your Free Account
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Role Selection */}
            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend" sx={{ mb: 1, color: 'primary.main', fontWeight: 600 }}>
                I am a:
              </FormLabel>
              <Controller
                name="role"
                control={control}
                rules={{ required: 'Please select a role' }}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel
                      value="developer"
                      control={<Radio />}
                      label="Developer"
                    />
                    <FormControlLabel
                      value="company"
                      control={<Radio />}
                      label="Company"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>

            <TextField
              fullWidth
              label="Name"
              sx={{ mb: 3 }}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

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

            {/* Primary Tech Skill (Developers only) */}
            {watchRole === 'developer' && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Primary Tech Skill</InputLabel>
                <Controller
                  name="primarySkill"
                  control={control}
                  rules={{ required: 'Primary skill is required' }}
                  render={({ field }) => (
                    <Select {...field} label="Primary Tech Skill">
                      {techSkills.map((skill) => (
                        <MenuItem key={skill} value={skill}>
                          {skill}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.primarySkill && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {errors.primarySkill.message}
                  </Typography>
                )}
              </FormControl>
            )}

            <TextField
              fullWidth
              label="Password"
              type="password"
              sx={{ mb: 3 }}
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

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              sx={{ mb: 4 }}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watchPassword || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

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
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Typography align="center" variant="body1">
              Already a user?{' '}
              <MuiLink
                component={Link}
                to="/login"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  textDecoration: 'underline',
                  '&:hover': { color: 'primary.dark' },
                }}
              >
                Sign In
              </MuiLink>
            </Typography>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
