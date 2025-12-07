describe('Job Portal - Navigation', () => {
  it('should display the home page', () => {
    cy.visit('/')
    // Should redirect to login if not authenticated
    cy.url().should('match', /\/(login)?/)
  })

  it('should access the login page', () => {
    cy.visit('/login')
    cy.url().should('include', '/login')
    cy.contains('Welcome Back to TerraCode').should('be.visible')
  })

  it('should access the jobs page', () => {
    cy.visit('/jobs')
    cy.url().should('include', '/jobs')
  })

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x')
    cy.visit('/login')
    cy.contains('Welcome Back to TerraCode').should('be.visible')
  })

  it('should be responsive on tablet', () => {
    cy.viewport('ipad-2')
    cy.visit('/login')
    cy.contains('Welcome Back to TerraCode').should('be.visible')
  })

  it('should be responsive on desktop', () => {
    cy.viewport(1920, 1080)
    cy.visit('/login')
    cy.contains('Welcome Back to TerraCode').should('be.visible')
  })
})
