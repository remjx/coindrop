describe("Some Test", () => {
    it("Adds document to test_hello_world collection of Firestore", () => {
      // TODO: turn into .ts file and follow instructions in cypress docs to add custom commands to TS.
      cy.callFirestore("add", "test_hello_world", { some: "value" });
    });
});

export {};
