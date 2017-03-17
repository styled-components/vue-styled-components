export default (ComponentStyle) => {
  const createStyledComponent = (targetEl, cssRules, props) => {
    if (targetEl !== null && typeof targetEl === 'object') {
      const mergedProps = Object.assign({}, targetEl.keepProps, props)
      return createStyledComponent(targetEl.tagName, targetEl.cssRules.concat(cssRules), mergedProps)
    }

    const componentStyle = new ComponentStyle(cssRules)
    const StyledComponent = {
      props,
      data: () => ({
        generatedClassName: ''
      }),
      render: function (createElement) {
        return createElement(
          targetEl,
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
    }

    StyledComponent.tagName = targetEl
    StyledComponent.cssRules = cssRules
    StyledComponent.keepProps = props

    return StyledComponent
  }

  return createStyledComponent
}
