describe('Create Coindrop on landing page', () => {
    before(() => {
      cy.logout();
    });

    const testID_lr9rzm = "lr9rzm";
    const testCoindropName_lr9rzm = `test-coindrop-tid-${testID_lr9rzm}`;
    it(`Create Coindrop on landing page (Test ID: ${testID_lr9rzm})`, () => {
      cy.intercept({
        method: 'POST',
        url: '/api/createPiggybank',
      }).as('createPiggybank');
      cy.callFirestore("delete", `piggybanks/${testCoindropName_lr9rzm}`);
      cy.visit('/');
      cy.get("#create-coindrop-input")
        .type(testCoindropName_lr9rzm);
      cy.get("#create-coindrop-form").submit();
      cy.login();
      cy.url().should('eq', `${Cypress.config().baseUrl}/dashboard`);
      cy.wait("@createPiggybank");
      cy.url().should('eq', `${Cypress.config().baseUrl}/${testCoindropName_lr9rzm}`);
      cy.contains('This Coindrop has not been set up yet.');
    });
});

export {};
