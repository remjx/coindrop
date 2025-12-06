describe('Landing page', () => {
  before(() => {
    cy.logout();
  });

  const testID_jwylti = "jwylti";
  const testCoindropName_jwylti = `test-coindrop-tid-${testID_jwylti}`;
  it('Displays auth modal when user clicks Log In / Sign up button', () => {
    cy.callFirestore("delete", `piggybanks/${testCoindropName_jwylti}`);
    cy.visit('/');
    cy.get('#log-in-button').click();
    cy.contains("Sign in to continue");
    cy.contains("Sign in with Google");
    cy.contains("Sign in with Facebook");
    cy.contains("Sign in with email");
  });
});

export {};
