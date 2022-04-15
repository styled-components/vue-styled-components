export default function isVueComponent(target) {
  return (
    target &&
    (typeof target.setup === 'function' ||
      typeof target.render === 'function' ||
      typeof target.template === 'string')
  )
}
