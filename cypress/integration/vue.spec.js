describe('expected vue functionality that should remain unaffected', () => {
  it('renders slots', () => {
    const testids = ['header', 'card-content-id', 'footer']

    cy.getByTestId('card-container-id_from_template')
      .children()
      .each(($el, idx) => {
        cy.wrap($el).should('have.attr', 'data-testid', testids[idx])
      })

      .getByTestId('test-slot')
      .within(() => {
        cy.getByTestId('footer-2')
          .should('not.exist')
          .getByTestId('header-2')
          .should('exist')
          .contains('test text')
      })
  })

  it('maintains input state as expected', () => {
    const assertMatch = text => {
      cy.getByTestId('test-input')
        .should('have.value', text)
        .getByTestId('test-input-display')
        .should($el => {
          expect($el.text()).equal(text)
        })
    }

    assertMatch('Hello World, this is my first styled component!')

    cy.getByTestId('test-input').clear()
    assertMatch('')

    cy.getByTestId('test-input').type('X')
    assertMatch('X')
    cy.getByTestId('test-input').type('x')
    assertMatch('Xx')
    cy.getByTestId('test-input').type('X')
    assertMatch('XxX')
  })
})
