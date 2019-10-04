import Vue from 'vue'
import keyframes from '../constructors/keyframes'

import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('css features', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should add vendor prefixes in the right order', () => {
    const rotate = keyframes`
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    `

    expectCSSMatches(
      '@keyframes iVXCSc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      { rotate }
    )
  })
})
