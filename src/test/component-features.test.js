import { createApp } from 'vue'
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
		const vm = createApp({
			components: { StyledComp },
			template: `<styled-comp>ActualContent</styled-comp>`
		}).mount('body')
		expect(vm.$el.innerHTML).toEqual('ActualContent')
	})
	it('named slot', () => {
		const Comp = {
			template: `<div><slot name='content'>FallbackContent</slot></div>`
		}
		const StyledComp = styled(Comp)`
			color: blue;
		`
		const vm = createApp({
			components: { StyledComp },
			template: `
        <styled-comp>
          <template v-slot:content>ActualContent</template>
        </styled-comp>`
		}).mount('body')
		expect(vm.$el.innerHTML).toEqual('ActualContent')
	})
	it('scoped slot', () => {
		const Comp = {
			template: `<div><slot name="default" :p='"ActualContent"'>FallbackContent</slot></div>`
		}
		const StyledComp = styled(Comp)`
			color: blue;
		`
		const vm = createApp({
			components: { StyledComp },
			template: `
        <styled-comp>
          <template #default='{ p }'>{{ p }}</template>
        </styled-comp>`
		}).mount('body')
		expect(vm.$el.innerHTML).toEqual('ActualContent')
	})
	it('named scoped slot', () => {
		const Comp = {
			template: `<div><slot name='content' :p='"ActualContent"'>FallbackContent</slot></div>`
		}
		const StyledComp = styled(Comp)`
			color: blue;
		`
		const vm = createApp({
			components: { StyledComp },
			template: `
        <styled-comp>
          <template #content='{ p }'>{{ p }}</template>
        </styled-comp>`
		}).mount('body')
		expect(vm.$el.innerHTML).toEqual('ActualContent')
	})
})
