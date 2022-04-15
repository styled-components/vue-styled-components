import expect from 'expect'

import css from '../css'

describe('css', () => {
	it('interpolates css templates', () => {
		const testData = {
			rules: ['\n\t\t\tcolor: blue;\n\t\t'],
			interpolations: [],
			result: ['\n\t\t\tcolor: blue;\n\t\t']
		}

		const actual = css(testData.rules, ...testData.interpolations)

		expect(actual).toEqual(testData.result)
	})

	it('interpolates css templates with comments', () => {
		const testData = {
			rules: ['\n\t\t\t', '\n\t\t\t', '\n\t\t'],
			interpolations: ['// This is an invalid comment', 'color: blue;'],
			result: [
				'\n\t\t\t',
				'// This is an invalid comment',
				'\n\t\t\t',
				'color: blue;',
				'\n\t\t'
			]
		}

		const actual = css(testData.rules, ...testData.interpolations)

		expect(actual).toEqual(testData.result)
	})
})
