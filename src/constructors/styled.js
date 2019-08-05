import css from './css'
import domElements from '../utils/domElements'

export default (createStyledComponent) => {
  const styled = (tagName, props = {}, attrs = {}) =>
    (cssRules, ...interpolations) => (
      createStyledComponent(tagName, css(cssRules, ...interpolations), props, attrs)
    )

  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement)
  })

  return styled
}
