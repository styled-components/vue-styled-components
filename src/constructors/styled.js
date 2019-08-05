import css from './css'
import domElements from '../utils/domElements'
import isValidElementType from '../utils/isValidElementType'

export default (createStyledComponent) => {
  const styled = (tagName, props = {}, attrs = {}) => {
    if (!isValidElementType(tagName)) {
      throw new Error(tagName + ' is not allowed for styled tag type.')
    }
    return (cssRules, ...interpolations) => (
      createStyledComponent(tagName, css(cssRules, ...interpolations), props, attrs)
    )
  }

  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement)
  })

  return styled
}
