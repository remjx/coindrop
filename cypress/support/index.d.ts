// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      login(uid?: string): Chainable<Element>
      logout(): Chainable<Element>
      callFirestore(
          action: "set" | "push" | "update" | "delete",
          actionPath: string,
          dataOrOptions?: string | Record<string, unknown>,
          options?: {
              withMeta?: boolean
              merge?: boolean
              batchSize?: number
              where?: [string, string, string | number]
              orderBy?: string | string[]
              limit?: number
              limitToLast?: number
              statics?: any
          }
      ): Chainable<Element>
    }
}
