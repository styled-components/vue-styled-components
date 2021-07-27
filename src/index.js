import generateAlphabeticName from './utils/generateAlphabeticName'
import css from './constructors/css'
import collectRules from './constructors/collectRules'
import keyframes from './constructors/keyframes'
import injectGlobal from './constructors/injectGlobal'
import ThemeProvider from './providers/ThemeProvider'

import _styledComponent from './models/StyledComponent'
import _componentStyle from './models/ComponentStyle'
import _styled from './constructors/styled'
import StyleSheet from './models/StyleSheet'
import ServerSideRenderMixin from './mixins/ssr'

const styled = _styled(
  _styledComponent(_componentStyle(generateAlphabeticName))
)

export default styled

export { css, collectRules, injectGlobal, StyleSheet, ServerSideRenderMixin, keyframes, ThemeProvider }
