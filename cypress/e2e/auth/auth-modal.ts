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
    cy.get("#chakra-modal-auth-modal")
      .contains("Sign in to continue");
    cy.get("#firebaseui_container")
      .contains("Sign in with Google");
    cy.get("#firebaseui_container")
    .contains("Sign in with Facebook");
  });
});

export {};
