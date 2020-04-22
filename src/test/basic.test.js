import Vue from 'vue';
import expect from 'expect'

import styleSheet from '../models/StyleSheet'
import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('basic', () => {
  /**
   * Make sure the setup is the same for every test
   */
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should not throw an error when called', () => {
    styled.div``
  })

  it('should inject a stylesheet when a component is created', () => {
    const Comp = styled.div``
    const vm = new Vue(Comp).$mount()
    expect(styleSheet.injected).toBe(true)
  })

  it('should not generate any styles by default', () => {
    styled.div``
    expectCSSMatches('')
  })

  it('should throw an error when called', () => {
    expect(() => styled``).toThrow()
    expect(() => styled.notExistTag``).toThrow()
  })

  it('should allow for inheriting components that are not styled', () => {
    const componentConfig = { name: 'Parent', template: '<div><slot/></div>', methods: {} }
    expect(() => styled(componentConfig, {})``).not.toThrow()
  })

  // it('should generate an empty tag once rendered', () => {
  //   const Comp = styled.div``
  //   const vm = new Vue(Comp).$mount()
  //   expectCSSMatches('.a {  }')
  // })

  // /* TODO: we should probably pretty-format the output so this test might have to change */
  // it('should pass through all whitespace', () => {
  //   const Comp = styled.div`   \n   `
  //   const vm = new Vue(Comp).$mount()
  //   expectCSSMatches('.a {    \n    }', { ignoreWhitespace: false })
  // })

  // it('should inject only once for a styled component, no matter how often it\'s mounted', () => {
  //   const Comp = styled.div``
  //   const vm = new Vue(Comp).$mount()
  //   expectCSSMatches('.a {  }')
  // })

  // describe('innerRef', () => {
  //   jsdom()

  //   it('should handle styled-components correctly', () => {
  //     const Comp = styled.div`
  //       ${props => expect(props.innerRef).toExist()}
  //     `
  //     const WrapperComp = Vue.extend({
  //       template: '<Comp innerRef={(comp) => { this.testRef = comp }} />'
  //     })

  //     const wrapper = new Vue(WrapperComp).$mount();
  //     expect(wrapper.$el.testRef).toExist()
  //     expect(wrapper.$el.ref).toNotExist()
  //   })

  //   it('should handle inherited components correctly', () => {
  //     const StyledComp = styled.div``

  //     const WrappedStyledComp = Vue.extend({
  //       template: '<StyledComp {...this.$props} />'
  //     })

  //     const ChildComp = styled(WrappedStyledComp)``
  //     const WrapperComp = Vue.extend({
  //       template: '<ChildComp innerRef={(comp) => { this.testRef = comp }} />'
  //     })

  //     const wrapper = new Vue(WrapperComp).$mount();

  //     expect(wrapper.node.testRef).toExist()
  //     expect(wrapper.node.ref).toNotExist()
  //   })
  // })
})
