
describe('Login', () => {
  it('User login and goes to the home screen', () => {
    cy.intercept('GET', '**/movie/popular*', { fixture: 'popularData.json' })
    cy.intercept('GET', '**/genre/movie/list*', { fixture: 'genresData.json' })
    cy.clearLocalStorage('token')
    cy.clearLocalStorage('theme')
    cy.visit('/')
    cy.get('[data-cy="login"]').type("demo")
    cy.get('[data-cy="password"]').type("demo")
    cy.get('[data-cy="login-submit"]').click()
    cy.get('[data-cy="home-title"]').should('include.text', `Popular Productions`)

    cy.get('[data-cy="home-movies"]').children().should('have.length', 20)
  })
})