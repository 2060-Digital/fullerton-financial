/// <reference types="cypress" />

describe("Pagination", () => {
  beforeEach(() => {
    cy.log("Pagination componenet mounted")
  })
  it("Should open the next page when right arrow is clicked", () => {
    cy.visit("iframe.html?viewMode=story&id=internal-pagination--less-than-five")
    cy.get(".next-page").click()
    cy.get("#storybook").should("have.text", "Currently on page: 2")
  })
  it("Should open the previos page when left arrow is clicked", () => {
    cy.visit("iframe.html?viewMode=story&id=internal-pagination--less-than-five")
    cy.get(".next-page").click().click().click()
    cy.get(".prev-page").click()
    cy.get("#storybook").should("have.text", "Currently on page: 3")
  })
  it("Should open a given page when that number is clicked", () => {
    cy.visit("iframe.html?viewMode=story&id=internal-pagination--ten-plus")
    cy.get(".page-12").click()
    cy.get("#storybook").should("have.text", "Currently on page: 12")
    cy.get(".page-9").click()
    cy.get("#storybook").should("have.text", "Currently on page: 9")
    cy.get(".page-1").click()
    cy.get("#storybook").should("have.text", "Currently on page: 1")
  })
  it("Should scroll to top when opening a new page", () => {
    cy.visit("iframe.html?viewMode=story&id=internal-pagination--with-content")
    cy.get(".page-12").click()
    cy.get("#storybook")
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its("scrollY").should("equal", offset))
    cy.get(".page-9").click()
    cy.get("#storybook")
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its("scrollY").should("equal", offset))
    cy.get(".page-1").click()
    cy.get("#storybook")
      .then((element) => element[0].offsetTop)
      .then((offset) => cy.window().its("scrollY").should("equal", offset))
  })
})
