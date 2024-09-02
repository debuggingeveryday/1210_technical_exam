import { faker } from '@faker-js/faker';

describe('authentication', () => {
  it('passes', () => {
    cy.visit('http://localhost')

    cy.get('#email').as("emailInput")
    cy.get('#password').as("passwordInput")
    cy.get('.inline-flex').as("loginButton")

    cy.get("@emailInput").type("admin@system.com")
    cy.get("@passwordInput").type("admin12345")
    cy.get("@loginButton").click()
  })
})
