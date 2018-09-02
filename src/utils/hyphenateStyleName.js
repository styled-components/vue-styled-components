const _uppercasePattern = /([A-Z])/g
const msPattern = /^ms-/

function hyphenate (string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase()
}

function hyphenateStyleName (string) {
  return hyphenate(string).replace(msPattern, '-ms-')
}

module.exports = hyphenateStyleName
