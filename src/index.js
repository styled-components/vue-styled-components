import generateAlphabeticalName from './utils/generateAlphabeticalName'
import css from './constructors/css'
import injectGlobal from './constructors/injectGlobal'

import _styledComponent from './models/StyledComponent'
import _componentStyle from './models/ComponentStyle'
import _styled from './constructors/styled'

const styled = _styled(_styledComponent(_componentStyle(generateAlphabeticalName)))

export default styled

export { css, injectGlobal }
