export default function removeFalseProps (props = {}) {
  return Object.fromEntries(
    Object.entries(props)
      // Remove entries with `undefined`, `null` or `false` values.
      .filter(([key, value]) => (value === 0 || Boolean(value)))
      .map(([key, value]) => {
        return (typeof value === 'object')
          ? [key, removeFalseProps(value)]
          : [key, value]
      })
  )
}
