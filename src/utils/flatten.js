import hyphenate from 'fbjs/lib/hyphenateStyleName'
import isPlainObject from 'lodash.isplainobject'

export const objToCss = (obj, prevKey) => {
  const css = Object.keys(obj).map((key) => {
    if (isPlainObject(obj[key])) return objToCss(obj[key], key)
    return `${hyphenate(key)}: ${obj[key]};`
  }).join(' ')
  return prevKey ? `${prevKey} {
  ${css}
}` : css
}

const flatten = (chunks, executionContext) => (
  chunks.reduce((array, chunk) => {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return array
    /* Flatten arrays */
    if (Array.isArray(chunk)) return array.concat(...flatten(chunk, executionContext))
    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext
        ? array.concat(...flatten([chunk(executionContext)], executionContext))
        : array.concat(chunk)
    }
    /* Handle objects */
    return array.concat(isPlainObject(chunk) ? objToCss(chunk) : chunk.toString())
  }, [])
)

export default flatten
