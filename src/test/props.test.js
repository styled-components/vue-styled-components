import Vue from 'vue'

import { resetStyled, expectCSSMatches } from './utils'
import ThemeProvider from "../providers/ThemeProvider"

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
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {color: black;}')
  })

  it('should execute interpolations and inject props', () => {
    const compProps = { fg: String }
    const Comp = styled('div', compProps)`
      color: ${props => props.fg || 'black'};
    `
    const Ctor = Vue.extend(Comp)
    const vm = new Ctor({
      propsData: {
        fg: 'red'
      }
    }).$mount()
    expectCSSMatches('.a {color: red;}')
  })

  it('should add any injected theme to the component', () => {
    const theme = {
      blue: "blue",
    }

    const Comp = styled.div`
      color: ${props => props.theme.blue};
    `
    const Themed = {
      render: function(createElement) {
        return createElement(
          ThemeProvider,
          {
            props: {
              theme,
            },
          },
          [
            createElement(Comp)
          ]
        )
      }
    }

    const vm = new Vue(Themed).$mount()
    expectCSSMatches('.a {color: blue;}')
  })
})
