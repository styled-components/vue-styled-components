import generateAlphabeticName from './utils/generateAlphabeticName'
import css from './constructors/css'
import injectGlobal from './constructors/injectGlobal'

import _styledComponent from './models/StyledComponent'
import _componentStyle from './models/ComponentStyle'
import _styled from './constructors/styled'

const styled = _styled(_styledComponent(_componentStyle(generateAlphabeticName)))

export default styled

export { css, injectGlobal }
