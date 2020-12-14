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
            method: 'GET',
            url: /^https:\/\/firestore.googleapis.com\/.*/,
        }).as('getUserOwnedPiggybanksGET');
        cy.intercept({
            method: 'POST',
            url: /^https:\/\/firestore.googleapis.com\/.*/,
        }).as('getUserOwnedPiggybanksPOST');
        cy.callFirestore("delete", `piggybanks/${testCoindropName_dbk8fi}`);
        cy.visit('/dashboard');
        /* --- Not sure why Firebase makes multiple API calls for a single .get(): --- */
        cy.wait('@getUserOwnedPiggybanksPOST');
        cy.wait('@getUserOwnedPiggybanksPOST');
        cy.get(`a#link-to-coindrop-${testCoindropName_dbk8fi}`)
            .should('not.exist');
        cy.get('#create-new-coindrop-button')
            .click();
        cy.get('#create-coindrop-input')
            .type(testCoindropName_dbk8fi);
        cy.get('#create-coindrop-form')
            .submit();
        cy.wait('@createPiggybank');
        cy.contains('This Coindrop has not been set up yet.');
        cy.url().should('eq', `${Cypress.config().baseUrl}/${testCoindropName_dbk8fi}`);
    });
});

export {};
