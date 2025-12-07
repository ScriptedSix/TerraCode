import api from './api';

// Auth Services
export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// User Services
export const userService = {
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),
  uploadProfilePicture: (formData) => 
    api.post('/users/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getAllUsers: () => api.get('/users'),
};

// Job Services
export const jobService = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getJobsByCompany: (companyId) => api.get(`/jobs/company/${companyId}`),
};

// Application Services
export const applicationService = {
  applyToJob: (data) => api.post('/applications', data),
  getMyApplications: () => api.get('/applications/my-applications'),
  getApplicationsForJob: (jobId) => api.get(`/applications/job/${jobId}`),
  updateApplicationStatus: (id, data) => api.put(`/applications/${id}`, data),
  deleteApplication: (id) => api.delete(`/applications/${id}`),
};

// Portfolio Services
export const portfolioService = {
  getAllPortfolios: () => api.get('/portfolio'),
  createOrUpdatePortfolio: (data) => api.post('/portfolio', data),
  getMyPortfolio: () => api.get('/portfolio/my-portfolio'),
  getPortfolioByUserId: (userId) => api.get(`/portfolio/user/${userId}`),
  deletePortfolio: (id) => api.delete(`/portfolio/${id}`),
  addProject: (data) => api.post('/portfolio/project', data),
  updateProject: (projectId, data) => api.put(`/portfolio/project/${projectId}`, data),
  deleteProject: (projectId) => api.delete(`/portfolio/project/${projectId}`),
};
