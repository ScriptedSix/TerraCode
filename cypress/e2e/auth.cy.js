describe('Job Portal - Authentication', () => {
  it('should navigate to login page directly', () => {
    cy.visit('/login')
    cy.url().should('include', '/login')
  })

  it('should display login page with TerraCode branding', () => {
    cy.visit('/login')
    cy.contains('Welcome Back to TerraCode').should('be.visible')
  })

  it('should display login form with email and password fields', () => {
    cy.visit('/login')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.contains('button', 'Login').should('be.visible')
  })

  it('should have link to signup page from login', () => {
    cy.visit('/login')
    cy.contains('Create an Account').should('be.visible')
    cy.contains('Create an Account').click()
    cy.url().should('include', '/signup')
  })

  it('should navigate to signup page directly', () => {
    cy.visit('/signup')
    cy.url().should('include', '/signup')
  })

  it('should display signup form', () => {
    cy.visit('/signup')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
  })

  it('should show validation error for empty login form', () => {
    cy.visit('/login')
    cy.contains('button', 'Login').click()
    // Form validation should show error messages
    cy.contains('Email is required').should('be.visible')
  })

  it('should have forgot password link', () => {
    cy.visit('/login')
    cy.contains('Forgot Password').should('be.visible')
  })
})
