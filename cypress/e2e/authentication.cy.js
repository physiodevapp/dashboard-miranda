

describe('Authentication processs', () => {

  beforeEach(() => {
    cy.login("jwt@example.org", "1234");
  })

  it('Navigate to the dashboard after log in successfully', () => {

    cy.url().should('include', '/dashboard');

  });

  it('Navigate back to the Login page after clicking on logout icon', () => {
    
    cy.logout();

    cy.url().should('include', '/login');

  })
})