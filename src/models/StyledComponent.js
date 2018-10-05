export default (ComponentStyle) => {
  const createStyledComponent = (target, rules, styleProps) => {
    const componentStyle = new ComponentStyle(rules);

    return {
      functional: true,
      render (createElement, context) {
        const { children, data } = context || {};
        const props = Object.assign((data && data.attrs) ? data.attrs : {}, styleProps);
        
        Object.keys(props).forEach(index => {
          if (typeof props[index] === 'function') {
            props[index] = props[index](props);
          }
        });

        const className = componentStyle.generateAndInjectStyles(props);
      
        if (context) {
          return createElement(
            target,
            Object.assign(context, { 
              class: className,
              domProps: { value: data.model ? data.model.value : undefined },
              on: {
                input: function (event) {
                  if (data.model) data.model.callback(event.target.value)
                }
              }
            }),
            children
          );
        }
      },
      extend (...extendedRules) {
        const extended = []
      
        extendedRules[0].forEach((line, key) => {
          extended.push(line)
          extended.push(extendedRules[key + 1])
        })
      
        return createStyledComponent(target, rules.slice().concat(extended), styleProps)
      },
      withComponent (newTarget) {
        return createStyledComponent(newTarget, rules, styleProps)
      },
      target,
    }
  }
  return createStyledComponent;
}
