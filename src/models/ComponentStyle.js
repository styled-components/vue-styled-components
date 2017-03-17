import hashStr from '../vendor/glamor/lib/hash'
import parse from '../vendor/postcss-safe-parser/parse'
import postcssNested from '../vendor/postcss-nested'

import autoprefix from '../utils/autoprefix'
import flatten from '../utils/flatten'

import styleSheet from './StyleSheet'

// import hashStr from '../vendor/glamor/uti'

export default (nameGenerator) => {
  const inserted = {}

  class ComponentStyle {
    constructor (rules) {
      this.rules = rules
      if (!styleSheet.injected) styleSheet.inject()
      this.insertedRule = styleSheet.insert('')
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
        this.insertedRule.appendRule(root.toResult().css)
      }
      return inserted[hash]
    }
  }

  return ComponentStyle
}
