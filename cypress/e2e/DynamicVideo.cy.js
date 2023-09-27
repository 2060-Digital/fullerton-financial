/// <reference types="cypress" />

describe("Dynamic Video", () => {
  beforeEach(() => {
    cy.log("Dynamic Video componenet mounted")
  })
  it("Should play when play button is clicked", () => {
    cy.visit("iframe.html?viewMode=story&id=storyblok-dynamic-video--youtube-video")
    cy.get(".play-video").click()
    cy.get(".youtube-iframe").should("be.visible")
    cy.visit("iframe.html?viewMode=story&id=storyblok-dynamic-video--video-embed")
    cy.get(".play-video").click()
    cy.get(".video-embed").its("0.paused").should("equal", false)
  })
})
