describe('Create Coindrop on Dashboard', () => {
    before(() => {
      cy.logout();
      cy.login();
    });

    const testID_dbk8fi = "dbk8fi";
    const testCoindropName_dbk8fi = `test-coindrop-tid-${testID_dbk8fi}`;
    it('Create Coindrop on Dashboard', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/createPiggybank',
        }).as('createPiggybank');
        cy.intercept({
            url: /^https:\/\/firestore.googleapis.com\/.*/,
        }).as('getUserOwnedPiggybanks');
        cy.callFirestore("delete", `piggybanks/${testCoindropName_dbk8fi}`);
        cy.visit('/dashboard');
        cy.contains('Loading...');
        cy.wait('@getUserOwnedPiggybanks');
        cy.get('#create-new-coindrop-button', { timeout: 15000 })
            .click();
        cy.get('#create-coindrop-input-')
            .type(testCoindropName_dbk8fi);
        cy.get('#create-coindrop-form-')
            .submit();
        cy.wait('@createPiggybank');
        cy.contains('This Coindrop has not been set up yet.');
        cy.url().should('eq', `${Cypress.config().baseUrl}/${testCoindropName_dbk8fi}`);
    });
});

export {};
