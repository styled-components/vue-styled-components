import parse from '../vendor/postcss-safe-parser/parse'
import postcssNested from '../vendor/postcss-nested'

import autoprefix from '../utils/autoprefix'
import flatten from '../utils/flatten'

import styleSheet from './StyleSheet'

export default class ComponentStyle {

  constructor (rules, selector) {
    this.rules = rules
    this.selector = selector
  }

  generateAndInject () {
    if (!styleSheet.injected) styleSheet.inject()
    let flatCSS = flatten(this.rules).join('')
    if (this.selector) {
      flatCSS = `${this.selector} {${flatCSS}\n}`
    }
    const root = parse(flatCSS)
    postcssNested(root)
    autoprefix(root)
    styleSheet.insert(root.toResult().css, { global: true })
  }
}
