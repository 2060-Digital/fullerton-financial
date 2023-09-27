/// <reference types="cypress" />

describe("Modal", () => {
  beforeEach(() => {
    cy.visit("iframe.html?viewMode=story&id=internal-modal--default")
    cy.log("Modal componenet mounted")
  })
  it("Should close when x is clicked", () => {
    cy.wait(200)
    cy.get(".close-modal-btn").click()
    cy.get(".modal").should("not.exist")
  })
  it("Should open when open modal button is clicked", () => {
    cy.wait(200)
    cy.get(".close-modal-btn").click()
    cy.get("#open-storybook-modal").click()
    cy.get(".modal").should("be.visible")
  })
})
