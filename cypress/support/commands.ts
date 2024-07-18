/// <reference types="cypress" />

// Import Cypress commands
import '@testing-library/cypress/add-commands';

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<JQuery<HTMLElement>>
      logout(): Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('http://localhost:5173/login');

  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('logout', () => {
  cy.get('li[id="logout"]').click();
})