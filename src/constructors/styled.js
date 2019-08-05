import css from './css'
import domElements from '../utils/domElements'
import isValidElementType from '../utils/isValidElementType'

export default (createStyledComponent) => {
  const styled = (tagName, props = {}) => {
    if (!isValidElementType(tagName)) {
      throw new Error(tagName + ' is not allowed for styled tag type.')
    }
    return (cssRules, ...interpolations) => (
      createStyledComponent(tagName, css(cssRules, ...interpolations), props)
    )
  }

  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement)
  })

  return styled
}
