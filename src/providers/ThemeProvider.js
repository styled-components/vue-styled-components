import { h, computed } from 'vue'
import { themeKey } from './themeKey'

export default {
  name: 'ThemeProvider',
  props: {
    theme: Object
  },
  provide() {
    return {
      [themeKey]: computed(() => this.theme)
    }
  },

  render() {
    return h('div', {}, this.$slots.default())
  }
}
