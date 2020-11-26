describe('Landing page', () => {
  const testCoindropName = "test-coindrop";

  beforeEach(() => {
    cy.logout();
    cy.callFirestore("delete", `piggybanks/${testCoindropName}`);
  });

  it('Contains logo', () => {
    cy.visit('/');
    cy.contains('coindrop');
  });

  it.only('Creates Coindrop if Create button is pressed and user logs in (Test ID: jwYLtI)', () => {
    cy.visit('/');
    cy.pause();
    cy.get("#create-coindrop-input")
      .type(testCoindropName);
    cy.get("#create-coindrop-form").submit();
    cy.contains("Sign in to continue");
    cy.login();
    cy.contains('My Coindrops');
    cy.contains(testCoindropName);
  });
});

export {};
