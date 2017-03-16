import parse from '../vendor/postcss-safe-parser/parse'
import postcssNested from '../vendor/postcss-nested'
import insertCss from 'insert-css'

import autoprefix from '../utils/autoprefix'
import flatten from '../utils/flatten'

export default () => {
  class ComponentStyle {
    constructor (rules, selector) {
      this.rules = rules
      this.selector = selector
    }

    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a ._hashName {}
     * Parses that with PostCSS then runs PostCSS-Nested on it
     * Returns the hash to be injected on render()
     * */
    generateAndInjectStyles (executionContext) {
      const flatCSS = flatten(this.rules, executionContext).join('')
        .replace(/^\s*\/\/.*$/gm, '') // replace JS comments
      const root = parse(`.${this.selector} { ${flatCSS} }`)
      postcssNested(root)
      autoprefix(root)
      insertCss(root.toResult().css)
      return this.selector
    }
  }

  return ComponentStyle
}
