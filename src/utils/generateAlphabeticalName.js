import uuid from 'uuid/v4';

export default tag => `${tag}_${uuid()}`;
