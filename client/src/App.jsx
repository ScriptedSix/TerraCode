import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import Profile from './pages/profile';
import MyPortfolio from './pages/MyPortfolio';
import theme from './theme';

// Components
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Jobs from './pages/jobs/Jobs';
import JobDetails from './pages/jobs/JobDetails';
import PostJob from './pages/jobs/PostJob';
import Portfolios from './pages/portfolio/Portfolios';
import PortfolioDetails from './pages/portfolio/PortfolioDetails';
import DeveloperDashboard from './pages/dashboard/DeveloperDashboard';
import CompanyDashboard from './pages/dashboard/CompanyDashboard';
import MyApplications from './pages/dashboard/MyApplications';
import Companies from './pages/companies/Companies';
import CompanyDetails from './pages/companies/CompanyDetails';
import JobApplications from './pages/dashboard/JobApplications';

// Redirect component based on role
const RoleBasedRedirect = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === 'developer') {
    return <Navigate to="/dashboard/developer" replace />;
  } else if (user.role === 'company') {
    return <Navigate to="/dashboard/company" replace />;
  } else if (user.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <>
      <Navbar />
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/jobs" element={<Jobs />} />
  <Route path="/jobs/:id" element={<JobDetails />} />
  <Route path="/portfolios" element={<Portfolios />} />
  <Route path="/portfolios/:userId" element={<PortfolioDetails />} />
  <Route path="/companies" element={<Companies />} />
  <Route path="/companies/:companyId" element={<CompanyDetails />} />

  {/* Protected Routes - Any Authenticated User */}
  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />
    <Route
    path="/job-applications/:jobId"
    element={
        <ProtectedRoute allowedRoles={['company']}>
        <JobApplications />
        </ProtectedRoute>
    }
    />
  {/* Protected Routes - Developer Only */}
  <Route
    path="/dashboard/developer"
    element={
      <ProtectedRoute allowedRoles={['developer']}>
        <DeveloperDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/my-applications"
    element={
      <ProtectedRoute allowedRoles={['developer']}>
        <MyApplications />
      </ProtectedRoute>
    }
  />
  <Route
    path="/my-portfolio"
    element={
      <ProtectedRoute allowedRoles={['developer']}>
        <MyPortfolio />
      </ProtectedRoute>
    }
  />

  {/* Protected Routes - Company Only */}
  <Route
    path="/dashboard/company"
    element={
      <ProtectedRoute allowedRoles={['company']}>
        <CompanyDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/post-job"
    element={
      <ProtectedRoute allowedRoles={['company']}>
        <PostJob />
      </ProtectedRoute>
    }
  />

  {/* Generic Dashboard Redirect */}
  <Route path="/dashboard" element={<RoleBasedRedirect />} />

  {/* Catch all */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
