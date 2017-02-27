import Vue from 'vue';
import parse from 'postcss-safe-parser';
import insertCss from 'insert-css';
import autoprefix from '../utils/autoprefix';

export default (generateName) => {
  const createStyledComponent = (tagetEl, cssRules) => {
    if (tagetEl.prototype instanceof Vue) {
      return createStyledComponent(tagetEl.tagName, tagetEl.cssRules.concat(cssRules));
    }

    const componentName = generateName(tagetEl);
    const flatCss = cssRules.join('').replace(/^\s*\/\/.*$/gm, ''); // replace js comments
    const root = parse(`.${componentName} { ${flatCss} }`);
    autoprefix(root);
    insertCss(root.toResult().css);

    const StyledComponent = Vue.component(componentName, { /* eslint-disable object-shorthand */
      functional: true, /* eslint-disable func-names */
      render: function (createElement, ctx) {
        return createElement(
          tagetEl,
          {
            class: {
              [componentName]: true,
            },
          },
          ctx.children,
        );
      },
    });

    StyledComponent.tagName = tagetEl;
    StyledComponent.cssRules = cssRules;

    return StyledComponent;
  };

  return createStyledComponent;
};
