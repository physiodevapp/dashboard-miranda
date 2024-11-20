

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

    cy.visitPath('/rooms');

    cy.url().should('include', '/login');
    
  });

  it("Redirect to Dashboard page if user is logged but trying to go back to Login page", () => {

    cy.login("admin.miranda@example.com", "0000");

    cy.wait(1000);

    cy.visitPath('/login');

    cy.url().should('include', '/dashboard');
    
  });

  it("Redirect to Dashboard page if user is logged and the page does not exist", () => {

    cy.login("admin.miranda@example.com", "0000");

    cy.wait(1000);

    cy.visitPath('/fdsfdsa');

    cy.url().should('include', '/dashboard');

  });

  it("Redirect to Login page if the page does not exist", () => {

    cy.visitPath('/people');

    cy.url().should('include', '/login');

  });
  
});

