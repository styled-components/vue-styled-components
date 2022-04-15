describe('injected global styles', () => {
  it('renders elements with the given theme properties', () => {
    cy.get('body')
      .should('have.css', 'background-color', 'rgb(254, 254, 254)')
      .should(
        'have.css',
        'font-family',
        '-apple-system, BlinkMacSystemFont, sans-serif'
      )
  })
})
