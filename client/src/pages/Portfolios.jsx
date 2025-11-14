import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  Chip,
  TextField,
  Rating,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import Loading from '../components/Loading';

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch('/api/portfolios');
      // const data = await response.json();
      
      // Mock data
      const mockPortfolios = [
        {
          _id: '1',
          user: {
            name: 'John Doe',
            avatar: '',
          },
          title: 'Full Stack Developer',
          bio: 'Passionate developer with 5+ years of experience in building web applications',
          skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
          projects: [
            { name: 'E-commerce Platform', description: 'Built a full-featured online store' },
            { name: 'Task Manager App', description: 'Real-time task management system' },
          ],
          rating: 4.5,
          reviewCount: 12,
          github: 'https://github.com/johndoe',
          linkedin: 'https://linkedin.com/in/johndoe',
          website: 'https://johndoe.dev',
        },
        {
          _id: '2',
          user: {
            name: 'Jane Smith',
            avatar: '',
          },
          title: 'Frontend Specialist',
          bio: 'UI/UX enthusiast creating beautiful and responsive web interfaces',
          skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
          projects: [
            { name: 'Dashboard Design', description: 'Modern analytics dashboard' },
            { name: 'Portfolio Website', description: 'Interactive portfolio showcase' },
          ],
          rating: 5.0,
          reviewCount: 20,
          github: 'https://github.com/janesmith',
          linkedin: 'https://linkedin.com/in/janesmith',
          website: 'https://janesmith.com',
        },
        {
          _id: '3',
          user: {
            name: 'Mike Johnson',
            avatar: '',
          },
          title: 'Backend Engineer',
          bio: 'Specializing in scalable microservices and cloud architecture',
          skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
          projects: [
            { name: 'API Gateway', description: 'High-performance API management system' },
            { name: 'Data Pipeline', description: 'ETL pipeline for big data processing' },
          ],
          rating: 4.8,
          reviewCount: 15,
          github: 'https://github.com/mikejohnson',
          linkedin: 'https://linkedin.com/in/mikejohnson',
          website: '',
        },
      ];
      
      setPortfolios(mockPortfolios);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      setLoading(false);
    }
  };

  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch = 
      portfolio.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = !skillFilter || portfolio.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    
    return matchesSearch && matchesSkill;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Developer Portfolios
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Discover talented developers and their work
      </Typography>

      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search developers..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Filter by skill"
              variant="outlined"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Portfolio Cards */}
      <Grid container spacing={3}>
        {filteredPortfolios.map((portfolio) => (
          <Grid item xs={12} md={6} lg={4} key={portfolio._id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              '&:hover': { 
                boxShadow: '0 12px 28px rgba(102, 126, 234, 0.25)',
                transform: 'translateY(-8px)',
              },
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2, bgcolor: 'primary.main' }}>
                    {portfolio.user.avatar ? (
                      <img src={portfolio.user.avatar} alt={portfolio.user.name} />
                    ) : (
                      <PersonIcon fontSize="large" />
                    )}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {portfolio.user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {portfolio.title}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Rating value={portfolio.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                    ({portfolio.reviewCount} reviews)
                  </Typography>
                </Box>

                <Typography variant="body2" paragraph>
                  {portfolio.bio}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {portfolio.skills.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Featured Projects:
                  </Typography>
                  {portfolio.projects.slice(0, 2).map((project, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      • {project.name}
                    </Typography>
                  ))}
                </Box>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {portfolio.github && (
                      <Button
                        size="small"
                        href={portfolio.github}
                        target="_blank"
                        startIcon={<GitHubIcon />}
                      >
                        GitHub
                      </Button>
                    )}
                    {portfolio.linkedin && (
                      <Button
                        size="small"
                        href={portfolio.linkedin}
                        target="_blank"
                        startIcon={<LinkedInIcon />}
                      >
                        LinkedIn
                      </Button>
                    )}
                  </Box>
                  <Button
                    component={Link}
                    to={`/portfolios/${portfolio._id}`}
                    variant="contained"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    View Portfolio
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Portfolios;
