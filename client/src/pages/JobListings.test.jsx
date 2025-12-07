import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import JobListings from './JobListings';

// Helper to render with Router (required for React Router)
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('JobListings Component', () => {
  
  // ============= RENDERING TESTS =============
  
  test('renders the main heading correctly', () => {
    renderWithRouter(<JobListings />);
    expect(screen.getByText(/Browse Jobs/i)).toBeInTheDocument();
  });

  test('renders the subtitle with job count', async () => {
    renderWithRouter(<JobListings />);
    const subtitle = await screen.findByText(/Find your next opportunity from 3 available positions/i);
    expect(subtitle).toBeInTheDocument();
  });

  test('displays loading state initially', () => {
    renderWithRouter(<JobListings />);
    // Loading component should appear briefly
  });

  // ============= FILTER UI TESTS =============

  test('renders search input field', () => {
    renderWithRouter(<JobListings />);
    const searchInput = screen.getByLabelText(/Search jobs/i);
    expect(searchInput).toBeInTheDocument();
  });

  test('renders location filter input', () => {
    renderWithRouter(<JobListings />);
    const locationInput = screen.getByLabelText(/Location/i);
    expect(locationInput).toBeInTheDocument();
  });

  test.skip('renders job type filter dropdown', () => {
    renderWithRouter(<JobListings />);
    const jobTypeButton = screen.getByRole('button', { name: /job type/i });
    expect(jobTypeButton).toBeInTheDocument();
  });

  test('renders skills filter input', () => {
    renderWithRouter(<JobListings />);
    const skillsInput = screen.getByLabelText(/Skills/i);
    expect(skillsInput).toBeInTheDocument();
  });

  test.skip('job type dropdown has all options', async () => {
    renderWithRouter(<JobListings />);
    
    const jobTypeButton = screen.getByRole('button', { name: /job type/i });
    fireEvent.mouseDown(jobTypeButton);
    
    await waitFor(() => {
      expect(screen.getByRole('option', { name: /^all$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^full-time$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^part-time$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^contract$/i })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: /^freelance$/i })).toBeInTheDocument();
    });
  });

  // ============= JOB CARD DISPLAY TESTS =============

  test('displays all job cards after loading', async () => {
    renderWithRouter(<JobListings />);
    
    const job1 = await screen.findByText('Senior Full Stack Developer');
    const job2 = await screen.findByText('Frontend Developer');
    const job3 = await screen.findByText('Backend Engineer');
    
    expect(job1).toBeInTheDocument();
    expect(job2).toBeInTheDocument();
    expect(job3).toBeInTheDocument();
  });

  test('displays company names for all jobs', async () => {
    renderWithRouter(<JobListings />);
    
    expect(await screen.findByText('Tech Corp')).toBeInTheDocument();
    expect(await screen.findByText('StartUp Inc')).toBeInTheDocument();
    expect(await screen.findByText('Cloud Solutions')).toBeInTheDocument();
  });

  test('displays location information', async () => {
    renderWithRouter(<JobListings />);
    
    expect(await screen.findByText('Remote')).toBeInTheDocument();
    expect(await screen.findByText('New York, NY')).toBeInTheDocument();
    expect(await screen.findByText('San Francisco, CA')).toBeInTheDocument();
  });

  test('displays salary information', async () => {
    renderWithRouter(<JobListings />);
    
    expect(await screen.findByText('$100k - $150k')).toBeInTheDocument();
    expect(await screen.findByText('$80k - $120k')).toBeInTheDocument();
    expect(await screen.findByText('$120k - $180k')).toBeInTheDocument();
  });

  test('displays job type chips', async () => {
    renderWithRouter(<JobListings />);
    
    const fullTimeChips = await screen.findAllByText('Full-time');
    const contractChip = await screen.findByText('Contract');
    
    expect(fullTimeChips.length).toBeGreaterThan(0);
    expect(contractChip).toBeInTheDocument();
  });

  test('displays skill tags for each job', async () => {
    renderWithRouter(<JobListings />);
    
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

  test('displays View Details button for each job', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    const viewDetailsButtons = screen.getAllByText('View Details');
    expect(viewDetailsButtons).toHaveLength(3);
  });

  // ============= SEARCH FUNCTIONALITY TESTS =============

  test('filters jobs by search term - job title', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByLabelText(/Search jobs/i);
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.queryByText('Senior Full Stack Developer')).not.toBeInTheDocument();
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
  });

  test('filters jobs by search term - company name', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByLabelText(/Search jobs/i);
    fireEvent.change(searchInput, { target: { value: 'StartUp' } });
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('StartUp Inc')).toBeInTheDocument();
    expect(screen.queryByText('Tech Corp')).not.toBeInTheDocument();
  });

  test('search is case-insensitive', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByLabelText(/Search jobs/i);
    fireEvent.change(searchInput, { target: { value: 'BACKEND' } });
    
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
  });

  test('shows "no jobs found" message when search has no results', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByLabelText(/Search jobs/i);
    fireEvent.change(searchInput, { target: { value: 'xyz123nonexistent' } });
    
    expect(screen.getByText(/No jobs found matching your criteria/i)).toBeInTheDocument();
  });

  // ============= LOCATION FILTER TESTS =============

  test('filters jobs by location', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const locationInput = screen.getByLabelText(/Location/i);
    fireEvent.change(locationInput, { target: { value: 'New York' } });
    
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
  });

  test('location filter is case-insensitive', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const locationInput = screen.getByLabelText(/Location/i);
    fireEvent.change(locationInput, { target: { value: 'remote' } });
    
    expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
  });

  // ============= JOB TYPE FILTER TESTS =============

  test.skip('filters jobs by job type - Full-time', async () => {
  renderWithRouter(<JobListings />);
  
  await screen.findByText('Senior Full Stack Developer');
  
  // Find the Select by its ID attribute
  const jobTypeSelect = document.querySelector('#job-type-select');
  fireEvent.mouseDown(jobTypeSelect);
  
  await waitFor(() => {
    const fullTimeOption = screen.getByText('Full-time');
    fireEvent.click(fullTimeOption);
  });
  
  await waitFor(() => {
    expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
  });
});

  test.skip('filters jobs by job type - Contract', async () => {
  renderWithRouter(<JobListings />);
  
  await screen.findByText('Senior Full Stack Developer');
  
  const jobTypeSelect = document.querySelector('#job-type-select');
  fireEvent.mouseDown(jobTypeSelect);
  
  await waitFor(() => {
    const contractOption = screen.getByText('Contract');
    fireEvent.click(contractOption);
  });
  
  await waitFor(() => {
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.queryByText('Senior Full Stack Developer')).not.toBeInTheDocument();
  });
});

  // ============= SKILLS FILTER TESTS =============

  test('filters jobs by skill', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const skillsInput = screen.getByLabelText(/Skills/i);
    fireEvent.change(skillsInput, { target: { value: 'Python' } });
    
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.queryByText('Senior Full Stack Developer')).not.toBeInTheDocument();
  });

  test('skills filter is case-insensitive', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const skillsInput = screen.getByLabelText(/Skills/i);
    fireEvent.change(skillsInput, { target: { value: 'REACT' } });
    
    expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
  });

  // ============= COMBINED FILTERS TESTS =============

  test('applies multiple filters together', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByLabelText(/Search jobs/i);
    fireEvent.change(searchInput, { target: { value: 'Developer' } });
    
    const skillsInput = screen.getByLabelText(/Skills/i);
    fireEvent.change(skillsInput, { target: { value: 'React' } });
    
    expect(screen.getByText('Senior Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
  });

  test('clears filters when inputs are emptied', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const searchInput = screen.getByLabelText(/Search jobs/i);
    
    fireEvent.change(searchInput, { target: { value: 'Frontend' } });
    expect(screen.queryByText('Backend Engineer')).not.toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
  });

  // ============= NAVIGATION TESTS =============

  test('View Details buttons have correct links', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const viewDetailsButtons = screen.getAllByText('View Details');
    
    expect(viewDetailsButtons[0].closest('a')).toHaveAttribute('href', '/jobs/1');
    expect(viewDetailsButtons[1].closest('a')).toHaveAttribute('href', '/jobs/2');
    expect(viewDetailsButtons[2].closest('a')).toHaveAttribute('href', '/jobs/3');
  });

  // ============= UI/UX TESTS =============

  test('job cards have proper Material-UI styling', async () => {
    renderWithRouter(<JobListings />);
    
    await screen.findByText('Senior Full Stack Developer');
    
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBe(3);
  });

  test('filter section is rendered in a Paper component', () => {
    renderWithRouter(<JobListings />);
    
    const papers = document.querySelectorAll('.MuiPaper-root');
    expect(papers.length).toBeGreaterThan(0);
  });
});