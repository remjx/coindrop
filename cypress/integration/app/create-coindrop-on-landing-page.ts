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
      cy.getCookie('pendingLoginCreatePiggybankPath')
        .should('have.property', 'value', testCoindropName_lr9rzm);
      cy.login();
      cy.contains('Creating Coindrop');
      cy.url().should('eq', `${Cypress.config().baseUrl}/create`);
      cy.wait("@createPiggybank");
      cy.contains('This Coindrop has not been set up yet.');
      cy.url().should('eq', `${Cypress.config().baseUrl}/${testCoindropName_lr9rzm}`);
      cy.getCookie('pendingLoginCreatePiggybankPath')
        .should('not.exist');
    });
});

export {};
