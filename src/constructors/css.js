import interleave from '../utils/interleave'
import flatten from '../utils/flatten'

export default (rules, ...interpolations) => (
  flatten(interleave(rules, interpolations))
)
