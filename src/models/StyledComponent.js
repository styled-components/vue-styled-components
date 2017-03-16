import Vue from 'vue'

import generateAlphabeticalName from '../utils/generateAlphabeticalName'

export default (ComponentStyle) => {
  const createStyledComponent = (tagetEl, cssRules, props) => {
    if (tagetEl.prototype instanceof Vue) {
      const mergedProps = Object.assign({}, tagetEl.keepProps, props)
      return createStyledComponent(tagetEl.tagName, tagetEl.cssRules.concat(cssRules), mergedProps)
    }

    const componentName = generateAlphabeticalName(tagetEl)
    const componentStyle = new ComponentStyle(cssRules, componentName)

    const StyledComponent = Vue.component(componentName, { /* eslint-disable object-shorthand */
      /* eslint-disable func-names */
      props,
      render: function (createElement) {
        return createElement(
          tagetEl,
          {
            class: {
              [componentName]: true
            }
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
        this.generateAndInjectStyles(componentProps)
      }
    })

    StyledComponent.tagName = tagetEl
    StyledComponent.cssRules = cssRules
    StyledComponent.keepProps = props

    return StyledComponent
  }

  return createStyledComponent
}
