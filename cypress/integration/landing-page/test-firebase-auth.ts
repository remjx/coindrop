describe("Firebase auth", () => {
    it("Allows login with test user", () => {
      cy.visit('/');
      cy.login();
    });
});

export {};
