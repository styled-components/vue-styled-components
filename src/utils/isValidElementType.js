import domElements from './domElements'

export default function isValidElementType (tag) {
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
