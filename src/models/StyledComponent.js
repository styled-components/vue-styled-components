export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, props) => {
    const isValidTarget = target && typeof target !== 'string'
    let prevProps = {}

    if (isValidTarget) {
      prevProps = typeof target === 'object' ? target.props : (typeof target === 'function' ? target.options.props : {})
    }

    const mergedProps = Object.assign({ value: {}}, prevProps, props)
    const componentStyle = new ComponentStyle(rules)

    return {
      props: mergedProps,
      data () {
        return { localValue: this.value }
      },
      watch: {
        value (newVal) {
          this.localValue = newVal
        },
        localValue () {
          this.$emit('input', this.localValue)
        }
      },
      render (createElement) {
        const self = this
        return createElement(
          target,
          {
            class: [self.generatedClassName],
            props: self.$props,
            domProps: {
              value: self.localValue
            },
            on: {
              input: (event) => {
                if (event.target) {
                  self.localValue = event.target.value
                }
              },
              click: (event) => {
                self.$emit('click', event)
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
      extend (...extendedRules) {
        const extended = []

        extendedRules[0].forEach((line, key) => {
          extended.push(line)
          extended.push(extendedRules[key + 1])
        })

        return createStyledComponent(target, rules.slice().concat(extended), mergedProps)
      },
      withComponent (newTarget) {
        return createStyledComponent(newTarget, rules, mergedProps)
      }
    }
  }
  return createStyledComponent
}
