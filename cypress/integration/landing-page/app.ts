describe('Landing page', () => {
    before(() => {
      cy.logout();
      cy.login();
    });

    const testID_dbk8fi = "dbk8fi";
    const testCoindropName_dbk8fi = `test-coindrop-tid-${testID_dbk8fi}`;
    it('Allows creation of new Coindrop', () => {
        cy.callFirestore("delete", `piggybanks/${testCoindropName_dbk8fi}`);
        cy.visit('/dashboard');
        cy.get('#create-new-coindrop-button')
            .click();
        cy.get('#create-coindrop-input')
            .type(testCoindropName_dbk8fi);
        cy.get('#create-coindrop-form')
            .submit();
        cy.get('#user-owned-coindrops')
            .contains(`coindrop.to/${testCoindropName_dbk8fi}`);
        cy.get(`a#link-to-coindrop-${testCoindropName_dbk8fi}`)
            .should('have.attr', 'href', `/${testCoindropName_dbk8fi}`);
    });

    const testID_qee1vc = "qee1vc";
    const testCoindropName_qee1vc = `test-coindrop-tid-${testID_qee1vc}`;
    it('Happy path Coindrop initialization', () => {
        cy.callFirestore("delete", `piggybanks/${testCoindropName_qee1vc}`);
        cy.callFirestore("set", `piggybanks/${testCoindropName_qee1vc}`, { owner_id: Cypress.env("TEST_UID") });
        cy.visit(`/${testCoindropName_qee1vc}`);
        cy.contains('This piggybank has not been set up yet.');
        cy.get('#configure-coindrop-button')
            .click();
        cy.get('#avatar-input-container')
            .contains('img')
            .should('have.attr', 'alt', 'avatar placeholder');
    });
});

export {};
