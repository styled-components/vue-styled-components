import zipObject from 'lodash.zipobject'

export default function normalizeProps (props = {}) {
  if (Array.isArray(props)) {
    return zipObject(props)
  } else {
    return props
  }
}
