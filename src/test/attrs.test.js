import { createApp, h } from 'vue'
import expect from 'expect'

import { resetStyled, expectCSSMatches } from './utils'

let styled

describe('"attrs" feature', () => {
	beforeEach(() => {
		styled = resetStyled()
	})

	it('should add html attributes to an element', () => {
		const testVal = 'image.jpg'

		const Component = styled('img', {}).attrs({ src: testVal })`
			width: 50;
		`
		const vm = createApp(Component).mount('body')

		expect(vm.$el.src).toEqual(testVal)
	})

	it('should add several html attributes to an element', () => {
		const testAttrs = {
			src: 'image.jpg',
			alt: 'Test image'
		}

		const Component = styled('img', {}).attrs(testAttrs)`
			width: 50;
		`
		const vm = createApp(Component).mount('body')

		expect(vm.$el).toStrictEqual(expect.objectContaining(testAttrs))
		expectCSSMatches('.a {width: 50;}')
	})

	it('should work as expected with empty attributes object provided', () => {
		const Component = styled('img', {}).attrs({})`
			width: 50;
		`
		const vm = createApp(Component).mount('body')

		expectCSSMatches('.a {width: 50;}')
	})

	it('should work as expected with null attributes object provided', () => {
		const Component = styled('img', {}).attrs(null)`
			width: 50;
		`
		const vm = createApp(Component).mount('body')

		expectCSSMatches('.a {width: 50;}')
	})

	it('should work as expected without attributes provided', () => {
		const Component = styled('img')`
			width: 50;
		`
		const vm = createApp(Component).mount('body')

		expectCSSMatches('.a {width: 50;}')
	})

	it('should work with a function as a parameter of of the method', () => {
		const Component = styled('img', {}).attrs(() => ({
			src: 'image.jpg',
			alt: 'Test image',
			height: '50'
		}))`
			width: 50;
		`
		const vm = createApp(Component).mount('body')

		expect(vm.$el).toEqual(
			expect.objectContaining({
				src: 'image.jpg',
				alt: 'Test image',
				height: 50
			})
		)
		expectCSSMatches('.a {width: 50;}')
	})

	it('should work with multiple attrs method call', () => {
		const Component = styled('img', {})
			.attrs(() => ({ src: 'image.jpg', alt: 'Test image' }))
			.attrs({ height: '50' })`
	    width: 50;
	  `
		const vm = createApp(Component).mount('body')

		expect(vm.$el).toEqual(
			expect.objectContaining({
				src: 'image.jpg',
				alt: 'Test image',
				height: 50
			})
		)
		expectCSSMatches('.a {width: 50;}')
	})

	it('should access to all previous attribute properties', () => {
		const Component = styled('img', {})
			.attrs(() => ({
				src: 'image',
				alt: 'My test image'
			}))
			.attrs(props => {
				return {
					src: props.src + '.jpg',
					height: 5 * 10
				}
			})`
	    width: 50;
	  `
		const vm = createApp(Component).mount('body')

		expect(vm.$el).toEqual(
			expect.objectContaining({
				src: 'image.jpg',
				alt: 'My test image',
				height: 50
			})
		)
	})

	it('should override attribute properties', () => {
		const Component = styled('img', {})
			.attrs(() => ({
				src: 'image.jpg',
				alt: 'Test image',
				height: '20'
			}))
			.attrs({
				height: '50'
			})`
	    width: 50;
	  `
		const vm = createApp(Component).mount('body')

		expect(vm.$el).toEqual(
			expect.objectContaining({
				src: 'image.jpg',
				alt: 'Test image',
				height: 50
			})
		)
	})

	it('should have access to component props', () => {
		const Component = styled('img', { propsHeight: Number }).attrs(props => {
			return {
				src: 'image.jpg',
				alt: 'Test image',
				height: props.propsHeight * 2
			}
		})`
			width: 50;
		`

		const vm = createApp({
			render() {
				return h(Component, {
					propsHeight: 20
				})
			}
		}).mount('body')

		expect(vm.$el).toEqual(
			expect.objectContaining({
				src: 'image.jpg',
				alt: 'Test image',
				height: 40
			})
		)
	})

	it('attributes should be reactive', () => {
		const Component = styled('img', { propsHeight: Number }).attrs(props => ({
			src: 'image.jpg',
			alt: 'Test image',
			height: props.propsHeight * 2
		}))`
			width: 50;
		`

		const vm = createApp({
			data: () => ({
				propsHeight: 10
			}),
			mounted() {
				this.propsHeight = 40
			},
			render() {
				return h(Component, { propsHeight: this.propsHeight })
			}
		}).mount('body')

		expect(vm.$el.height).toEqual(20)

		// $nextTick
		setTimeout(() => {
			expect(vm.$el.height).toEqual(80)
		}, 0)
	})
})
