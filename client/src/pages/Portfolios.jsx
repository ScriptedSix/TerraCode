import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  TextField,
  Avatar,
  Rating,
} from '@mui/material';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import Loading from '../components/Loading';
import { list } from '../api/api-portfolio';
import auth from '../user/auth-helper';

const Portfolios = () => {
  const jwt = auth.isAuthenticated();
  const userRole = jwt?.user?.role;
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Mock data for developers
      const mockDevelopers = [
        {
          _id: '1',
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
          }
        },
        {
          _id: '2',
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
          }
        },
        {
          _id: '3',
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
          }
        },
        {
          _id: '4',
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
          }
        },
        {
          _id: '5',
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
          }
        },
        {
          _id: '6',
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
          }
        },
        {
          _id: '7',
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
          }
        },
        {
          _id: '8',
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
          }
        },
      ];

      // Sort by rating (highest first)
      const sortedDevelopers = mockDevelopers.sort((a, b) => b.profile.rating - a.profile.rating);
      setUsers(sortedDevelopers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.profile?.bio && user.profile.bio.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = !skillFilter || 
      (user.profile?.skills && user.profile.skills.some(skill => 
        skill.toLowerCase().includes(skillFilter.toLowerCase())
      ));
    
    return matchesSearch && matchesSkill;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Top Rated Developers
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Discover highly-rated talented developers and their work
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

      {/* User Cards */}
      <Grid container spacing={3}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user._id}>
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
                      {user.profile?.profilePicture ? (
                        <img src={user.profile.profilePicture} alt={user.name} />
                      ) : (
                        <PersonIcon fontSize="large" />
                      )}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {user.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating 
                          value={user.profile?.rating || 0} 
                          readOnly 
                          precision={0.5}
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({user.profile?.rating?.toFixed(1) || '0.0'})
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="body2" paragraph>
                    {user.profile?.bio || 'No bio available'}
                  </Typography>

                  {user.profile?.skills && user.profile.skills.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Skills:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {user.profile.skills.slice(0, 5).map((skill, index) => (
                          <Chip key={index} label={skill} size="small" color="primary" variant="outlined" />
                        ))}
                        {user.profile.skills.length > 5 && (
                          <Chip label={`+${user.profile.skills.length - 5}`} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                  )}

                  {user.profile?.location && (
                    <Typography variant="body2" color="text.secondary">
                      📍 {user.profile.location}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, width: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {user.profile?.github && (
                        <Button
                          size="small"
                          href={user.profile.github}
                          target="_blank"
                          startIcon={<GitHubIcon />}
                        >
                          GitHub
                        </Button>
                      )}
                      {user.profile?.linkedin && (
                        <Button
                          size="small"
                          href={user.profile.linkedin}
                          target="_blank"
                          startIcon={<LinkedInIcon />}
                        >
                          LinkedIn
                        </Button>
                      )}
                    </Box>
                    <Button
                      component={Link}
                      to={`/portfolios/${user._id}`}
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
                      View Profile
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No developers found
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Portfolios;