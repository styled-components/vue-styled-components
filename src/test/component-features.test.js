import Vue from 'vue/dist/vue';
import expect from 'expect'

import styleSheet from '../models/StyleSheet'
import { resetStyled } from './utils'

let styled

describe('component features', () => {
  /**
   * Make sure the setup is the same for every test
   */
  beforeEach(() => {
    styled = resetStyled()
  })

  it('default slot', () => {
    const Comp = {
      template: `<div><slot>FallbackContent</slot></div>`
    }
    const StyledComp = styled(Comp)`
      color: blue;
    `
    const vm = new Vue({
      components: { StyledComp },
      template: `<styled-comp>ActualContent</styled-comp>`
    }).$mount()
    expect(vm.$el.innerHTML).toEqual('ActualContent')
  })
  it('named slot', () => {
    const Comp = {
      template: `<div><slot name='content'>FallbackContent</slot></div>`
    }
    const StyledComp = styled(Comp)`
      color: blue;
    `
    const vm = new Vue({
      components: { StyledComp },
      template: `
        <styled-comp>
          <template slot='content'>ActualContent</template>
        </styled-comp>`
    }).$mount()
    expect(vm.$el.innerHTML).toEqual('ActualContent')
  })
  it('scoped slot', () => {
    const Comp = {
      template: `<div><slot :p='"ActualContent"'>FallbackContent</slot></div>`
    }
    const StyledComp = styled(Comp)`
      color: blue;
    `
    const vm = new Vue({
      components: { StyledComp },
      template: `
        <styled-comp>
          <template slot-scope='{ p }'>{{ p }}</template>
        </styled-comp>`
    }).$mount()
    expect(vm.$el.innerHTML).toEqual('ActualContent')
  })
  it('named scoped slot', () => {
    const Comp = {
      template: `<div><slot name='content' :p='"ActualContent"'>FallbackContent</slot></div>`
    }
    const StyledComp = styled(Comp)`
      color: blue;
    `
    const vm = new Vue({
      components: { StyledComp },
      template: `
        <styled-comp>
          <template slot='content' slot-scope='{ p }'>{{ p }}</template>
        </styled-comp>`
    }).$mount()
    expect(vm.$el.innerHTML).toEqual('ActualContent')
  })

})
