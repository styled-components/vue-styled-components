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
                this.value = event.target.value
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
        generateAndInjectStyles (style, props) {
          return style.generateAndInjectStyles(props)
        }
      },
      computed: {
        generatedClassName () {
          const componentProps = Object.assign({}, this.$props)
          return this.generateAndInjectStyles(componentStyle, componentProps)
        }
      },
      extend(...extendedRules) {
        const extended = []

        extendedRules[0].forEach((line, key) => {
          extended.push(line)
          extended.push(extendedRules[key + 1])
        });

        return createStyledComponent(target, rules.slice().concat(extended), mergedProps)
      },
      withComponent(newTarget) {
        return createStyledComponent(newTarget, rules, mergedProps);
      }
    }

    return StyledComponent
  }

  return createStyledComponent
}
