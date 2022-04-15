import { createApp, h } from 'vue'
import { assert } from 'chai'

import { resetStyled } from './utils'

let styled

describe('extending styled', () => {
	beforeEach(() => {
		styled = resetStyled()
	})

	it('should change the target element', () => {
		const OldTarget = styled.div`
			color: blue;
		`
		const NewTarget = OldTarget.withComponent('a')

		const o = createApp(OldTarget).mount('body')
		const n = createApp(NewTarget).mount('body')

		assert(o.$el instanceof HTMLDivElement)
		assert(n.$el instanceof HTMLAnchorElement)
	})
})
