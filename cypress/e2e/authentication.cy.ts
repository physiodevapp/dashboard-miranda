

describe('Login/Logout processs', () => {

  beforeEach(() => {
    cy.login("admin.miranda@example.com", "0000");
  })

  it('Navigate to the dashboard after log in successfully', () => {

    cy.url().should('include', '/dashboard');

  });

  it('Navigate back to the Login page after clicking on logout icon', () => {
    
    cy.logout();

    cy.url().should('include', '/login');

  });
});

describe("Redirection process", () => {

  it("Redirect to Login page if user is not logged", () => {

    cy.visit('http://localhost:5173/rooms');

    cy.url().should('include', '/login');
    
  });

  it("Redirect to Dashboard page if user is logged but trying to go back to Login page", () => {

    cy.login("admin.miranda@example.com", "0000");

    cy.wait(1000);

    cy.visit('http://localhost:5173/login');

    cy.url().should('include', '/dashboard');
    
  });

  it("Redirect to Dashboard page if user is logged and the page does not exist", () => {

    cy.login("admin.miranda@example.com", "0000");

    cy.wait(1000);

    cy.visit('http://localhost:5173/fdsfdsa');

    cy.url().should('include', '/dashboard');

  });

  it("Redirect to Login page if user is not logged and the page does not exist", () => {

    cy.visit('http://localhost:5173/people');

    cy.url().should('include', '/login');

  });
})