describe('Search movie', () => {
  beforeEach(() => {
    cy.viewport(1440, 900)
  })

  it('Search for a movie and navigate to the first result', () => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'popularData.json' })
    cy.intercept('GET', '**/genre/movie/list*', { fixture: 'genresData.json' })
    cy.intercept('GET', '**/search/movie**&query=Mad+Max', { fixture: 'searchMovie.json' })
    cy.intercept('GET', '**/movie/76341*', { fixture: 'movieData.json' })
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
          cy.get('[data-cy="search-input"]').type('Mad Max');
          cy.get('[data-cy="search-btn"]').click()
        });
    cy.get('[data-cy="home-title"]').should('include.text', `Results for Mad Max`)
    cy.get('[data-cy="home-movies"]').children().should('have.length', 20)
    cy.get('[data-cy="home-movies"]')
        .children()
        .eq(2)
        .within(() => {
          cy.get('[data-cy="go-to-movie"]').click()
        })
    cy.get('[data-cy="movie-title"]').should('include.text', `Mad Max: Fury Road`)
  })
})