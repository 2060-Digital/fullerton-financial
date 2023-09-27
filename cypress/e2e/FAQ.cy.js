/// <reference types="cypress" />

describe("FAQ Accordion Section", () => {
  beforeEach(() => {
    cy.visit("iframe.html?viewMode=story&id=storyblok-faq-section--default")
    cy.log("FAQ componenet mounted")
  })
  it("Should open when button is clicked", () => {
    cy.get(".faq-section").within(() => {
      cy.get(".faq-section-btn").click({ multiple: true })
      cy.get(".faq-section-content").should("be.visible")
    })
  })
  it("Should close when button is clicked then clicked again", () => {
    cy.get(".faq-section").within(() => {
      cy.get(".faq-section-btn").click({ multiple: true })
      cy.get(".faq-section-btn").click({ multiple: true })
      cy.get(".faq-section-content").should("not.be.visible")
    })
  })
})
