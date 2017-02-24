import _StyledComponent from './models/StyledComponent';
import _styled from './constructors/styled';
import generateAlphabeticalName from './utils/generateAlphabeticalName';

const styled = _styled(_StyledComponent(generateAlphabeticalName));

export default styled;
