describe('Landing page', () => {
  const testCoindropName = "test-coindrop";

  before(() => {
    cy.logout();
    cy.callFirestore("delete", `piggybanks/${testCoindropName}`);
  });

  it('Displays auth modal when user clicks Log In button', () => {
    cy.visit('/');
    cy.get('#log-in-button').click();
    cy.url().should('eq', `${Cypress.config().baseUrl}/auth`);
    cy.get("#chakra-modal-auth-modal")
      .contains("Sign in to continue");
    cy.get("#firebaseui_container")
      .contains("Sign in with Google");
    cy.get("#firebaseui_container")
    .contains("Sign in with Facebook");
  });

  it('Creates Coindrop if Create button is pressed and user logs in (Test ID: jwYLtI)', () => {
    cy.visit('/');
    cy.pause();
    cy.get("#create-coindrop-input")
      .type(testCoindropName);
    cy.get("#create-coindrop-form").submit();
    cy.login();
    cy.contains('My Coindrops');
    cy.contains(testCoindropName);
  });
});

export {};
