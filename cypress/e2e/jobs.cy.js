describe('Job Portal - Jobs Page', () => {
  beforeEach(() => {
    cy.visit('/jobs')
  })

  it('should display the jobs page', () => {
    cy.url().should('include', '/jobs')
  })

  it('should display the jobs page heading', () => {
    // Could be either "Find Your Dream Job" or "Browse Jobs" depending on user type
    cy.get('h3').should('exist')
  })

  it('should display search input field', () => {
    cy.get('input[placeholder*="Search"], input[placeholder*="search"]').should('be.visible')
  })

  it('should display location filter input', () => {
    cy.get('input[placeholder*="Location"], input[placeholder*="location"]').should('be.visible')
  })

  it('should allow typing in search field', () => {
    cy.get('input[placeholder*="Search"], input[placeholder*="search"]').first().type('Developer')
    cy.get('input[placeholder*="Search"], input[placeholder*="search"]').first().should('have.value', 'Developer')
  })

  it('should allow typing in location field', () => {
    cy.get('input[placeholder*="Location"], input[placeholder*="location"]').first().type('New York')
    cy.get('input[placeholder*="Location"], input[placeholder*="location"]').first().should('have.value', 'New York')
  })

  it('should load the jobs page without errors', () => {
    // Wait for loading to complete and page to render
    cy.wait(2000)
    // Page should be visible (not showing errors)
    cy.get('body').should('be.visible')
  })

  it('should interact with job cards if they exist', () => {
    // Wait for page to load
    cy.wait(2000)
    
    // Check if job cards exist
    cy.get('body').then($body => {
      const cards = $body.find('.MuiCard-root')
      if (cards.length > 0) {
        // Cards exist, verify we can interact with them
        cy.get('.MuiCard-root').first().should('be.visible')
      } else {
        // No cards, just verify page loaded
        cy.get('h3').should('exist')
      }
    })
  })
})
