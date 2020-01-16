import Vue from 'vue'
import expect from 'expect'

import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('extending components', () => {
  /**
   * Make sure the setup is the same for every test
   */
  beforeEach(() => {
    styled = resetStyled()
  })

/*
  it('should generate a single class with no styles', () => {
    const Parent = styled.div``
    const Child = styled(Parent)``

    const p = new Vue(Parent).$mount()
    const c = new Vue(Child).$mount()

    expectCSSMatches('.a {}')
  })
*/

  it('should generate a single class if only parent has styles', () => {
    const Parent = styled.div`color: blue;`
    const Child = styled(Parent)``

    const p = new Vue(Parent).$mount()
    const c = new Vue(Child).$mount()

    expectCSSMatches('.a {color: blue;}')
  })

  it('should generate a single class if only child has styles', () => {
    const Parent = styled.div`color: blue;`
    const Child = styled(Parent)``

    const p = new Vue(Parent).$mount()
    const c = new Vue(Child).$mount()

    expectCSSMatches('.a {color: blue;}')
  })

  it('should generate a new class for the child with the added rules', () => {
    const Parent = styled.div`background-color: blue;`
    const Child = styled(Parent)`color: red;`

    const p = new Vue(Parent).$mount()
    const c = new Vue(Child).$mount()

    expectCSSMatches('.a {background-color: blue;} .b {color: red;}')
  })

  it('should generate different classes for both parent and child', () => {
    const Parent = styled.div`color: blue;`
    const Child = styled(Parent)`color: red;`

    const p = new Vue(Parent).$mount()
    const c = new Vue(Child).$mount()

    expectCSSMatches('.a {color: blue;} .b {color: red;}')
  })

  it('should keep nested rules to the child', () => {
    const Parent = styled.div`
      color: blue;
      > h1 { font-size: 4rem; }
    `
    const Child = styled(Parent)`color: red;`

    const p = new Vue(Parent).$mount()
    const c = new Vue(Child).$mount()

    expectCSSMatches('.a {color: blue;}.a > h1 {font-size: 4rem;} .b {color: red;}')
  })

  it('should keep default props from parent', () => {
    const parentProps = {
      color: {
        type: String,
        default: 'red'
      }
    }

    const Parent = styled('div', parentProps)`
      color: ${(props) => props.color};
    `

    const Child = styled(Parent)`background-color: green;`

    const p = new Vue(Parent).$mount()
    const c = new Vue(Child).$mount()

    expectCSSMatches(`
      .a {color: red;}
      .b {background-color: green;}
    `)
  })

  it('should keep prop types from parent', () => {
    const parentProps = {
      color: {
        type: String
      }
    }

    const Parent = styled.div`
      color: ${(props) => props.color};
    `

    const Child = styled(Parent)`background-color: green;`

    const c = new Vue(Child).$mount()
    const p = new Vue(Parent).$mount()

    expect(c.$props).toEqual(p.$props)
  })

  // it('should keep custom static member from parent', () => {
  //   const Parent = styled.div`color: red;`

  //   Parent.fetchData = () => 1

  //   const Child = styled(Parent)`color: green;`

  //   expect(Child.fetchData).toExist()
  //   expect(Child.fetchData()).toEqual(1)
  // })

  // it('should keep static member in triple inheritance', () => {
  //   const GrandParent = styled.div`color: red;`
  //   GrandParent.fetchData = () => 1

  //   const Parent = styled(GrandParent)`color: red;`
  //   const Child = styled(Parent)`color:red;`

  //   expect(Child.fetchData).toExist()
  //   expect(Child.fetchData()).toEqual(1)
  // })
})
