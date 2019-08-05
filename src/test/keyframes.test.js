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

    const Comp = styled.div`
      animation: ${rotate} 2s linear infinite;
    `

    const vm = new Vue(Comp).$mount()

    expectCSSMatches(
      '@keyframes iVXCSc { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .a {-webkit-animation:iVXCSc 2s linear infinite;animation:iVXCSc 2s linear infinite;}'
    )
  })
})
