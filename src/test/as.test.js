import Vue from 'vue'
import expect from 'expect'
import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('"as" polymorphic prop', () => {
  beforeEach(() => {
    styled = resetStyled()
  })

  it('should render "as" polymorphic prop element', () => {
    const Base = styled.div`
      color: blue;
    `
    const b = new Vue({
      render: (h) => h(Base, {
        props: {
          as: 'button'
        }
      })
    }).$mount()
    expect(b.$el.tagName.toLowerCase()).toEqual('button')
  })


  it('should append base class to new components composing lower level styled components', () => {
    const Base = styled.div`
      color: blue;
    `
    const Composed = styled(Base, {
      bg: String,
    })`
      background: ${props => props.bg};
    `

    const b = new Vue(Base).$mount()
    const c = new Vue({
      render: (h) => h(Composed, {
        props: {
          bg: 'yellow',
          as: 'dialog'
        }
      })
    }).$mount()

    expect(c.$el.tagName.toLowerCase()).toEqual('dialog')
    expect(c.$el._prevClass.includes(b.$el._prevClass)).toBeTruthy()
    expectCSSMatches('.a{color: blue;} .b{background:yellow;}')
  })
})
