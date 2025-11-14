import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Loading from '../components/Loading';

const PortfolioDetails = () => {
  const { portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioDetails();
  }, [portfolioId]);

  const fetchPortfolioDetails = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/portfolios/${portfolioId}`);
      // const data = await response.json();
      
      // Mock data
      const mockPortfolio = {
        _id: portfolioId,
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: '',
        },
        title: 'Full Stack Developer',
        bio: 'Passionate developer with 5+ years of experience in building web applications. I love creating efficient, scalable solutions and learning new technologies.',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'TypeScript'],
        experience: [
          {
            company: 'Tech Corp',
            position: 'Senior Developer',
            duration: '2021 - Present',
            description: 'Leading development of cloud-based applications',
          },
          {
            company: 'StartUp Inc',
            position: 'Full Stack Developer',
            duration: '2019 - 2021',
            description: 'Built and maintained multiple web applications',
          },
        ],
        projects: [
          {
            name: 'E-commerce Platform',
            description: 'Built a full-featured online store with payment integration, inventory management, and admin dashboard',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            link: 'https://github.com/johndoe/ecommerce',
          },
          {
            name: 'Task Manager App',
            description: 'Real-time task management system with team collaboration features',
            technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
            link: 'https://github.com/johndoe/taskmanager',
          },
          {
            name: 'Weather Dashboard',
            description: 'Interactive weather forecast application with location-based services',
            technologies: ['React', 'OpenWeather API', 'Material-UI'],
            link: 'https://github.com/johndoe/weather',
          },
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            year: '2019',
          },
        ],
        certifications: [
          'AWS Certified Developer',
          'MongoDB Certified Developer',
        ],
        rating: 4.5,
        reviewCount: 12,
        reviews: [
          {
            author: 'Jane Smith',
            rating: 5,
            comment: 'Excellent developer! Delivered the project on time and exceeded expectations.',
            date: '2024-10-15',
          },
          {
            author: 'Mike Johnson',
            rating: 4,
            comment: 'Great communication and technical skills. Would work with again.',
            date: '2024-09-20',
          },
        ],
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        website: 'https://johndoe.dev',
      };
      
      setPortfolio(mockPortfolio);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!portfolio) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">Portfolio not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}>
            {portfolio.user.avatar ? (
              <img src={portfolio.user.avatar} alt={portfolio.user.name} />
            ) : (
              <PersonIcon fontSize="large" />
            )}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" fontWeight="bold">
              {portfolio.user.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {portfolio.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating value={portfolio.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({portfolio.reviewCount} reviews)
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<EmailIcon />}>
              Contact
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" paragraph>
          {portfolio.bio}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {portfolio.github && (
            <IconButton href={portfolio.github} target="_blank" color="primary">
              <GitHubIcon />
            </IconButton>
          )}
          {portfolio.linkedin && (
            <IconButton href={portfolio.linkedin} target="_blank" color="primary">
              <LinkedInIcon />
            </IconButton>
          )}
          {portfolio.website && (
            <IconButton href={portfolio.website} target="_blank" color="primary">
              <LanguageIcon />
            </IconButton>
          )}
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Projects */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Projects
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {portfolio.projects.map((project, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  {project.name}
                </Typography>
                <Typography variant="body2" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  {project.technologies.map((tech, idx) => (
                    <Chip key={idx} label={tech} size="small" color="primary" variant="outlined" />
                  ))}
                </Box>
                {project.link && (
                  <Button size="small" href={project.link} target="_blank">
                    View Project
                  </Button>
                )}
                {index < portfolio.projects.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>

          {/* Experience */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Experience
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {portfolio.experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  {exp.position}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  {exp.company}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {exp.duration}
                </Typography>
                <Typography variant="body2">
                  {exp.description}
                </Typography>
                {index < portfolio.experience.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>

          {/* Reviews */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Reviews
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {portfolio.reviews.map((review, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {review.author}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
                {index < portfolio.reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Skills */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {portfolio.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" />
              ))}
            </Box>
          </Paper>

          {/* Education */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Education
            </Typography>
            {portfolio.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {edu.degree}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.institution}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {edu.year}
                </Typography>
              </Box>
            ))}
          </Paper>

          {/* Certifications */}
          {portfolio.certifications && portfolio.certifications.length > 0 && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Certifications
              </Typography>
              {portfolio.certifications.map((cert, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {cert}
                </Typography>
              ))}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortfolioDetails;
