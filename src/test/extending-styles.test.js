import Vue from 'vue'
import {assert} from 'chai'

import {expectCSSMatches, resetStyled} from './utils'

let styled

describe('extending styled', () => {
    beforeEach(() => {
        styled = resetStyled()
    })

    it('should append extended styled to the original class', () => {
        const Base = styled.div`
      color: blue;
    `
        const Extended = Base.extend`
      background: green;
    `

        const b = new Vue(Base).$mount()
        const e = new Vue(Extended).$mount()

        assert(b._vnode.data.class[0] === 'a')
        assert(e._vnode.data.class[0] === 'b')

        expectCSSMatches('.a {color: blue;} .b {color: blue;background: green;}')
    })
})
