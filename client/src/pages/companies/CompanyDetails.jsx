import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Avatar,
  Divider,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService, userService } from '../../utils/services';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

const CompanyDetails = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCompanyData();
  }, [companyId]);

  const fetchCompanyData = async () => {
    try {
      const [companyResponse, jobsResponse] = await Promise.all([
        userService.getUserById(companyId),
        jobService.getJobsByCompany(companyId),
      ]);

      setCompany(companyResponse.data);
      setJobs(jobsResponse.data.jobs);
    } catch (error) {
      console.error('Error fetching company:', error);
      setError('Company not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !company) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">{error || 'Company not found'}</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Company Header */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
              }}
            >
              <BusinessIcon sx={{ fontSize: 60 }} />
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {company.companyInfo?.companyName || company.name}
              </Typography>
              
              {company.companyInfo?.industry && (
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  {company.companyInfo.industry}
                </Typography>
              )}

              {company.companyInfo?.location && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                  <LocationOnIcon color="action" />
                  <Typography variant="body1">{company.companyInfo.location}</Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  sx={{ borderRadius: '25px', px: 3 }}
                  href={`mailto:${company.email}`}
                >
                  Contact HR
                </Button>

                {company.companyInfo?.website && (
                  <Button
                    variant="outlined"
                    startIcon={<LanguageIcon />}
                    sx={{ borderRadius: '25px', px: 3 }}
                    href={company.companyInfo.website}
                    target="_blank"
                  >
                    Visit Website
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* About Company */}
        {company.companyInfo?.description && (
          <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              About Us
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {company.companyInfo.description}
            </Typography>
          </Paper>
        )}

        {/* Company Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {jobs.filter(j => j.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Job Openings
              </Typography>
            </Paper>
          </Grid>

          {company.companyInfo?.companySize && (
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <BusinessIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {company.companyInfo.companySize}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Company Size
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Open Positions */}
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Open Positions ({jobs.filter(j => j.status === 'active').length})
        </Typography>

        {jobs.filter(j => j.status === 'active').length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No active job openings at the moment.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {jobs.filter(j => j.status === 'active').map((job) => (
              <Grid item xs={12} key={job._id}>
                <Card
                  sx={{
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {job.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                            <LocationOnIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary">
                              {job.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                            <WorkIcon fontSize="small" color="action" />
                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                              {job.jobType}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Chip
                        label={job.experienceLevel}
                        color="primary"
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {job.description}
                    </Typography>

                    {job.skills && job.skills.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        {job.skills.slice(0, 5).map((skill, index) => (
                          <Chip key={index} label={skill} size="small" variant="outlined" />
                        ))}
                      </Box>
                    )}

                    {job.salary && (
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {job.salary.currency} ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CompanyDetails;