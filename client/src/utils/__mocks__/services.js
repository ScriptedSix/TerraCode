// Mock job data for tests
const mockJobs = [
  {
    _id: '1',
    title: 'Senior Full Stack Developer',
    description: 'We are looking for an experienced full stack developer',
    company: { _id: 'company1', name: 'Tech Corp' },
    location: 'Remote',
    salary: { currency: 'USD', min: 100000, max: 150000 },
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    skills: ['React', 'Node.js', 'MongoDB'],
    status: 'active',
  },
  {
    _id: '2',
    title: 'Frontend Developer',
    description: 'Join our frontend team',
    company: { _id: 'company2', name: 'StartUp Inc' },
    location: 'New York, NY',
    salary: { currency: 'USD', min: 80000, max: 120000 },
    jobType: 'Contract',
    experienceLevel: 'Mid',
    skills: ['React', 'TypeScript', 'CSS'],
    status: 'active',
  },
  {
    _id: '3',
    title: 'Backend Engineer',
    description: 'Backend position',
    company: { _id: 'company3', name: 'Cloud Solutions' },
    location: 'San Francisco, CA',
    salary: { currency: 'USD', min: 120000, max: 180000 },
    jobType: 'Full-time',
    experienceLevel: 'Senior',
    skills: ['Python', 'AWS', 'Docker'],
    status: 'active',
  },
];

export const authService = {
  register: jest.fn(),
  login: jest.fn(),
  getMe: jest.fn(),
};

export const userService = {
  getUserById: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  uploadProfilePicture: jest.fn(),
  getAllUsers: jest.fn(),
};

export const jobService = {
  getAllJobs: jest.fn((params = {}) => {
    let filteredJobs = [...mockJobs];
    
    // Filter by search term
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.company.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by location
    if (params.location) {
      const locationLower = params.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().includes(locationLower)
      );
    }
    
    // Filter by job type
    if (params.jobType) {
      filteredJobs = filteredJobs.filter(job =>
        job.jobType === params.jobType
      );
    }
    
    // Filter by experience level
    if (params.experienceLevel) {
      filteredJobs = filteredJobs.filter(job =>
        job.experienceLevel === params.experienceLevel
      );
    }
    
    return Promise.resolve({ data: { jobs: filteredJobs } });
  }),
  getJobById: jest.fn(),
  createJob: jest.fn(),
  updateJob: jest.fn(),
  deleteJob: jest.fn(),
  getJobsByCompany: jest.fn(),
};

export const applicationService = {
  applyToJob: jest.fn(),
  getMyApplications: jest.fn(),
  getApplicationsForJob: jest.fn(),
  updateApplicationStatus: jest.fn(),
  deleteApplication: jest.fn(),
};

export const portfolioService = {
  getAllPortfolios: jest.fn(),
  createOrUpdatePortfolio: jest.fn(),
  getMyPortfolio: jest.fn(),
  getPortfolioByUserId: jest.fn(),
  deletePortfolio: jest.fn(),
  addProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
};
