import StyleSheet from '../models/StyleSheet'
import hashStr from 'glamor/lib/hash'
import generateAlphabeticName from '../utils/generateAlphabeticName'

const replaceWhitespace = str => str.replace(/\s|\\n/g, '')

const makeAnimation = (name, css) => `
@keyframes ${name} {
   ${css}
}
`

export default css => {
  const name = generateAlphabeticName(
    hashStr(replaceWhitespace(JSON.stringify(css)))
  )

  const animation = makeAnimation(name, css)

  if (!StyleSheet.injected) StyleSheet.inject()
  StyleSheet.insert(animation)

  return name
}
