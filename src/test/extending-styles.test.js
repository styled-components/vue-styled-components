import { createApp, h } from 'vue'

import { resetStyled, expectCSSMatches } from './utils'

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

		const b = createApp(Base).mount('body')
		const e = createApp(Extended).mount('body')

		expectCSSMatches('.a {color: blue;} .b {color: blue;background: green;}')
	})
})
