import isTag from './isTag'
import isVueComponent from './isVueComponent'
import isStyledComponent from './isStyledComponent'

export default function isValidElementType (target) {
  return isStyledComponent(target) ||
    isVueComponent(target) ||
    isTag(target)
}
