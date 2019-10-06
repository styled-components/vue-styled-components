import css from '../constructors/css'

export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props) => {
    const prevProps = target && typeof target !== 'string'
      ? (typeof target === 'object' ? target.props : (typeof target === 'function' ? target.options.props : {}))
      : {}

    const mergedProps = { ...prevProps, ...props }

    const componentStyle = new ComponentStyle(rules)

    const StyledComponent = {
      inject: {
        $theme: {
          default: function () {
            return () => ({ })
          }
        }
      },
      props: mergedProps,
      render: function (createElement) {
        const children = []
        for (const slot in this.$slots) {
          if (slot === 'default') {
            children.push(this.$slots[slot])
          } else {
            children.push(createElement('template', { slot }, this.$slots[slot]))
          }
        }

        return createElement(
          target,
          {
            class: [this.generatedClassName],
            props: this.$props,
            domProps: {
              value: this.value
            },
            on: this.$listeners,
            scopedSlots: this.$scopedSlots
          },
          children
        )
      },
      methods: {
        generateAndInjectStyles (componentProps) {
          return componentStyle.generateAndInjectStyles(componentProps)
        }
      },
      computed: {
        generatedClassName () {
          const componentProps = { theme: this.theme, ...this.$props }
          return this.generateAndInjectStyles(componentProps)
        },
        theme () {
          return this.$theme()
        }
      },
      extend (cssRules, ...interpolations) {
        const extendedRules = css(cssRules, ...interpolations)
        return createStyledComponent(target, rules.concat(extendedRules), props)
      },
      withComponent (newTarget) {
        return createStyledComponent(newTarget, rules, props)
      }
    }

    return StyledComponent
  }

  return createStyledComponent
}
