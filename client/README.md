# TerraCode Frontend

Modern, responsive React frontend for the TerraCode Tech Talent Marketplace platform. Built with React, Material-UI, and Vite.

## Features

### For All Users
- 🏠 Beautiful landing page with hero section
- 🔍 Browse jobs with advanced search and filters
- 👥 Explore developer portfolios
- 🔐 Secure authentication with JWT
- 📱 Fully responsive design

### For Developers
- 📊 Personalized dashboard with application stats
- 💼 Job search and application management
- 📝 Portfolio creation and management
- 📈 Track application status (pending, reviewed, accepted, rejected)
- 👤 Profile management

### For Companies
- 📊 Company dashboard with job posting stats
- ✍️ Create and manage job postings
- 📋 View and manage applications
- 🔍 Browse developer portfolios
- 🏢 Company profile management

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI) v5** - Component library
- **React Router v6** - Client-side routing
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Context API** - State management

## Project Structure

```
src/
├── assets/              # Images and static files
├── components/          # Reusable components
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components (Navbar, ProtectedRoute)
│   ├── jobs/           # Job-related components
│   └── portfolio/      # Portfolio components
├── pages/              # Page components
│   ├── auth/           # Login, Signup
│   ├── dashboard/      # Dashboards for different roles
│   ├── jobs/           # Job listing, details, post job
│   └── portfolio/      # Portfolio listing and details
├── context/            # React Context (AuthContext)
├── utils/              # Utility functions
│   ├── api.js          # Axios instance with interceptors
│   └── services.js     # API service functions
├── theme.js            # MUI theme configuration
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. **Navigate to the project directory**
   ```bash
   cd terracode-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api`. 

The API proxy is configured in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

### Authentication Flow

1. User logs in or registers
2. Backend returns JWT token
3. Token stored in `sessionStorage`
4. Axios interceptor adds token to all requests
5. Token validated on protected routes

## Available Routes

### Public Routes
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/jobs` - Browse all jobs
- `/jobs/:id` - Job details
- `/portfolios` - Browse developer portfolios
- `/portfolios/:userId` - Portfolio details

### Protected Routes (Developer)
- `/dashboard/developer` - Developer dashboard
- `/my-applications` - View and manage applications

### Protected Routes (Company)
- `/dashboard/company` - Company dashboard
- `/post-job` - Create new job posting

## Key Features Explained

### Role-Based Access Control

The app uses a `ProtectedRoute` component to restrict access based on user roles:

```jsx
<ProtectedRoute allowedRoles={['developer']}>
  <DeveloperDashboard />
</ProtectedRoute>
```

### Authentication Context

The `AuthContext` provides auth state and methods throughout the app:

```javascript
const { user, isAuthenticated, isDeveloper, isCompany, login, logout } = useAuth();
```

### Form Validation

Forms use `react-hook-form` for validation and handling:

```javascript
const { register, handleSubmit, formState: { errors } } = useForm();
```

### API Services

All API calls are organized in `services.js`:

```javascript
import { jobService, applicationService, portfolioService } from './utils/services';

// Example usage
const response = await jobService.getAllJobs({ location: 'Toronto', jobType: 'full-time' });
```

## Environment Variables

The backend URL can be configured in `vite.config.js` if needed:

```javascript
proxy: {
  '/api': {
    target: 'http://your-backend-url',
    changeOrigin: true,
  }
}
```

## Design System

### Colors
- Primary (Navy Blue): `#003366`
- Secondary (Light Blue): `#4A90E2`
- Background: `#F5F5F5`
- Cream: `#FFF8E7`

### Typography
- Font Family: Roboto, Helvetica, Arial
- Headings: Bold (700) or Semibold (600)
- Body: Regular (400)

### Components
- Rounded buttons: `borderRadius: 25px`
- Consistent shadows on hover
- Smooth transitions

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link if needed

### Adding a New API Endpoint

1. Add service function in `src/utils/services.js`
2. Use the service in your component

### Modifying Theme

Edit `src/theme.js` to customize colors, typography, or component styles.

## Troubleshooting

### CORS Issues
Make sure the backend has CORS enabled for `http://localhost:5173`

### 401 Unauthorized
- Check if token is valid in sessionStorage
- Backend might have restarted (token expired)
- Try logging in again

### API Connection Failed
- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.js`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style
2. Use Material-UI components when possible
3. Keep components small and focused
4. Add comments for complex logic
5. Test on multiple screen sizes

## License

MIT License - See LICENSE file for details

## Team

Built with ❤️ by the ScriptedSix Team

- Jihna Park - Tester
- Elizaveta Semenova - Project Manager
- Kelly Cyusa - Frontend Developer
- Tesneem Awuti - Backend Developer
- Tabya Kaur Sarao - Designer
- Benjamin Nguyen - Data Engineer
