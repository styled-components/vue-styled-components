import Vue from 'vue'

import { resetStyled, expectCSSMatches } from './utils'

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
})
