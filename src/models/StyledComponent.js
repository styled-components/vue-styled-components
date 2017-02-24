import Vue from 'vue';
import insertCss from 'insert-css';

export default (generateName) => {
  const createStyledComponent = (tagetEl, cssRules) => {
    if (tagetEl.prototype instanceof Vue) {
      return createStyledComponent(tagetEl.tagName, tagetEl.cssRules.concat(cssRules));
    }

    const componentName = generateName(tagetEl);
    insertCss(`.${componentName} { ${cssRules.join('')} }`);

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
