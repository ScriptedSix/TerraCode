import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { portfolioService } from "../../utils/services";
import PersonIcon from '@mui/icons-material/Person';

const Portfolios = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await portfolioService.getAllPortfolios();
      setPortfolios(response.data.portfolios);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
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
        <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
          Explore Developer Portfolios
        </Typography>

        {portfolios.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No portfolios found yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {portfolios.map((portfolio) => (
              <Grid item xs={12} sm={6} md={4} key={portfolio._id}>
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
                  onClick={() => navigate(`/portfolios/${portfolio.user._id}`)}
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
                      {portfolio.user?.profile?.profilePicture ? (
                        <img
                          src={portfolio.user.profile.profilePicture}
                          alt={portfolio.user.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <PersonIcon sx={{ fontSize: 40 }} />
                      )}
                    </Avatar>

                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {portfolio.user?.name || 'Developer'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {portfolio.user?.profile?.bio || 'Developer'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {portfolio.user?.profile?.location || 'Location not specified'}
                    </Typography>

                    {/* Stats */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {portfolio.user?.profile?.experience || '0'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Years of Experience
                        </Typography>
                      </Box>
                      <Box sx={{ borderLeft: '1px solid', borderColor: 'divider' }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {portfolio.projects?.length || 0}+
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Projects
                        </Typography>
                      </Box>
                    </Box>

                    {/* Skills */}
                    {portfolio.user?.profile?.skills && portfolio.user.profile.skills.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
                        {portfolio.user.profile.skills.slice(0, 3).map((skill, index) => (
                          <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                        ))}
                        {portfolio.user.profile.skills.length > 3 && (
                          <Chip label={`+${portfolio.user.profile.skills.length - 3}`} size="small" />
                        )}
                      </Box>
                    )}

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ borderRadius: '25px', mt: 2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/portfolios/${portfolio.user._id}`);
                      }}
                    >
                      Contact for Work
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

export default Portfolios;
