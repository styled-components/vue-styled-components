# vue-styled-components

> Visual primitives for the component age. A simple port for Vue of [Max   Stoiber](https://mxstbr.com/) styled-components 💅

## Caution 🚧

### Not yet ready for production, no-tests provided, not full featured

## Simple Usage

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

  // Local component registration (see https://vuejs.org/v2/guide/components.html#Local-Registration)
  new Vue({
    // ...
    components {
      // styled-button will only be available in parent's template
      'styled-button': StyledButton
    }
  }
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

Licensed under the MIT License, Copyright © 2016 Glen Maddern and Maximilian Stoiber.

See [LICENSE](./LICENSE) for more information.
