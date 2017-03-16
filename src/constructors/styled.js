import css from './css'
import domElements from '../utils/domElements'

export default (createStyledComponent) => {
  const styled = (tagName, props = {}) =>
    (cssRules, ...interpolations) => (
      createStyledComponent(tagName, css(cssRules, ...interpolations), props)
    )

  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement)
  })

  return styled
}
