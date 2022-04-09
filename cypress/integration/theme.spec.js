describe('theme functionality', () => {
  it('renders elements with the given theme properties', () => {
    cy.getByTestId('wrapper-1')
      // @see https://github.com/cypress-io/cypress/issues/2186
      .should('have.css', 'background-color', 'rgb(215, 242, 255)')

      .getByTestId('wrapper-2')
      .should('have.css', 'background-color', 'rgb(255, 240, 245)')

      .getByTestId('wrapper-3')
      .should('have.css', 'background-color', 'rgb(198, 247, 230)')

      .getByTestId('footer')
      .should('have.css', 'background-color', 'rgb(215, 242, 255)')
  })

  it('has a reactive theme', () => {
    cy.getByTestId('toggle-btn')
      .click()

      .getByTestId('wrapper-1')
      .should('have.css', 'background-color', 'rgb(109, 70, 42)')

      .getByTestId('wrapper-2')
      .should('have.css', 'background-color', 'rgb(38, 84, 138)')

      .getByTestId('wrapper-3')
      .should('have.css', 'background-color', 'rgb(144, 4, 33)')

      .getByTestId('footer')
      .should('have.css', 'background-color', 'rgb(109, 70, 42)')

      .getByTestId('toggle-btn')
      .click()

      .getByTestId('wrapper-1')
      .should('have.css', 'background-color', 'rgb(215, 242, 255)')

      .getByTestId('wrapper-2')
      .should('have.css', 'background-color', 'rgb(255, 240, 245)')

      .getByTestId('wrapper-3')
      .should('have.css', 'background-color', 'rgb(198, 247, 230)')

      .getByTestId('footer')
      .should('have.css', 'background-color', 'rgb(215, 242, 255)')
  })
})
