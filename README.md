# vue-styled-components

> Visual primitives for the component age. A simple port for Vue of [Max   Stoiber](https://mxstbr.com/) styled-components 💅

vue-styled-components creates smart and fast components with styles. CSS is autoprefixed!

## 🚧 Caution 🚧

> 🚨 Not yet ready for production, test aren't available atm. 🚨

### 👓 IMPORTANT 👓

> In Vue you must register components locally, so the following code is always required:

```
  // Local component registration (see https://vuejs.org/v2/guide/components.html#Local-Registration)
  new Vue({
    // ...
    components {
      // styled-button will only be available in parent's template
      'styled-button': StyledButton
    },
    template: '<styled-button> Fancy Button </styled-button>'
  }
```

## Basic Usage 👣

``` js
  import styled from 'vue-styled-components';

  const StyledButton = styled.button`
    background: white;
    color: #4fc08d;

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #4fc08d;
    border-radius: 3px;
  `;
```

## Advanced Usage 👡


``` js
  import styled from 'vue-styled-components';
  import StyledButton from './StyledButton';

  const HugeStyledButton = styled(StyledButton)`
    font-size: 2em;
    padding: 0.85em 2em;
    border: 4px solid #4fc08d;
  `;
```

## Expert Usage 👠

``` js
  import styled from 'vue-styled-components';

  // Vue need to specify also props we will use
  const modalProps = { isOpen: Boolean };

  const Modal = styled('div', modalProps)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1024;
    background-color: rgba(0, 0, 0, 0.75);
    display: ${props => props.isOpen : 'block' : 'none'}
  `;
```

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
npm run dev

# create UMD bundle.
npm run bundle

# Create docs inside /gh-pages ready to be published
npm run docs

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## License

Licensed under the MIT License, Copyright © 2017 Lorenzo Girardi.

See [LICENSE](./LICENSE) for more information.
