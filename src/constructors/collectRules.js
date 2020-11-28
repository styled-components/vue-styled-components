import StyleSheet from '../models/StyleSheet'

const collectRules = () => {
  return StyleSheet.rules().filter(rule => rule.cssText.length > 0)
}

export default collectRules
