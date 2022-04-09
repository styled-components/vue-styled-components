describe('polymorhphic `as` prop', () => {
  it('renders as the element specified via `as`', () => {
    cy.getByTestId('custom-btn')
      .should('have.prop', 'tagName')
      .should('eq', 'DIV')

      .getByTestId('custom-btn-ctrl')
      .clear()
      .type('button{enter}')
      .getByTestId('custom-btn')
      .should('have.prop', 'tagName')
      .should('eq', 'BUTTON')

      .getByTestId('custom-btn-ctrl')
      .clear()
      .type('span{enter}')
      .getByTestId('custom-btn')
      .should('have.prop', 'tagName')
      .should('eq', 'SPAN')

      .getByTestId('custom-btn-ctrl')
      .clear()
      .type('table{enter}')
      .getByTestId('custom-btn')
      .should('have.prop', 'tagName')
      .should('eq', 'TABLE')

      // should not display `as` as a DOM prop
      .getByTestId('custom-btn')
      .should('not.have.attr', 'as')
  })
})
