import { createApp, h } from 'vue'
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

		const b = createApp({
			render: () =>
				h(Base, {
					as: 'button'
				})
		}).mount('body')
		expect(b.$el.tagName.toLowerCase()).toEqual('button')
	})

	it('should append base class to new components composing lower level styled components', () => {
		const Base = styled.div`
			color: blue;
		`
		const Composed = styled(Base, {
			bg: String
		})`
			background: ${props => props.bg};
		`

		const b = createApp(Base).mount('body')
		const c = createApp({
			render: () =>
				h(Composed, {
					bg: 'yellow',
					as: 'dialog'
				})
		}).mount('body')

		expect(c.$el.tagName.toLowerCase()).toEqual('dialog')
		expect(c.$el.classList.contains(b.$el.classList.toString())).toBeTruthy()
		expectCSSMatches('.a{color: blue;} .b{background:yellow;}')
	})
})
