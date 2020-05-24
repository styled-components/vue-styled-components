import css from './css'
import domElements from '../utils/domElements'
import isValidElementType from '../utils/isValidElementType'

export default (createStyledComponent) => {
  const styled = (tagName, props = {}, options = {}) => {
    if (!isValidElementType(tagName)) {
      throw new Error(tagName + ' is not allowed for styled tag type.')
    }

    const templateFunction = (cssRules, ...interpolations) => (
      createStyledComponent(tagName, css(cssRules, ...interpolations), props, options)
    )

    templateFunction.attrs = attrs => styled(tagName, props, {
      ...options,
      attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
    })

    return templateFunction
  }

  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement)
  })

  return styled
}
