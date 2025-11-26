import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { portfolioService } from '../utils/services';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const MyPortfolio = () => {
  const navigate = useNavigate();
  const { isDeveloper, user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isDeveloper) {
      navigate('/');
      return;
    }
    fetchPortfolio();
  }, [isDeveloper, navigate]);

  const fetchPortfolio = async () => {
    try {
      const response = await portfolioService.getMyPortfolio();
      setPortfolio(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        // Portfolio doesn't exist yet
        setPortfolio(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    reset({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
    });
    setDialogOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    reset({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
    });
    setDialogOpen(true);
  };

  const onSubmitProject = async (data) => {
    setError('');
    setSuccess('');

    try {
      const projectData = {
        ...data,
        technologies: data.technologies.split(',').map((t) => t.trim()),
      };

      if (editingProject) {
        // Update existing project
        await portfolioService.updateProject(editingProject._id, projectData);
        setSuccess('Project updated successfully!');
      } else {
        // Add new project
        if (!portfolio) {
          // Create portfolio first
          await portfolioService.createOrUpdatePortfolio({ projects: [projectData] });
        } else {
          await portfolioService.addProject(projectData);
        }
        setSuccess('Project added successfully!');
      }

      setDialogOpen(false);
      fetchPortfolio();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await portfolioService.deleteProject(projectId);
      setSuccess('Project deleted successfully!');
      fetchPortfolio();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
    }
  };

  if (loading) return null;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            My Portfolio
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProject}
            sx={{ borderRadius: '25px' }}
          >
            Add Project
          </Button>
        </Box>

        {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {!portfolio || portfolio.projects?.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              You haven't added any projects yet.
            </Typography>
            <Button variant="contained" onClick={handleAddProject}>
              Add Your First Project
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {portfolio.projects.map((project) => (
              <Grid item xs={12} md={6} key={project._id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {project.title}
                      </Typography>
                      <Box>
                        <IconButton size="small" onClick={() => handleEditProject(project)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteProject(project._id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>

                    {project.technologies && project.technologies.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                        {project.technologies.map((tech, index) => (
                          <Typography
                            key={index}
                            variant="caption"
                            sx={{
                              px: 1,
                              py: 0.5,
                              bgcolor: 'primary.light',
                              color: 'white',
                              borderRadius: 1,
                            }}
                          >
                            {tech}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {project.githubLink && (
                        <Button size="small" variant="outlined" href={project.githubLink} target="_blank">
                          GitHub
                        </Button>
                      )}
                      {project.liveLink && (
                        <Button size="small" variant="outlined" href={project.liveLink} target="_blank">
                          Live Demo
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add/Edit Project Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmitProject)}>
            <DialogContent>
              <TextField
                fullWidth
                label="Project Title"
                sx={{ mb: 2 }}
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                sx={{ mb: 2 }}
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <TextField
                fullWidth
                label="Technologies (comma-separated)"
                placeholder="React, Node.js, MongoDB"
                sx={{ mb: 2 }}
                {...register('technologies')}
              />

              <TextField
                fullWidth
                label="GitHub Link"
                placeholder="https://github.com/username/project"
                sx={{ mb: 2 }}
                {...register('githubLink')}
              />

              <TextField
                fullWidth
                label="Live Demo Link"
                placeholder="https://yourproject.com"
                {...register('liveLink')}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingProject ? 'Update' : 'Add'} Project
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  );
};

export default MyPortfolio;