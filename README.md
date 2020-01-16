# vue-styled-components

> Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress 💅

## Support

> This version is compatible with Vue 2.x

```
yarn add vue-styled-components
```

Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS allows you to write actual CSS code to style your components. It also removes the mapping between components and styles – using components as a low-level styling construct could not be easier!

*This is a (not fully-featured)fork from original styled-components made by [Glen Maddern](https://twitter.com/glenmaddern) and [Max Stoiber](https://twitter.com/mxstbr), supported by [Front End Center](https://frontend.center) and [Thinkmill](http://thinkmill.com.au/). Thank you for making this project possible!*

## Usage

> Register first your component locally (see https://vuejs.org/v2/guide/components.html#Local-Registration)

```
  new Vue({
    // ...
    components {
      'styled-title': StyledTitle
    },
    template: '<styled-title> Hello! </styled-title>'
  }
```

### Basic

> Do not use built-in or reserved HTML elements as component id (title, button, input...).


This creates two Vue components, `<StyledTitle>` and `<Wrapper>`:

```JS
import styled from 'vue-styled-components';

// Create a <StyledTitle> Vue component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const StyledTitle = styled.h1`
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
<wrapper>
  <styled-title>Hello World, this is my first styled component!</styled-title>
</wrapper>
```

### Passed props

Styled components pass on all their props. This is a styled `<input>`:

```JS
import styled from 'vue-styled-components';

// Create an <StyledInput> component that'll render an <input> tag with some styles
const StyledInput = styled.input`
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
You can just pass a `placeholder` prop into the `styled-component`. It will pass it on to the DOM node like any other Vue component:

```JSX
// Render a styled input with a placeholder of "@liqueflies"
<styled-input placeholder="@liqueflies" type="text" />
```
### Adapting based on props

This is a button component that has a `primary` state. By setting `primary` to `true` when rendering it we adjust the background and text color.

### Important

> A prop is a custom attribute for passing information from parent components. A child component needs to explicitly declare the props it expects to receive using the props option, you must define your prop before, and of course, get benefits of validation! (see https://vuejs.org/v2/guide/components.html#Passing-Data-with-Props)

```
{
  props: {
    propA: String,
    propB: [String, Number]
  }
}
```

```JSX
import styled from 'vue-styled-components';

const btnProps = { primary: Boolean };

const StyledButton = styled('button', btnProps)`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
`;

export default StyledButton;
```

```JSX
<styled-button>Normal</styled-button>
<styled-button primary>Primary</styled-button>
```

### Overriding component styles

Taking the `StyledButton` component from above and removing the primary rules, this is what we're left with – just a normal button:

```JSX
import styled from 'vue-styled-components';

const StyledButton = styled.button`
  background: white;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export default StyledButton;
```

### Theming

`vue-styled-components` has full theming support by exporting a `<ThemeProvider>` wrapper component. This component provides a theme to all `Vue` components underneath itself via the context API. In the render tree all `vue-styled-components` will have access to the provided theme, even when they are multiple levels deep.

Remember to register `ThemeProvider` locally.

```JSX
  import {ThemeProvider} from 'vue-styled-components'

  new Vue({
    // ...
    components: {
      'theme-provider': ThemeProvider
    },
    // ...
  });
```

Add your `ThemeProvider` component:

```vue
  <theme-provider :theme="{
    primary: 'palevioletred'
  }">
    <wrapper>
      // ...
    </wrapper>
  </theme-provider>
```

And into your `Wrapper` component:

```JSX
  const Wrapper = styled.default.section`
    padding: 4em;
    background: ${props => props.theme.primary};
  `;
```

### Style component constructors as `router-link`

You can style also Vue component constructors as `router-link` from `vue-router` and other components

```JSX
import styled from 'vue-styled-components';

// unfortunately you can't import directly router-link, you have to retrieve contstructor
const RouterLink = Vue.component('router-link')

const StyledLink = styled(RouterLink)`
  color: palevioletred;
  font-size: 1em;
  text-decoration: none;
`;

export default StyledLink;
```

```JSX
<styled-link to="/">Custom Router Link</styled-link>
```

Let's say someplace else you want to use your button component, but just in this one case you want the color and border color to be `tomato` instead of `palevioletred`. Now you _could_ pass in an interpolated function and change them based on some props, but that's quite a lot of effort for overriding the styles once.

To do this in an easier way you can call `StyledComponent.extend` as a function and pass in the extended style. It overrides duplicate styles from the initial component and keeps the others around:

```JSX
// Tomatobutton.js

import StyledButton from './StyledButton';

const TomatoButton = StyledButton.extend`
  color: tomato;
  border-color: tomato;
`;

export default TomatoButton;
```

### Polymorphic `as` prop
If you want to keep all the styling you've applied to a component but just switch out what's being ultimately rendered (be it a different HTML tag or a different custom component), you can use the "as" prop to do this at runtime. Another powerful feature of the `as` prop is that it preserves styles if the lowest-wrapped component is a `StyledComponent`.

**Example**
In `Component.js`
```js
//  Renders a div element by default.
const Component = styled('div', {})``
```
Using the `as` prop in another template/component would be as shown below.
```vue
<template>
  <!-- Component will render a button instead of a div -->
  <Component as="button" color="red">
    Button
  </Component>
</template>
```
This sort of thing is very useful in use cases like a navigation bar where some of the items should be links and some just buttons, but all be styled the same way.

### withComponent
Let's say you have a `button` and an `a` tag. You want them to share the exact same style. This is achievable with `.withComponent`.
```JSX
const Button = styled.button`
  background: green;
  color: white;
`
const Link = Button.withComponent('a')
```

### injectGlobal

A helper method to write global CSS. Does not return a component, adds the styles to the stylesheet directly.

**We do not encourage the use of this. Use once per app at most, contained in a single file.** This is an escape hatch. Only use it for the rare `@font-face` definition or `body` styling.

```JS
// global-styles.js

import { injectGlobal } from 'vue-styled-components';

injectGlobal`
	@font-face {
	  font-family: 'Operator Mono';
	  src: url('../fonts/Operator-Mono.ttf');
	}

	body {
		margin: 0;
	}
`;
```

## Syntax highlighting

The one thing you lose when writing CSS in template literals is syntax highlighting. We're working hard on making proper syntax highlighting happening in all editors. We currently have support for Atom, Visual Studio Code, and soon Sublime Text.

### Atom

[**@gandm**](https://github.com/gandm), the creator of `language-babel`, has added support for `styled-components` in Atom!

To get proper syntax highlighting, all you have to do is install and use the `language-babel` package for your JavaScript files!

### Sublime Text

There is an [open PR](https://github.com/babel/babel-sublime/pull/289) by [@garetmckinley](https://github.com/garetmckinley) to add support for `styled-components` to `babel-sublime`! (if you want the PR to land, feel free to 👍 the initial comment to let the maintainers know there's a need for this!)

As soon as that PR is merged and a new version released, all you'll have to do is install and use `babel-sublime` to highlight your JavaScript files!

### Visual Studio Code

The [vscode-styled-components](https://github.com/styled-components/vscode-styled-components) extension provides syntax highlighting inside your Javascript files. You can install it as usual from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components).

### VIM / NeoVim
The [`vim-styled-components`](https://github.com/fleischie/vim-styled-components) plugin gives you syntax highlighting inside your Javascript files. Install it with your usual plugin manager like [Plug](https://github.com/junegunn/vim-plug), [Vundle](https://github.com/VundleVim/Vundle.vim), [Pathogen](https://github.com/tpope/vim-pathogen), etc.

Also if you're looking for an awesome javascript syntax package you can never go wrong with [YAJS.vim](https://github.com/othree/yajs.vim).

### Other Editors

We could use your help to get syntax highlighting support to other editors! If you want to start working on syntax highlighting for your editor, open an issue to let us know.

## License

Licensed under the MIT License, Copyright © 2017 Lorenzo Girardi.

See [LICENSE](./LICENSE) for more information.
