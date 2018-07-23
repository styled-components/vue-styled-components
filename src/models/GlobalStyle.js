
import flatten from '../utils/flatten'
import styleSheet from './StyleSheet'
import stylis from 'stylis'

export default class ComponentStyle {

  constructor (rules, selector) {
    this.rules = rules
    this.selector = selector
  }

  generateAndInject () {
    if (!styleSheet.injected) styleSheet.inject()
    const flatCSS = flatten(this.rules).join('')
    const cssString = this.selector ? `${this.selector} { ${flatCSS} }` : flatCSS
    const css = stylis('', cssString, false, false)
    styleSheet.insert(css, { global: true })
  }
}
