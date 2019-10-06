
import domElements from './domElements'

export default function isTag (target) {
  if (typeof target === 'string') {
    return domElements.indexOf(target) !== -1
  }
}
