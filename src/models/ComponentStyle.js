import parse from '../vendor/postcss-safe-parser/parse'
import postcssNested from '../vendor/postcss-nested'
import insertCss from 'insert-css'

import autoprefix from '../utils/autoprefix'
import flatten from '../utils/flatten'
import hashStr from '../utils/hash';

export default (nameGenerator) => {
  const inserted = {}

  class ComponentStyle {
    constructor (rules) {
      this.rules = rules
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
      const hash = hashStr(flatCSS)
      if (!inserted[hash]) {
        const selector = nameGenerator(hash)
        inserted[hash] = selector
        const root = parse(`.${selector} { ${flatCSS} }`)
        postcssNested(root)
        autoprefix(root)
        insertCss(root.toResult().css)
      }
      return inserted[hash]
    }
  }

  return ComponentStyle
}
