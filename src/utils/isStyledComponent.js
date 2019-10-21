export default function isStyledComponent (target) {
  return target &&
    target.methods &&
    'generateAndInjectStyles' in target.methods &&
    typeof target.methods.generateAndInjectStyles() === 'string'
}
