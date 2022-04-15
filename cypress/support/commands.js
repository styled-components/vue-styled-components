/**
 * Select a `data-testid` element by its exact key
 */
Cypress.Commands.add('getByTestId', selector => {
  return cy.get(`[data-testid=${selector}]`)
})

/**
 * Select a `data-testid` element by its approximate key
 */
Cypress.Commands.add('getByTestIdLike', selector => {
  return cy.get(`[data-testid*=${selector}]`)
})

/**
 * Assert element contains a given class
 */
Cypress.Commands.add('containsClass', (selector, expectedClass) => {
  return cy.get(selector).should('satisfy', $el => {
    const classList = Array.from($el[0].classList)

    return classList.includes(expectedClass)
  })
})

/**
 * Assert element does not contain a given class
 */
Cypress.Commands.add('omitsClass', (selector, expectedClass) => {
  return cy.get(selector).should('satisfy', $el => {
    const classList = Array.from($el[0].classList)

    return !classList.includes(expectedClass)
  })
})
