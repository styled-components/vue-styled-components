import Vue from 'vue';

import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('with styles', () => {
  /**
   * Make sure the setup is the same for every test
   */
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should append a style', () => {
    const rule = 'color: blue;'
    const Comp = styled.div`
        ${rule}
      `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {color: blue;}')
  })

  it('should append multiple styles', () => {
    const rule1 = 'color: blue;'
    const rule2 = 'background: red;'
    const Comp = styled.div`
        ${rule1}
        ${rule2}
      `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {color: blue;background: red;}')
  })

  it('should handle inline style objects', () => {
    const rule1 = {
      backgroundColor: 'blue',
    }
    const Comp = styled.div`
        ${rule1}
      `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {background-color: blue;}')
  })

  it('should handle inline style objects with media queries', () => {
    const rule1 = {
      backgroundColor: 'blue',
      '@media screen and (min-width: 250px)': {
        backgroundColor: 'red',
      },
    }
    const Comp = styled.div`
        ${rule1}
      `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {background-color: blue;}@media screen and (min-width: 250px) {.a {background-color: red;}}')
  })

  it('should handle inline style objects with pseudo selectors', () => {
    const rule1 = {
      backgroundColor: 'blue',
      '&:hover': {
        textDecoration: 'underline',
      },
    }
    const Comp = styled.div`
      ${rule1}
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {background-color: blue;}.a:hover {-webkit-text-decoration: underline;text-decoration: underline;}')
  })

  it('should handle inline style objects with pseudo selectors', () => {
    const rule1 = {
      backgroundColor: 'blue',
      '&:hover': {
        textDecoration: 'underline',
      },
    }
    const Comp = styled.div`
      ${rule1}
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {background-color: blue;}.a:hover {-webkit-text-decoration: underline;text-decoration: underline;}')
  })

  it('should handle inline style objects with nesting', () => {
    const rule1 = {
      backgroundColor: 'blue',
      '> h1': {
        color: 'white',
      },
    }
    const Comp = styled.div`
      ${rule1}
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {background-color: blue;}.a > h1 {color: white;}')
  })

  it('should handle inline style objects with contextual selectors', () => {
    const rule1 = {
      backgroundColor: 'blue',
      'html.something &': {
        color: 'white',
      },
    }
    const Comp = styled.div`
      ${rule1}
    `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches('.a {background-color: blue;}html.something .a {color: white;}')
  })

  it('should inject styles of multiple components', () => {
    const firstRule = 'background: blue;'
    const secondRule = 'background: red;'
    const FirstComp = styled.div`
        ${firstRule}
      `
    const SecondComp = styled.div`
        ${secondRule}
      `

    const vm1 = new Vue(FirstComp).$mount()
    const vm2 = new Vue(SecondComp).$mount()

    expectCSSMatches('.a {background: blue;} .b {background: red;}')
  })

  it('should inject styles of multiple components based on creation, not rendering order', () => {
    const firstRule = 'content: "first rule";'
    const secondRule = 'content: "second rule";'
    const FirstComp = styled.div`
        ${firstRule}
      `
    const SecondComp = styled.div`
        ${secondRule}
      `

    // Switch rendering order, shouldn't change injection order
    const vm2 = new Vue(SecondComp).$mount()
    const vm1 = new Vue(FirstComp).$mount()

    // Classes _do_ get generated in the order of rendering but that's ok
    expectCSSMatches(`
        .b {content: "first rule";}
        .a {content: "second rule";}
      `)
  })

  it('should strip a JS-style (invalid) comment in the styles', () => {
    const comment = '// This is an invalid comment'
    const rule = 'color: blue;'
    const Comp = styled.div`
        ${comment}
        ${rule}
      `
    const vm = new Vue(Comp).$mount()
    expectCSSMatches(`
        .a {color: blue;}
      `)
  })
})
