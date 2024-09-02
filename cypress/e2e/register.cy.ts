import { faker } from '@faker-js/faker';

describe('authentication', () => {
  it('passes', () => {
    cy.visit('http://localhost')

    cy.get('a.ms-4').as("registerButton")
    cy.get("@registerButton").click()

    const name = faker.person.fullName()
    const email = faker.internet.email().toLowerCase()
    const password = "test12345!"

    cy.get('#name').type(name)
    cy.get("#email").type(email)
    cy.get("#password").type(password)
    cy.get("#password_confirmation").type(password)

    cy.get('.inline-flex').as("submit")
    cy.get("@submit").click()
  })
})
