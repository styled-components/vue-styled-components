describe('DOM attributes', () => {
  it('adds known attributes to elements directly via the template', () => {
    cy.getByTestId('toggle-btn')
      .should('have.attr', 'aria-label', 'Toggle the theme')
      .getByTestId('toggle-btn')
      .should('have.attr', 'tabindex', '0')
      .getByTestId('toggle-btn')
      .should('have.attr', 'role', 'button')
  })

  it('adds known attributes to elements via .attrs', () => {
    cy.getByTestId('readonly-input')
      .should('have.attr', 'readonly')
      .get('#card-content-id')
      .should('exist')
      .getByTestId('header')
      .should('have.attr', 'aria-level', 3)
      .should('have.attr', 'role', 'heading')
  })

  it('gives preference to the outermost declaration of a given attribute', () => {
    cy.getByTestId('card-container-id_from_template').should(
      'have.attr',
      'id',
      'card-id'
    )
  })

  it('passes props down to base styled components through extended components ', () => {
    cy.getByTestId('custom-btn').should('have.css', 'opacity', '1')
  })

  it('has reactive attributes', () => {
    cy.getByTestId('test-btn')
      .should('have.attr', 'id', 100)
      .click()
      .should('have.attr', 'id', 101)
      .click()
      .should('have.attr', 'id', 100)
  })
})
