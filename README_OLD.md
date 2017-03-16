# vue-styled-components

> Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress 💅

``` 
yarn add vue-styled-components
```

Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS allows you to write actual CSS code to style your components. It also removes the mapping between components and styles – using components as a low-level styling construct could not be easier!

*This is a fork from original styled-components made by [Glen Maddern](https://twitter.com/glenmaddern) and [Max Stoiber](https://twitter.com/mxstbr), supported by [Front End Center](https://frontend.center) and [Thinkmill](http://thinkmill.com.au/). Thank you for making this project possible!*

## Usage

### 🚧 Caution 🚧

> 🚨 Not yet ready for production, test aren't available atm. 🚨

### Important

> In Vue you must register components locally, so the following code is always required:

```
  // Local component registration (see https://vuejs.org/v2/guide/components.html#Local-Registration)
  new Vue({
    // ...
    components {
      // styled-button will only be available in parent's template
      'my-component': MyComponent
    },
    template: '<my-component> Fancy Button </my-component>'
  }
```

### Basic

This creates two Vue components, `<Title>` and `<Wrapper>`:

```JS
import styled from 'styled-components';

// Create a <Title> Vue component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> Vue component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
```

You render them like so:

```JSX
// Use them like any other Vue component – except they're styled!
<Wrapper>
  <Title>Hello World, this is my first styled component!</Title>
</Wrapper>
```

### Passed props

Styled components pass on all their props. This is a styled `<input>`:

```JS
import styled from 'styled-components';

// Create an <Input> component that'll render an <input> tag with some styles
const Input = styled.input`
  font-size: 1.25em;
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;

  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
`;
```


## 🚧 Caution 🚧

> 🚨 Not yet ready for production, test aren't available atm. 🚨

### 👓 Important 👓

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
    display: ${props => props.isOpen ? 'block' : 'none'}
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