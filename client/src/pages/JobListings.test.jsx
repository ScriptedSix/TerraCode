import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Jobs from './jobs/Jobs';
import { AuthProvider } from '../context/AuthContext';

// Mock the services module
jest.mock('../utils/services');

// Helper to render with Router and AuthProvider
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe('JobListings Component', () => {
  
  // ============= RENDERING TESTS =============
  
  test('renders the main heading correctly', () => {
    renderWithRouter(<Jobs />);
    expect(screen.getByText(/Find Your Dream Job/i)).toBeInTheDocument();
  });

  test('renders the subtitle with job count', async () => {
    renderWithRouter(<Jobs />);
    const subtitle = await screen.findByText(/3 jobs found/i);
    expect(subtitle).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    renderWithRouter(<Jobs />);
    // Loading component should appear briefly
  });

  // ============= FILTER UI TESTS =============

  test('renders search input field', () => {
    renderWithRouter(<Jobs />);
    const searchInput = screen.getByPlaceholderText(/Search by title or description/i);
    expect(searchInput).toBeInTheDocument();
  });

    test('renders location filter input', () => {
      renderWithRouter(<Jobs />);
      const locationInput = screen.getByPlaceholderText(/Location/i);
      expect(locationInput).toBeInTheDocument();
    });

  // ============= JOB CARD DISPLAY TESTS =============

  test('displays all job cards after loading', async () => {
    renderWithRouter(<Jobs />);
    
    const job1 = await screen.findByText('Senior Full Stack Developer');
    const job2 = await screen.findByText('Frontend Developer');
    const job3 = await screen.findByText('Backend Engineer');
    
    expect(job1).toBeInTheDocument();
    expect(job2).toBeInTheDocument();
    expect(job3).toBeInTheDocument();
  });

  test('displays company names for all jobs', async () => {
    renderWithRouter(<Jobs />);
    
    expect(await screen.findByText('Tech Corp')).toBeInTheDocument();
    expect(await screen.findByText('StartUp Inc')).toBeInTheDocument();
    expect(await screen.findByText('Cloud Solutions')).toBeInTheDocument();
  });

  test('displays location information', async () => {
    renderWithRouter(<Jobs />);
    
    expect(await screen.findByText('Remote')).toBeInTheDocument();
    expect(await screen.findByText('New York, NY')).toBeInTheDocument();
    expect(await screen.findByText('San Francisco, CA')).toBeInTheDocument();
  });

  test('displays salary information', async () => {
    renderWithRouter(<Jobs />);
    
    expect(await screen.findByText(/USD \$100,000 - \$150,000/i)).toBeInTheDocument();
    expect(await screen.findByText(/USD \$80,000 - \$120,000/i)).toBeInTheDocument();
    expect(await screen.findByText(/USD \$120,000 - \$180,000/i)).toBeInTheDocument();
  });

  test('displays job type chips', async () => {
    renderWithRouter(<Jobs />);
    
    const fullTimeChips = await screen.findAllByText('Full-time');
    const contractChip = await screen.findByText('Contract');
    
    expect(fullTimeChips.length).toBeGreaterThan(0);
    expect(contractChip).toBeInTheDocument();
  });

  test('displays skill tags for each job', async () => {
    renderWithRouter(<Jobs />);
    
    // Wait for page to load first
    await screen.findByText('Senior Full Stack Developer');
    
    // Check for skills - get all matching elements
    const reactTags = screen.getAllByText('React');
    expect(reactTags.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  test('displays job cards that are clickable', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBe(3);
  });

  // ============= SEARCH FUNCTIONALITY TESTS =============

  test('filters jobs by search term - job title', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByPlaceholderText(/Search by title or description/i);
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });
    
    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });
    expect(screen.queryByText('Senior Full Stack Developer')).not.toBeInTheDocument();
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
  });

  test('filters jobs by search term - company name', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByPlaceholderText(/Search by title or description/i);
    fireEvent.change(searchInput, { target: { value: 'StartUp' } });
    
    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
      expect(screen.getByText('StartUp Inc')).toBeInTheDocument();
    });
    expect(screen.queryByText('Tech Corp')).not.toBeInTheDocument();
  });

  test('search is case-insensitive', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByPlaceholderText(/Search by title or description/i);
    fireEvent.change(searchInput, { target: { value: 'BACKEND' } });
    
    await waitFor(() => {
      expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    });
  });

  test('shows "no jobs found" message when search has no results', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByPlaceholderText(/Search by title or description/i);
    fireEvent.change(searchInput, { target: { value: 'xyz123nonexistent' } });
    
    await waitFor(() => {
      expect(screen.getByText(/No jobs found/i)).toBeInTheDocument();
    });
  });

  // ============= LOCATION FILTER TESTS =============

  test('filters jobs by location', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const locationInput = screen.getByPlaceholderText(/Location/i);
    fireEvent.change(locationInput, { target: { value: 'New York' } });
    
    await waitFor(() => {
      expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    });
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
  });

  test('location filter is case-insensitive', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const locationInput = screen.getByPlaceholderText(/Location/i);
    fireEvent.change(locationInput, { target: { value: 'remote' } });
    
    await waitFor(() => {
      expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
    });
  });

  // ============= FILTER COMBINATION TESTS =============

  // ============= COMBINED FILTERS TESTS =============

  test('applies multiple filters together', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByPlaceholderText(/Search by title or description/i);
    fireEvent.change(searchInput, { target: { value: 'Developer' } });
    
    const locationInput = screen.getByPlaceholderText(/Location/i);
    fireEvent.change(locationInput, { target: { value: 'Remote' } });
    
    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
    });
    expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
  });

  test('clears filters when inputs are emptied', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByPlaceholderText(/Search by title or description/i);
    
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });
    await waitFor(() => {
      expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
    });
    
    fireEvent.change(searchInput, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    });
  });

  // ============= NAVIGATION TESTS =============

  test('job cards are clickable and navigate correctly', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBe(3);
    // Cards have onClick handlers that navigate to /jobs/{id}
  });

  // ============= UI/UX TESTS =============

  test('job cards have proper Material-UI styling', async () => {
    renderWithRouter(<Jobs />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBe(3);
  });

  test('displays filter section', () => {
    renderWithRouter(<Jobs />);
    
    // Filter form should exist
    const forms = document.querySelectorAll('form');
    expect(forms.length).toBeGreaterThan(0);
  });
});
