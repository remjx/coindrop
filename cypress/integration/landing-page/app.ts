describe('App', () => {
    before(() => {
      cy.logout();
      cy.login();
    });

    const testID_dbk8fi = "dbk8fi";
    const testCoindropName_dbk8fi = `test-coindrop-tid-${testID_dbk8fi}`;
    it('Allows creation of new Coindrop', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/createPiggybank',
        }).as('createPiggybank');
        cy.intercept({
          url: /^https:\/\/firestore.googleapis.com\/.*/,
        }).as('getUserOwnedPiggybanks');
        cy.callFirestore("delete", `piggybanks/${testCoindropName_dbk8fi}`);
        cy.visit('/dashboard');
        cy.wait('@getUserOwnedPiggybanks');
        cy.get('#create-new-coindrop-button')
            .click();
        cy.get('#create-coindrop-input')
            .type(testCoindropName_dbk8fi);
        cy.get('#create-coindrop-form')
            .submit();
        cy.wait('@createPiggybank');
        cy.contains(`coindrop.to/${testCoindropName_dbk8fi}`);
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
        cy.contains('This Coindrop has not been set up yet.');
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
        cy.get('#piggybank-id-not-allowed');
        cy.get('button#save-configuration-btn').should('be.disabled');
        cy.get("input#input-piggybankId")
            .clear()
            .type(testCoindropName_uk3ld1_new);
        cy.get('#piggybank-id-ok');
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
        cy.contains('404 - Page Not Found');
    });
});

export {};
