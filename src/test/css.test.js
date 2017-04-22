import Vue from 'vue';

import { resetStyled, expectCSSMatches } from './utils'

let styled
const stripLineBreaks = (str) => str.split('\n').map(l => l.trim()).join('')

describe('css features', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should add vendor prefixes in the right order', () => {
    const Comp = styled.div`
      transition: opacity 0.3s;
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {-webkit-transition: opacity 0.3s;transition: opacity 0.3s;}')
  })

  it('should add vendor prefixes for display', () => {
    const Comp = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches(stripLineBreaks(`
      .a {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
    `))
  })

  it('should handle CSS calc()', () => {
    const Comp = styled.div`
      margin-bottom: calc(15px - 0.5rem) !important;
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {margin-bottom: calc(15px - 0.5rem) !important;}')
  })

  it('should pass through custom properties', () => {
    const Comp = styled.div`
      --custom-prop: some-val;
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {--custom-prop: some-val;}')
  })
})
