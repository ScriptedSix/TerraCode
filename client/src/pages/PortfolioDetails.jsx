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
import { read } from '../api/api-portfolio';

const PortfolioDetails = () => {
  const { portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolioDetails();
  }, [portfolioId]);

  const fetchPortfolioDetails = async () => {
    try {
      setLoading(true);
      
      // Mock data matching the Portfolios page
      const mockDevelopers = {
        '674d1a2e8f3c4b5e6a7d8901': {
          _id: '674d1a2e8f3c4b5e6a7d8901',
          name: 'Sarah Chen',
          email: 'sarah.chen@email.com',
          role: 'developer',
          profile: {
            rating: 4.9,
            bio: 'Full-stack developer with 8+ years of experience in React, Node.js, and cloud technologies. Passionate about building scalable web applications.',
            skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker'],
            location: 'San Francisco, CA',
            github: 'https://github.com/sarahchen',
            linkedin: 'https://linkedin.com/in/sarahchen',
            website: 'https://sarahchen.dev',
          }
        },
        '674d1a2e8f3c4b5e6a7d8902': {
          _id: '674d1a2e8f3c4b5e6a7d8902',
          name: 'Marcus Johnson',
          email: 'marcus.j@email.com',
          role: 'developer',
          profile: {
            rating: 4.8,
            bio: 'Senior Software Engineer specializing in microservices architecture and DevOps. Experience with large-scale distributed systems.',
            skills: ['Java', 'Spring Boot', 'Kubernetes', 'PostgreSQL', 'Redis', 'CI/CD'],
            location: 'Austin, TX',
            github: 'https://github.com/marcusj',
            linkedin: 'https://linkedin.com/in/marcusjohnson',
            website: 'https://marcusj.dev',
          }
        },
        '674d1a2e8f3c4b5e6a7d8903': {
          _id: '674d1a2e8f3c4b5e6a7d8903',
          name: 'Aisha Patel',
          email: 'aisha.patel@email.com',
          role: 'developer',
          profile: {
            rating: 4.7,
            bio: 'Frontend specialist with expertise in modern JavaScript frameworks and UI/UX design. Creating beautiful and performant user experiences.',
            skills: ['React', 'Vue.js', 'CSS3', 'Tailwind', 'Figma', 'JavaScript'],
            location: 'Toronto, ON',
            github: 'https://github.com/aishapatel',
            linkedin: 'https://linkedin.com/in/aishapatel',
            website: 'https://aishapatel.design',
          }
        },
        '674d1a2e8f3c4b5e6a7d8904': {
          _id: '674d1a2e8f3c4b5e6a7d8904',
          name: 'David Kim',
          email: 'david.kim@email.com',
          role: 'developer',
          profile: {
            rating: 4.6,
            bio: 'Data Engineer and ML enthusiast. Building data pipelines and implementing machine learning solutions for business problems.',
            skills: ['Python', 'TensorFlow', 'Apache Spark', 'SQL', 'Azure', 'Pandas'],
            location: 'Seattle, WA',
            github: 'https://github.com/davidkim',
            linkedin: 'https://linkedin.com/in/davidkim',
            website: 'https://davidkim.ai',
          }
        },
        '674d1a2e8f3c4b5e6a7d8905': {
          _id: '674d1a2e8f3c4b5e6a7d8905',
          name: 'Elena Rodriguez',
          email: 'elena.r@email.com',
          role: 'developer',
          profile: {
            rating: 4.5,
            bio: 'Mobile app developer with cross-platform expertise. Published 15+ apps with over 2M downloads combined.',
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'GraphQL'],
            location: 'Miami, FL',
            github: 'https://github.com/elenarodriguez',
            linkedin: 'https://linkedin.com/in/elenarodriguez',
            website: 'https://elenarodriguez.app',
          }
        },
        '674d1a2e8f3c4b5e6a7d8906': {
          _id: '674d1a2e8f3c4b5e6a7d8906',
          name: 'James Wright',
          email: 'james.wright@email.com',
          role: 'developer',
          profile: {
            rating: 4.4,
            bio: 'Backend engineer focused on API design and database optimization. Expert in building high-performance RESTful services.',
            skills: ['Go', 'Python', 'MySQL', 'Redis', 'RabbitMQ', 'Linux'],
            location: 'New York, NY',
            github: 'https://github.com/jameswright',
            linkedin: 'https://linkedin.com/in/jameswright',
            website: 'https://jameswright.tech',
          }
        },
        '674d1a2e8f3c4b5e6a7d8907': {
          _id: '674d1a2e8f3c4b5e6a7d8907',
          name: 'Priya Sharma',
          email: 'priya.sharma@email.com',
          role: 'developer',
          profile: {
            rating: 4.3,
            bio: 'Full-stack JavaScript developer with a passion for clean code and test-driven development. Contributor to open-source projects.',
            skills: ['JavaScript', 'Next.js', 'Express', 'Jest', 'MongoDB', 'Git'],
            location: 'Vancouver, BC',
            github: 'https://github.com/priyasharma',
            linkedin: 'https://linkedin.com/in/priyasharma',
            website: 'https://priyasharma.codes',
          }
        },
        '674d1a2e8f3c4b5e6a7d8908': {
          _id: '674d1a2e8f3c4b5e6a7d8908',
          name: 'Ahmed Hassan',
          email: 'ahmed.hassan@email.com',
          role: 'developer',
          profile: {
            rating: 4.2,
            bio: 'Security-focused developer with expertise in application security and penetration testing. CISSP certified.',
            skills: ['C++', 'Python', 'Cybersecurity', 'Penetration Testing', 'Bash', 'Docker'],
            location: 'Boston, MA',
            github: 'https://github.com/ahmedhassan',
            linkedin: 'https://linkedin.com/in/ahmedhassan',
            website: 'https://ahmedhassan.security',
          }
        },
      };

      const mockUser = mockDevelopers[portfolioId];
      
      if (!mockUser) {
        setError('Portfolio not found');
        setLoading(false);
        return;
      }

      setUser(mockUser);
      setPortfolio({ user: mockUser });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio details:', error);
      setError('Failed to load portfolio');
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !portfolio || !user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5">{error || 'Portfolio not found'}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 100, height: 100, mr: 3, bgcolor: 'primary.main' }}>
            {user.profile?.profilePicture ? (
              <img src={user.profile.profilePicture} alt={user.name} />
            ) : (
              <PersonIcon fontSize="large" />
            )}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {user.role}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<EmailIcon />} href={`mailto:${user.email}`}>
              Contact
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" paragraph>
          {user.profile?.bio || 'No bio available'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {user.profile?.github && (
            <IconButton href={user.profile.github} target="_blank" color="primary">
              <GitHubIcon />
            </IconButton>
          )}
          {user.profile?.linkedin && (
            <IconButton href={user.profile.linkedin} target="_blank" color="primary">
              <LinkedInIcon />
            </IconButton>
          )}
          {user.profile?.portfolio && (
            <IconButton href={user.profile.portfolio} target="_blank" color="primary">
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
            {portfolio.projects && portfolio.projects.length > 0 ? (
              portfolio.projects.map((project, index) => (
                <Box key={project._id || index} sx={{ mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {project.description}
                  </Typography>
                  {project.technologies && project.technologies.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                      {project.technologies.map((tech, idx) => (
                        <Chip key={idx} label={tech} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    {project.githubLink && (
                      <Button size="small" href={project.githubLink} target="_blank">
                        GitHub
                      </Button>
                    )}
                    {project.liveLink && (
                      <Button size="small" href={project.liveLink} target="_blank">
                        Live Demo
                      </Button>
                    )}
                  </Box>
                  {project.startDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      {new Date(project.startDate).toLocaleDateString()} 
                      {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                    </Typography>
                  )}
                  {index < portfolio.projects.length - 1 && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No projects available
              </Typography>
            )}
          </Paper>

          {/* Experience */}
          {user.profile?.experience && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Experience
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">
                {user.profile.experience}
              </Typography>
            </Paper>
          )}
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Skills */}
          {user.profile?.skills && user.profile.skills.length > 0 && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {user.profile.skills.map((skill, index) => (
                  <Chip key={index} label={skill} color="primary" />
                ))}
              </Box>
            </Paper>
          )}

          {/* Location */}
          {user.profile?.location && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Location
              </Typography>
              <Typography variant="body2">
                {user.profile.location}
              </Typography>
            </Paper>
          )}

          {/* Contact */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
              {user.email}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortfolioDetails;