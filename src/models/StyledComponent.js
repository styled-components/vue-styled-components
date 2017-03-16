import Vue from 'vue'

export default (ComponentStyle) => {
  const createStyledComponent = (tagetEl, cssRules, props) => {
    if (tagetEl.prototype instanceof Vue) {
      const mergedProps = Object.assign({}, tagetEl.keepProps, props)
      return createStyledComponent(tagetEl.tagName, tagetEl.cssRules.concat(cssRules), mergedProps)
    }

    const componentStyle = new ComponentStyle(cssRules)
    const StyledComponent = Vue.component('n_' + Math.random().toString(36).substring(7), { /* eslint-disable object-shorthand */
      /* eslint-disable func-names */
      props,
      data: () => ({
        generatedClassName: ''
      }),
      render: function (createElement) {
        return createElement(
          tagetEl,
          {
            class: [this.generatedClassName]
          },
          this.$slots.default
        )
      },
      methods: {
        generateAndInjectStyles (componentProps) {
          return componentStyle.generateAndInjectStyles(componentProps)
        }
      },
      mounted () {
        const componentProps = Object.assign({}, this.$props)
        this.generatedClassName = this.generateAndInjectStyles(componentProps)
      }
    })

    StyledComponent.tagName = tagetEl
    StyledComponent.cssRules = cssRules
    StyledComponent.keepProps = props

    return StyledComponent
  }

  return createStyledComponent
}
