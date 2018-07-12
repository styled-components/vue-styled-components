export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props) => {
    const prevProps = target && typeof target !== 'string'
      ? (typeof target === 'object' ? target.props : (typeof target === 'function' ? target.options.props : {}))
      : {}
    const mergedProps = Object.assign({}, prevProps, props)

    const componentStyle = new ComponentStyle(rules)

    const StyledComponent = {
      props: mergedProps,
      render: function (createElement) {
        return createElement(
          target,
          {
            class: [this.generatedClassName],
            props: this.$props,
            domProps: {
              value: this.value
            },
            on: {
              input: (event) => {
                this.$emit('input', event.target.value)
              },
              click: (event) => {
                this.$emit('click', event)
              }
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
      computed: {
        generatedClassName () {
          const componentProps = Object.assign({}, this.$props)
          return this.generateAndInjectStyles(componentProps)
        }
      },
      extend(extendedRules) {
        return createStyledComponent(target, rules.slice().concat(extendedRules), props);
      },
      withComponent(newTarget) {
        return createStyledComponent(newTarget, rules, props);
      }
    }

    return StyledComponent
  }

  return createStyledComponent
}
