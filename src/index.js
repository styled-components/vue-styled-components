import _styledComponent from './models/StyledComponent';
import _componentStyle from './models/ComponentStyle';
import _styled from './constructors/styled';
import generateAlphabeticalName from './utils/generateAlphabeticalName';

const styled = _styled(_styledComponent(_componentStyle(generateAlphabeticalName)));

export default styled;
