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
      cy.intercept({
        url: /^https:\/\/firestore.googleapis.com\/.*/,
      }).as('getUserOwnedPiggybanks');
      cy.callFirestore("delete", `piggybanks/${testCoindropName_lr9rzm}`);
      cy.visit('/');
      cy.get("#create-coindrop-input")
        .type(testCoindropName_lr9rzm);
      cy.get("#create-coindrop-form").submit();
      cy.login();
      cy.url().should('eq', `${Cypress.config().baseUrl}/dashboard`);
      cy.wait("@createPiggybank");
      cy.wait("@getUserOwnedPiggybanks");
      cy.reload(); // This is a workaround for not being able to clearly identify the proper XHR requests to intercept
      cy.get('#user-owned-coindrops')
          .contains(`coindrop.to/${testCoindropName_lr9rzm}`);
    });
});

export {};
