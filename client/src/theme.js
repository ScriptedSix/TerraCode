import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366', // Navy blue
      light: '#4A90E2', // Light blue
      dark: '#002244',
    },
    secondary: {
      main: '#4A90E2', // Light blue accent
      light: '#7FB3E8',
      dark: '#2E6DB5',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
      cream: '#FFF8E7',
    },
    text: {
      primary: '#003366',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      color: '#003366',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#003366',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#003366',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#003366',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#003366',
    },
    body1: {
      fontSize: '1rem',
      color: '#003366',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 25,
          padding: '10px 30px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;
