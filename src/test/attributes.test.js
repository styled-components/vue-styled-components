import Vue from 'vue/dist/vue';
import expect from 'expect'

import styleSheet from '../models/StyleSheet'
import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('attributes', () => {
  /**
   * Make sure the setup is the same for every test
   */
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should add html attributes to an element', () => {
    const Comp = styled('img', {}, { src: 'image.jpg' })`
      width: 50px;
    `
    const vm = new Vue(Comp).$mount()
    expect(vm._vnode.data.attrs).toEqual({ src: 'image.jpg' })
  })

  it('should add several html attributes to an element', () => {
    const Comp = styled('img', {}, { src: 'image.jpg', alt: 'Test image' })`
      width: 50px;
    `
    const vm = new Vue(Comp).$mount()
    expect(vm._vnode.data.attrs).toEqual({ src: 'image.jpg', alt: 'Test image' })
  })

  it('should work as expected with empty attributes object provided', () => {
    const Comp = styled('img', {}, {})`
      width: 50px;
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {width: 50px;}')
  })

  it('should work as expected with null attributes object provided', () => {
    const Comp = styled('img', {}, null)`
      width: 50px;
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {width: 50px;}')
    expect(vm._vnode.data.attrs).toEqual({})
  })

  it('should work as expected without attributes provided', () => {
    const Comp = styled('img')`
      width: 50px;
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {width: 50px;}')
    expect(vm._vnode.data.attrs).toEqual({})
  })
})
