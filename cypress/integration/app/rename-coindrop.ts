describe('Rename Coindrop page', () => {
    before(() => {
      cy.logout();
      cy.login();
    });

    const testID_uk3ld1 = "uk3ld1";
    const testCoindropName_uk3ld1_initial = `cy-${testID_uk3ld1}-initial`;
    const testCoindropName_uk3ld1_new = `cy-${testID_uk3ld1}-new`;
    const testCoindropName_uk3ld1_taken = `cy-${testID_uk3ld1}-taken`;
    const name_initial = 'Test Name Initial';
    const name_new = 'Test Name New';
    it('Rename Coindrop page', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/createPiggybank',
        }).as('createPiggybank');
        cy.callFirestore("delete", `piggybanks/${testCoindropName_uk3ld1_initial}`);
        cy.callFirestore("delete", `piggybanks/${testCoindropName_uk3ld1_new}`);
        cy.callFirestore("set", `piggybanks/${testCoindropName_uk3ld1_initial}`, {
            owner_uid: Cypress.env("TEST_UID"),
            name: name_initial,
            paymentMethods: {
                cashApp: {
                    address: "testAddress",
                },
            },
            accentColor: "orange",
            verb: "pay",
        });
        cy.callFirestore("set", `piggybanks/${testCoindropName_uk3ld1_taken}`, {
            owner_uid: Cypress.env("TEST_UID"),
        });
        cy.visit(`/${testCoindropName_uk3ld1_initial}`);
        cy.get('#configure-coindrop-button')
            .click();
        cy.get("input#input-piggybankId")
            .clear()
            .type(testCoindropName_uk3ld1_taken);
        cy.get('#piggybank-id-not-allowed', { timeout: 5500 }); // add 1.5s for debounce
        cy.get('button#save-configuration-btn').should('be.disabled');
        cy.get("input#input-piggybankId")
            .clear()
            .type(testCoindropName_uk3ld1_new);
        cy.get('#piggybank-id-ok', { timeout: 5500 }); // add 1.5s for debounce
        cy.get('button#save-configuration-btn').should('not.be.disabled');
        cy.get('input#input-name')
            .clear()
            .type(name_new);
        cy.get('#configure-coindrop-form')
            .submit();
        cy.wait('@createPiggybank');
        cy.url().should('eq', `${Cypress.config().baseUrl}/${testCoindropName_uk3ld1_new}`);
        cy.contains(`Choose a payment method to pay ${name_new}`);
        cy.visit(`/${testCoindropName_uk3ld1_initial}`, { failOnStatusCode: false });
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1001); // to exceed static regeneration `revalidate: 1` threshold
        cy.reload();
        cy.contains('404 - Page Not Found');
    });
});

export {};
