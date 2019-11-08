export default function isStyledComponent (target) {
  return target &&
    target.methods &&
    typeof target.methods.generateAndInjectStyles === 'function'
}
