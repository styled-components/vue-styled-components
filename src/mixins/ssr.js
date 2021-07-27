import collectRules from '../constructors/collectRules'

export default {
  head () {
    if (typeof window === 'undefined') {
      const css = collectRules().map(rule => rule.cssText).join('')
      return {
        style: [{ hide: 'ssrStyles', innerHTML: css, type: 'text/css' }],
        __dangerouslyDisableSanitizers: ['style']
      }
    }
    return {}
  }
}
