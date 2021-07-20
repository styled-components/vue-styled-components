/* Wraps glamor's stylesheet and exports a singleton for styled components
to use. */
import { StyleSheet as GlamorSheet } from '../vendor/glamor/sheet'

class StyleSheet {
  constructor () {
    /* Don't specify a maxLength for the global sheet, since these rules
     * are defined at initialization and should remain static after that */
    this.globalStyleSheet = new GlamorSheet({ speedy: false })
    this.componentStyleSheet = new GlamorSheet({ speedy: false, maxLength: 40 })

    /* if the library user sets this to true in their index.vue, we assume they are handling
     * the CSS injection themselves, we don't want to double inject. */
    this.serverRendered = false
  }
  get injected () {
    return this.globalStyleSheet.injected && this.componentStyleSheet.injected
  }
  inject () {
    if (!this.serverRendered) {
      this.globalStyleSheet.inject()
      this.componentStyleSheet.inject()
    }
  }
  flush () {
    if (this.globalStyleSheet.sheet) this.globalStyleSheet.flush()
    if (this.componentStyleSheet.sheet) this.componentStyleSheet.flush()
  }
  insert (rule, opts = { global: false }) {
    const sheet = opts.global ? this.globalStyleSheet : this.componentStyleSheet
    return sheet.insert(rule)
  }
  rules () {
    return this.globalStyleSheet.rules().concat(this.componentStyleSheet.rules())
  }
  serverRender () {
    this.serverRendered = true
    return this.rules().filter(function (rule) {
      return rule.cssText.length > 0
    })
  }
}

/* Export stylesheet as a singleton class */
export default new StyleSheet()
