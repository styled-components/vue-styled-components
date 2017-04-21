export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props, parent) => {
    if (target !== null && typeof target === 'object') {
      const mergedProps = Object.assign({}, target.props, props)
      return createStyledComponent(target.displayName, target.rules.concat(rules), mergedProps, target)
    }

    const componentStyle = new ComponentStyle(rules)
    const ParentComponent = parent || {}

    const StyledComponent = Object.assign({}, ParentComponent, {
      props,
      data: () => ({
        generatedClassName: ''
      }),
      render: function (createElement) {
        return createElement(
          target,
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

    StyledComponent.displayName = target
    StyledComponent.rules = rules

    return StyledComponent
  }

  return createStyledComponent
}
