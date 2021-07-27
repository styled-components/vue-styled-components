import styleSheet from '../StyleSheet'
import { resetStyled } from '../../test/utils'
import expect from 'expect'
import sinon from 'sinon'

describe('stylesheet', () => {
  beforeEach(() => {
    resetStyled()
  })

  describe('inject', () => {
    beforeEach(() => {
      styleSheet.serverRendered = false
      styleSheet.inject()
    })
    it('should inject the global sheet', () => {
      expect(styleSheet.globalStyleSheet.injected).toBe(true)
    })
    it('should inject the component sheet', () => {
      expect(styleSheet.componentStyleSheet.injected).toBe(true)
    })
    it('should specify that the sheets have been injected', () => {
      expect(styleSheet.injected).toBe(true)
    })
  })

  describe('server-side inject', () => {
    beforeEach(() => {
      styleSheet.serverRendered = true
    })
    afterEach(() => {
      styleSheet.serverRendered = false
    })
    it('does not call injects if serverRendered is true', () => {
      const globalInject = sinon.spy()
      const componentInject = sinon.spy()
      styleSheet.inject()
      expect(globalInject.called).toBe(false)
      expect(componentInject.called).toBe(false)
    })
  })

  describe('serverRender', () => {
    beforeEach(() => {
      styleSheet.serverRendered = false
    })
    afterEach(() => {
      styleSheet.serverRendered = false
    })
    it('sets serverRendered to true when called', () => {
      styleSheet.serverRender()
      expect(styleSheet.serverRendered).toBe(true)
    })
    it('returns non empty rules', () => {
      expect(styleSheet.serverRender()).toStrictEqual(styleSheet.rules().filter(function (rule) {
        return rule.cssText.length > 0
      }))
    })
  })

  describe('flush', () => {
    beforeEach(() => {
      styleSheet.flush()
    })
    it('should flush the global sheet', () => {
      expect(styleSheet.globalStyleSheet.injected).toBe(false)
    })
    it('should flush the component sheet', () => {
      expect(styleSheet.componentStyleSheet.injected).toBe(false)
    })
    it('should specify that the sheets are no longer injected', () => {
      expect(styleSheet.injected).toBe(false)
    })
  })

  // it('should return both rules for both sheets', () => {
  //   styleSheet.insert('a { color: green }', { global: true })
  //   styleSheet.insert('.hash1234 { color: blue }')

  //   expect(styleSheet.rules()).toEqual([
  //     { cssText: 'a { color: green }' },
  //     { cssText: '.hash1234 { color: blue }' }
  //   ])
  // })

  describe('insert with the global option', () => {
    beforeEach(() => {
      styleSheet.insert('a { color: green }', { global: true })
    })
    it('should insert into the global sheet', () => {
      expect(styleSheet.globalStyleSheet.rules()).toEqual([
        { cssText: 'a { color: green }' },
      ])
    })
    it('should not inject into the component sheet', () => {
      expect(styleSheet.componentStyleSheet.rules()).toEqual([])
    })
  })

  describe('insert without the global option', () => {
    beforeEach(() => {
      styleSheet.insert('.hash1234 { color: blue }')
    })
    it('should inject into the component sheet', () => {
      expect(styleSheet.componentStyleSheet.rules()).toEqual([
        { cssText: '.hash1234 { color: blue }' },
      ])
    })
    it('should not inject into the global sheet', () => {
      expect(styleSheet.globalStyleSheet.rules()).toEqual([])
    })
  })
})
