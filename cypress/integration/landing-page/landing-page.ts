describe('Landing page', () => {
    it('Contains logo', () => {
      cy.visit('/');
      cy.contains('coindrop');
    });

    it.only('Allows creation of new coindrop', () => {
        cy.visit('/');
        cy.get("#create-coindrop-input")
          .type("test-coindrop")
        cy.get("#create-coindrop-form").submit();
        cy.contains("Sign in to continue");
    });
  });

export {};
