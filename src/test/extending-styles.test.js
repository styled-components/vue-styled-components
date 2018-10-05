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

        new Vue(Base).$mount()
        new Vue(Extended).$mount()

        expectCSSMatches('.a {color: blue;} .b {color: blue;background: green;}')
    })
})
