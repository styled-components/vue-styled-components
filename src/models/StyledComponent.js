import css from '../constructors/css'
import normalizeProps from '../utils/normalizeProps'
import isVueComponent from '../utils/isVueComponent'

export default (ComponentStyle) => {
<<<<<<< HEAD
  const createStyledComponent = (target, rules, props, attrs) => {
    const prevProps = target && typeof target !== 'string'
      ? (typeof target === 'object' ? target.props : (typeof target === 'function' ? target.options.props : {}))
      : {}
    const mergedProps = Object.assign({}, prevProps, props)

    const componentStyle = new ComponentStyle(rules)

    // Null check
    const attributes = attrs || {}
=======
  const createStyledComponent = (target, rules, props) => {
    const componentStyle = new ComponentStyle(rules)

    // handle array-declaration props
    const currentProps = normalizeProps(props)
    const prevProps = normalizeProps(target.props)
>>>>>>> b7719a0f238ef7abb900dc36904c487381201596

    const StyledComponent = {
      inject: {
        $theme: {
          default: function () {
            return () => ({ })
          }
        }
      },
      props: {
        as: [String, Object],
        value: null,
        ...currentProps,
        ...prevProps
      },
      data () {
        return {
          localValue: this.value
        }
      },
      render (createElement) {
        const children = []
        for (const slot in this.$slots) {
          if (slot === 'default') {
            children.push(this.$slots[slot])
          } else {
            children.push(createElement('template', { slot }, this.$slots[slot]))
          }
        }

        return createElement(
          // Check if target is StyledComponent to preserve inner component styles for composition
          isVueComponent(target) ? target : this.$props.as || target,
          {
            class: [this.generatedClassName],
            attrs: attributes,
            props: this.$props,
            domProps: {
              value: this.localValue
            },
            on: {
              ...this.$listeners,
              input: event => {
                if (event && event.target) {
                  this.localValue = event.target.value
                }
              }
            },
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
      watch: {
        value (newValue) {
          this.localValue = newValue
        },
        localValue () {
          this.$emit('input', this.localValue)
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
