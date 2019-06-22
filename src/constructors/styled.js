import css from './css'
import domElements from '../utils/domElements'

// check valid vue-styled-component element type
function isValidElementType (tag) {
  if (typeof tag === 'undefined' || typeof tag === 'number') {
    return false
  }
  if (typeof tag === 'string') {
    return domElements.includes(tag)
  }
  if (typeof tag === 'object') {
    return !!tag.template || !!tag.withComponent
  }
  return true
}

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
