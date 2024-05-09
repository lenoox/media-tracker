describe('Search movie', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
  })

  it('Search for a movie and navigate to the first result', () => {
    cy.clearLocalStorage('token')
    cy.clearLocalStorage('theme')
    cy.visit('/')
    cy.get('[data-cy="login"]').type("demo")
    cy.get('[data-cy="password"]').type("demo")
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="home-title"]').should('include.text', `Popular Productions`)
    cy.get('[data-cy="search-container"]')
        .should('have.class', 'lg:block')
        .within(() => {
          cy.get('[data-cy="search-input"]').type('Avengers');
          cy.get('[data-cy="search-btn"]').click()
        });
    cy.get('[data-cy="home-title"]').should('include.text', `Results for Avengers`)
    cy.get('[data-cy="home-movies"]').children().should('have.length', 20)
    cy.get('[data-cy="home-movies"]').first().within(() => {
      cy.get('[data-cy="go-to-movie"]').first().click();
    });
  })
})