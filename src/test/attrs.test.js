import Vue from 'vue'
import expect from 'expect'

import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('"attrs" feature', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should add html attributes to an element', () => {
    const Component = styled('img', {}).attrs({ src: 'image.jpg' })`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expect(vm._vnode.data.domProps).toEqual({ src: 'image.jpg' })
  })

  it('should add several html attributes to an element', () => {
    const Component = styled('img', {}).attrs({ src: 'image.jpg', alt: 'Test image' })`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expect(vm._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'Test image' })
  })

  it('should work as expected with empty attributes object provided', () => {
    const Component = styled('img', {}).attrs({})`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expectCSSMatches('.a {width: 50;}')
  })

  it('should work as expected with null attributes object provided', () => {
    const Component = styled('img', {}).attrs(null)`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expectCSSMatches('.a {width: 50;}')
    expect(vm._vnode.data.domProps).toEqual({})
  })

  it('should work as expected without attributes provided', () => {
    const Component = styled('img')`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expectCSSMatches('.a {width: 50;}')
    expect(vm._vnode.data.domProps).toEqual({})
  })

  it('should work with a function as a parameter of of the method', () => {
    const Component = styled('img', {}).attrs(() => ({
      src: 'image.jpg',
      alt: 'Test image',
      height: '50'
    }))`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expect(vm._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'Test image', height: '50' })
  })

  it('should work with multiple attrs method call', () => {
    const Component = styled('img', {})
      .attrs(() => ({
        src: 'image.jpg',
        alt: 'Test image'
      }))
      .attrs({
        height: '50'
      })`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expect(vm._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'Test image', height: '50' })
  })

  it('should access to all previous attribute properties', () => {
    const Component = styled('img', {})
      .attrs(() => ({
        src: 'image',
        alt: 'My test image'
      }))
      .attrs((props) => ({
        src: props.src + '.jpg',
        height: 5 * 10
      }))`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expect(vm._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'My test image', height: 50 })
  })

  it('should override attribute properties', () => {
    const Component = styled('img', {})
      .attrs(() => ({
        src: 'image.jpg',
        alt: 'Test image',
        height: '20'
      }))
      .attrs({
        height: '50'
      })`
      width: 50;
    `
    const vm = new Vue(Component).$mount()
    expect(vm._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'Test image', height: '50' })
  })

  it('should access to component props', () => {
    const Component = styled('img', { propsHeight: Number })
      .attrs((props) => ({
        src: 'image.jpg',
        alt: 'Test image',
        height: props.propsHeight * 2
      }))`
      width: 50;
    `

    const vm = new Vue({
      render: function (h) {
        return h(Component, {
          props: {
            propsHeight: 20
          },
        })
      }
    }).$mount()

    expect(vm.$children[0]._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'Test image', height: 40 })
  })

  it('attributes should be reactive', () => {
    const Component = styled('img', { propsHeight: Number })
      .attrs((props) => ({
        src: 'image.jpg',
        alt: 'Test image',
        height: props.propsHeight * 2
      }))`
      width: 50;
    `

    const vm = new Vue({
      render: function (h) {
        const self = this
        return h(Component, {
          props: {
            propsHeight: self.dataHeight
          },
        })
      },
      data: () => ({
        dataHeight: 20
      })
    }).$mount()

    expect(vm.$children[0]._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'Test image', height: 40 })

    vm.dataHeight = 90
    setTimeout(() => { // $nextTick
      expect(vm.$children[0]._vnode.data.domProps).toEqual({ src: 'image.jpg', alt: 'Test image', height: 180 })
    }, 0)
  })
})
