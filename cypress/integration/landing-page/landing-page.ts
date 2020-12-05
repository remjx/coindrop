describe('Landing page', () => {
  before(() => {
    cy.logout();
  });

  const testID_jwylti = "jwylti";
  const testCoindropName_jwylti = `test-coindrop-tid-${testID_jwylti}`;
  it('Displays auth modal when user clicks Log In button', () => {
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

  const testID_lr9rzm = "lr9rzm";
  const testCoindropName_lr9rzm = `test-coindrop-tid-${testID_lr9rzm}`;
  // TODO: Fix this test, it is flaky
  it(`Creates Coindrop if Create button is pressed and user logs in (Test ID: ${testID_lr9rzm})`, () => {
    console.log('process.env', process.env);
    // TODO:
      // the created coindrop name should include a hash of the branch name
      // // as cleanup, run an afterAll that deletes them
    cy.intercept({
      method: 'POST',
      url: '/api/createPiggybank',
    }).as('createPiggybank');
    cy.intercept({
      method: 'POST',
      url: /^https:\/\/firestore.googleapis.com\/.*/,
    }).as('getUserOwnedPiggybanks');
    cy.callFirestore("delete", `piggybanks/${testCoindropName_lr9rzm}`);
    cy.visit('/');
    cy.get("#create-coindrop-input")
      .type(testCoindropName_lr9rzm);
    cy.get("#create-coindrop-form").submit();
    cy.login();
    cy.url().should('eq', `${Cypress.config().baseUrl}/dashboard`);
    cy.wait("@createPiggybank");
    cy.wait("@getUserOwnedPiggybanks");
    cy.contains(testCoindropName_lr9rzm); // TODO: increase timeout?
  });
});

export {};
