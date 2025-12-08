describe('Configure Coindrop', () => {
    before(() => {
      cy.logout();
      cy.login();
    });

    const testID_qee1vc = "qee1vc";
    const testCoindropName_qee1vc = `test-coindrop-tid-${testID_qee1vc}`;
    const paymentMethodValue = 'cashApp';
    const paymentMethodDisplayName = "CashApp";
    const name = 'Test Name';
    const address = 'Test Address';
    it('Update Coindrop data', () => {
        cy.intercept({
            method: 'GET',
            url: `/${testCoindropName_qee1vc}`,
            headers: {
                isToForceStaticRegeneration: "true",
            },
        }).as('triggerStaticRegenerationAfterSubmit');
        cy.callFirestore("delete", `piggybanks/${testCoindropName_qee1vc}`);
        cy.callFirestore("set", `piggybanks/${testCoindropName_qee1vc}`, { owner_uid: Cypress.env("TEST_UID") });
        cy.visit(`/${testCoindropName_qee1vc}`);
        cy.contains('This Coindrop has not been set up yet.');
        cy.get('#avatar-input-container')
            .find('img#avatar-img')
            .should('have.attr', 'alt', 'avatar placeholder');
        cy.get('input#input-name')
            .type(name);
        cy.get('button#add-payment-method-button')
            .click();
        cy.get('[data-cy=select-payment-method-container-default-blank]')
            .find('select')
            .select(paymentMethodValue);
        cy.get(`#address-input-${paymentMethodValue}`)
            .type(address);
        cy.get('#configure-coindrop-form')
            .submit();
        cy.wait('@triggerStaticRegenerationAfterSubmit');
        // Result
        cy.get(`#payment-method-button-${paymentMethodValue}`)
            .click();
        cy.contains(`${name}'s ${paymentMethodDisplayName} address`);
        cy.contains(address);
        cy.get('canvas#payment-method-qr-code');
    });
});

export {};
