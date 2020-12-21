describe('Upload Coindrop avatar', () => {
    before(() => {
      cy.logout();
      cy.login();
    });

    const testID_rgpyfo = "rgpyfo";
    const testCoindropName = `cy-${testID_rgpyfo}`;
    it('Upload Coindrop avatar', () => {
        cy.intercept({
            method: 'POST',
            url: '/api/createPiggybank',
        }).as('createPiggybank');
        cy.callFirestore("delete", `piggybanks/${testCoindropName}`);
        cy.callFirestore("set", `piggybanks/${testCoindropName}`, {
            owner_uid: Cypress.env("TEST_UID"),
        });
        cy.visit(`/${testCoindropName}`);
        cy.contains('This Coindrop has not been set up yet');
        cy.get('#configure-coindrop-button')
            .click();
        cy.get('[data-cy="avatar-placeholder"]');
        cy.get('[data-cy="coindrop-avatar"]').should('not.exist');
        cy.contains('Upload image');
        cy.get('[data-cy="file-input"]')
            .attachFile('test-avatar.png');
        cy.get('[data-cy="coindrop-avatar"]', { timeout: 10000 });
        cy.get('[data-cy="avatar-placeholder"]').should('not.exist');
        cy.contains('Upload new image');
        cy.get('[data-cy="remove-image-btn"]')
            .click();
        cy.get('[data-cy="avatar-placeholder"]');
        cy.get('[data-cy="coindrop-avatar"]').should('not.exist');
    });
});

export {};
