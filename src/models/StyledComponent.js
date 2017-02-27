import Vue from 'vue';

import generateAlphabeticalName from '../utils/generateAlphabeticalName';

export default (ComponentStyle) => {
  const createStyledComponent = (tagetEl, cssRules, props) => {
    if (tagetEl.prototype instanceof Vue) {
      return createStyledComponent(tagetEl.tagName, tagetEl.cssRules.concat(cssRules), Object.assign({}, tagetEl.keepProps, props));
    }

    const componentName = generateAlphabeticalName(tagetEl);
    const componentStyle = new ComponentStyle(cssRules, componentName);

    const StyledComponent = Vue.component(componentName, { /* eslint-disable object-shorthand */
      /* eslint-disable func-names */
      props,
      render: function (createElement) {
        return createElement(
          tagetEl,
          {
            class: {
              [componentName]: true,
            },
          },
          this.$slots.default,
        );
      },
      methods: {
        generateAndInjectStyles(props) {
          return componentStyle.generateAndInjectStyles(props);
        },
      },
      mounted() {
        const props = Object.assign({}, this.$props);
        this.generateAndInjectStyles(props);
      }
    });

    StyledComponent.tagName = tagetEl;
    StyledComponent.cssRules = cssRules;
    StyledComponent.keepProps = props;

    return StyledComponent;
  };

  return createStyledComponent;
};
