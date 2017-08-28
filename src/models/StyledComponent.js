export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props, parent) => {
    const componentStyle = new ComponentStyle(rules)
    const ParentComponent = parent || {}

    const prevProps = target && typeof target !== 'string'
      ? (typeof target === 'object' ? target.props : (typeof target === 'function' ? target.options.props : {}))
      : {}
    const mergedProps = Object.assign({}, prevProps, props)

    const StyledComponent = Object.assign({}, {
      extends: ParentComponent,
      props: mergedProps,
      data: () => ({
        generatedClassName: ''
      }),
      render: function (createElement) {
        return createElement(
          target,
          {
            class: [this.generatedClassName],
            props: this.$props
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

    return StyledComponent
  }

  return createStyledComponent
}
