describe('Delete Coindrop', () => {
    before(() => {
      cy.logout();
      cy.login();
    });

    const testID_hljkx3 = "hljkx3";
    const testCoindropName = `cy-${testID_hljkx3}`;
    it('Delete Coindrop', () => {
        cy.callFirestore("delete", `piggybanks/${testCoindropName}`);
        cy.callFirestore("set", `piggybanks/${testCoindropName}`, {
            owner_uid: Cypress.env("TEST_UID"),
        });
        cy.visit(`/${testCoindropName}`);
        cy.contains('This Coindrop has not been set up yet');
        cy.get('#configure-coindrop-button')
            .click();
        cy.get('button#delete-coindrop-button')
            .contains('Delete')
            .click();
        cy.get('button#delete-coindrop-button')
            .contains('Confirm')
            .click();
        cy.contains('My Coindrops', { timeout: 15000 });
        cy.url().should('eq', `${Cypress.config().baseUrl}/dashboard`);
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1001); // to exceed static regeneration `revalidate: 1` threshold
        cy.visit(`/${testCoindropName}`, { failOnStatusCode: false });
        cy.contains('404 - Page Not Found');
    });
});

export {};
