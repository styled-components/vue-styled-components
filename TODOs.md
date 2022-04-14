# TODOs

- [ ] add support for interpolated components e.g.
  ```js
  const Container = styled.div`
    background-color: red;
  `

  const Button = styled.button`
    background-color: blue;

    & ${Container}:hover {
      background-color: blue;
    }
  `
  ```

  Note: To accomplish this, we must either:
  - generate each unique styled component classname eagerly, so it can be accessed when interleaving and flattening css rules + interpolations
  - generate a unique identifier with which we can resolve the classname on render
  - see: https://github.com/styled-components/styled-components/blob/86d40770d35cfa359748998628182af35aa8983b/packages/styled-components/src/utils/flatten.ts#L69

- [ ] Test styled `router-link`
