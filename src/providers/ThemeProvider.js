export default {
  name: 'ThemeProvider',
  props: {
    theme: Object
  },
  provide () {
    return {
      $theme: () => this.theme
    }
  },
  render: function (createElement) {
    return createElement('div', {}, this.$slots.default)
  }
}

