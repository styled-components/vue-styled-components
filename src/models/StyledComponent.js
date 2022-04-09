import { computed, h, inject, unref } from 'vue'
import css from '../constructors/css'
import { themeKey } from '../providers/themeKey'
import isVueComponent from '../utils/isVueComponent'
import normalizeProps from '../utils/normalizeProps'

export default ComponentStyle => {
  const createStyledComponent = (target, rules, props, options) => {
    const { attrs = [] } = options
    const componentStyle = new ComponentStyle(rules)
    // handle array-declaration props
    const currentProps = normalizeProps(props)
    const prevProps = normalizeProps(target.props)
    const propDefs = Object.keys(prevProps)

    return {
      props: {
        as: [String, Object],
        modelValue: null,
        ...prevProps,
        ...currentProps
      },

      setup(props, { slots, emit }) {
        const theme = inject(themeKey)

        return () => {
          const context = computed(() => ({
            // @todo update w/vue 3.3
            // @see https://github.com/vuejs/core/blob/56879e6b233d33a2e91e658451fec27e881ca7fd/packages/runtime-core/src/componentOptions.ts#L853-L857
            theme: unref(theme),
            ...props
          }))

          const computedAttrs = computed(() => {
            const resolvedAttrs = {}

            attrs.forEach(attrDef => {
              let resolvedAttrDef = attrDef

              if (typeof resolvedAttrDef === 'function') {
                resolvedAttrDef = resolvedAttrDef(context.value)
              }

              for (const key in resolvedAttrDef) {
                context.value[key] = resolvedAttrs[key] = resolvedAttrDef[key]
              }
            })

            return resolvedAttrs
          })

          const generatedClassName = computed(() => {
            const componentProps = { ...context.value, ...computedAttrs.value }

            return generateAndInjectStyles(componentProps)
          })

          const generateAndInjectStyles = componentProps => {
            return componentStyle.generateAndInjectStyles(componentProps)
          }

          const targetProps = {}
          // diff explicit prop declarations against inherited props
          if (propDefs.length) {
            for (const [key, value] of Object.entries(props)) {
              if (propDefs.includes(key)) {
                targetProps[key] = value
              }
            }
          }

          return h(
            isVueComponent(target) ? target : props.as || target,
            {
              ...targetProps,
              ...computedAttrs.value,
              value: props.modelValue,
              class: generatedClassName.value,
              onInput: e => {
                emit('input', e)
                emit('update:modelValue', e.target.value)
              }
            },
            slots
          )
        }
      },

      extend(cssRules, ...interpolations) {
        const extendedRules = css(cssRules, ...interpolations)
        return createStyledComponent(
          target,
          rules.concat(extendedRules),
          props,
          options
        )
      },
      withComponent(newTarget) {
        return createStyledComponent(newTarget, rules, props, options)
      }
    }
  }

  return createStyledComponent
}
