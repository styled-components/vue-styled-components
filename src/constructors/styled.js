import css from './css'
import domElements from '../utils/domElements'
import isValidElementType from '../utils/isValidElementType'

export default createStyledComponent => {
  const styled = (target, props = {}, options = {}) => {
    if (!isValidElementType(target)) {
      throw new Error(target + ' is not allowed for styled tag type.')
    }

    const templateFunction = (cssRules, ...interpolations) =>
      createStyledComponent(
        target,
        css(cssRules, ...interpolations),
        props,
        options
      )

    templateFunction.attrs = attrs =>
      styled(target, props, {
        ...options,
        attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
      })

    return templateFunction
  }

  domElements.forEach(domElement => {
    styled[domElement] = styled(domElement)
  })

  return styled
}
