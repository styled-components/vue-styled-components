import parse from 'postcss-safe-parser'
import postcssNested from 'postcss-nested'
import insertCss from 'insert-css'

import autoprefix from '../utils/autoprefix'
import flatten from '../utils/flatten'

export default class ComponentStyle {

  constructor (rules, selector) {
    this.rules = rules
    this.selector = selector
  }

  generateAndInject () {
    let flatCSS = flatten(this.rules).join('')
    if (this.selector) {
      flatCSS = `${this.selector} {${flatCSS}\n}`
    }
    const root = parse(flatCSS)
    postcssNested(root)
    autoprefix(root)
    insertCss(root.toResult().css)
  }
}
