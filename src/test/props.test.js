import { createApp, h, inject } from 'vue'
import expect from 'expect'

import { resetStyled, expectCSSMatches } from './utils'
import ThemeProvider from '../providers/ThemeProvider'

let styled

describe('props', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should execute interpolations and fall back', () => {
    const compProps = { fg: String }
    const Comp = styled('div', compProps)`
      color: ${props => props.fg || 'black'};
    `
    const vm = createApp(Comp).mount('body')
    expectCSSMatches('.a {color: black;}')
  })

  it('should execute interpolations and inject props', () => {
    const compProps = { fg: String }
    const Comp = styled('div', compProps)`
      color: ${props => props.fg || 'black'};
    `

    const vm = createApp(Comp, { fg: 'red' }).mount('body')
    expectCSSMatches('.a {color: red;}')
  })

  it('should add any injected theme to the component', () => {
    const theme = {
      blue: 'blue'
    }

    const Comp = styled.div`
      color: ${props => props.theme.blue};
    `
    const Themed = {
      render: function () {
        return h(
          ThemeProvider,
          {
            theme
          },
          [h(Comp)]
        )
      }
    }

    const vm = createApp(Themed).mount('body')
    expectCSSMatches('.a {color: blue;}')
  })
})
