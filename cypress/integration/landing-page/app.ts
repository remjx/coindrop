describe('App', () => {
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
    const paymentMethodValue = 'cashApp';
    const paymentMethodDisplayName = "CashApp";
    const name = 'Test Name';
    const address = 'Test Address';
    it('Happy path Coindrop initialization', () => {
        cy.callFirestore("delete", `piggybanks/${testCoindropName_qee1vc}`);
        cy.callFirestore("set", `piggybanks/${testCoindropName_qee1vc}`, { owner_uid: Cypress.env("TEST_UID") });
        cy.visit(`/${testCoindropName_qee1vc}`);
        // Uninitialized Coindrop page
        cy.contains('This piggybank has not been set up yet.');
        cy.get('#configure-coindrop-button')
            .click();
        // Configure
        cy.get('#avatar-input-container')
            .find('img#avatar-img')
            .should('have.attr', 'alt', 'avatar placeholder');
        cy.get('input#input-name')
            .type(name);
        cy.get('button#add-payment-method-button')
            .click();
        cy.get('#accordion-button-accordion-item-default-blank')
            .click();
        cy.get(`#accordion-panel-accordion-item-default-blank`)
            .find('select')
            .select(paymentMethodValue);
        cy.get(`#address-input-${paymentMethodValue}`)
            .type(address);
        cy.get('#configure-coindrop-form')
            .submit();
        // Result
        cy.get(`#payment-method-button-${paymentMethodValue}`)
            .click();
        cy.contains(`${name}'s ${paymentMethodDisplayName} address`);
        cy.contains(address);
        cy.get('canvas#payment-method-qr-code');
    });
});

export {};
