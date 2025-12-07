import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Chip,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../utils/services';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

const Companies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      // Get all jobs and extract unique companies
      const response = await jobService.getAllJobs({ status: 'active' });
      const jobs = response.data.jobs;

      // Group jobs by company
      const companyMap = new Map();
      
      jobs.forEach((job) => {
        if (job.company) {
          const companyId = job.company._id;
          if (!companyMap.has(companyId)) {
            companyMap.set(companyId, {
              ...job.company,
              jobCount: 1,
              jobs: [job],
            });
          } else {
            const company = companyMap.get(companyId);
            company.jobCount += 1;
            company.jobs.push(job);
          }
        }
      });

      setCompanies(Array.from(companyMap.values()));
    } catch (error) {
      console.error('Error fetching companies:', error);
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

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, color: 'primary.main' }}>
          Explore Companies
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Browse companies hiring on TerraCode
        </Typography>

        {companies.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No companies found yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {companies.map((company) => (
              <Grid item xs={12} sm={6} md={4} key={company._id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/companies/${company._id}`)}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'primary.main',
                      }}
                    >
                      <BusinessIcon sx={{ fontSize: 40 }} />
                    </Avatar>

                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {company.name}
                    </Typography>

                    {company.companyInfo?.industry && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {company.companyInfo.industry}
                      </Typography>
                    )}

                    {company.companyInfo?.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 2 }}>
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {company.companyInfo.location}
                        </Typography>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 2 }}>
                      <WorkIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {company.jobCount} {company.jobCount === 1 ? 'Open Position' : 'Open Positions'}
                      </Typography>
                    </Box>

                    {company.companyInfo?.description && (
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
                        {company.companyInfo.description}
                      </Typography>
                    )}

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ borderRadius: '25px', mt: 2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/companies/${company._id}`);
                      }}
                    >
                      View Company
                    </Button>
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

export default Companies;