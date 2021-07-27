import ServerSideRenderMixin from '../mixins/ssr'
import expect from 'expect'
import sinon from 'sinon'

describe('ServerSideRenderMixin', () => {
  it('has a function called head', () => {
    expect(ServerSideRenderMixin.head instanceof Function).toBe(true)
  })
  it('returns a sane value when window is undefined', () => {
    expect(ServerSideRenderMixin.head()).toStrictEqual({})
  })
  // it('returns a well formed style object for use by Nuxt when window is defined', () => {
  //   const windowRef = global.window;
  //   global.window = {document: {querySelector: () => null}};
  //   expect(ServerSideRenderMixin.head()).toStrictEqual(
  //     {
  //       style: [{ hide: 'ssrStyles', innerHTML: '', type: 'text/css' }],
  //       __dangerouslyDisableSanitizers: ['style']
  //     }
  //   )
  //   global.window = windowRef;
  // })
})