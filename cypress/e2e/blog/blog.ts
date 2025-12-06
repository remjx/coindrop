describe('Blog', () => {
    it('Blog', () => {
        cy.visit('/blog/page/1');
        cy.contains('Latest Posts');
        cy.contains('Read more').click();
        cy.url().should('not.contain', '/page/');
    });
});

export {};
