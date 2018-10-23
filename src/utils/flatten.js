import isPlainObject from 'lodash.isplainobject'
import hyphenateStyleName from './hyphenateStyleName'

export const objToCss = (obj, prevKey) => {
  const css = Object.keys(obj).map(key => {
    if (isPlainObject(obj[key])) return objToCss(obj[key], key)
    return `${hyphenateStyleName(key)}: ${obj[key]};`
  }).join(' ')
  return prevKey ? `${prevKey} {
  ${css}
}` : css
}

const flatten = (chunks, executionContext) => (
  chunks.reduce((ruleSet, chunk) => {
    /* Remove falsey values */
    if (chunk === undefined || chunk === null || chunk === false || chunk === '') return ruleSet
    /* Flatten ruleSet */
    if (Array.isArray(chunk)) return [...ruleSet, ...flatten(chunk, executionContext)]
    /* Either execute or defer the function */
    if (typeof chunk === 'function') {
      return executionContext
        ? ruleSet.concat(...flatten([chunk(executionContext)], executionContext))
        : ruleSet.concat(chunk)
    }

    /* Handle objects */
    // $FlowFixMe have to add %checks somehow to isPlainObject
    return ruleSet.concat(isPlainObject(chunk) ? objToCss(chunk) : chunk.toString())
  }, [])
)

export default flatten
