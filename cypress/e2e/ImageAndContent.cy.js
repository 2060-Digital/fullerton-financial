/// <reference types="cypress" />

describe("Image and Content Section", () => {
  beforeEach(() => {
    cy.log("ImageAndContent component mounted")
  })
  it("Should display image first when orientation is image_first", () => {
    cy.visit("iframe.html?viewMode=story&id=storyblok-image-and-content--image-on-left")
    cy.get(".image-content-container").should("not.have.class", "md:flex-row-reverse")
    cy.get(".image-content-container").should("have.class", "md:flex-row")
  })
  it("Should display content first when orientation is content_first", () => {
    cy.visit("iframe.html?viewMode=story&id=storyblok-image-and-content--content-on-left")
    cy.get(".image-content-container").should("have.class", "md:flex-row-reverse")
    cy.get(".image-content-container").should("not.have.class", "md:flex-row")
  })
})
