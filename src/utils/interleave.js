export default (cssRules, interpolations) => (
  interpolations.reduce((array, interp, i) => (
    // ['color:', 'red', ';']
    array.concat(interp, cssRules[i + 1])
  ), [cssRules[0]])
)
