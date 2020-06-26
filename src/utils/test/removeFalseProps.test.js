import expect from 'expect'
import removeFalseProps from '../removeFalseProps'

describe('removeFalseProps', () => {
  it('removes entries with `undefined`, `null` or `false` values', () => {
    expect(removeFalseProps({})).toEqual({})
    expect(removeFalseProps({
      prop1: undefined,
      prop2: true,
      prop3: 'string',
      prop4: 0,
      prop5: 1,
      prop6: null,
      prop7: false,
    })).toEqual({
      prop2: true,
      prop3: 'string',
      prop4: 0,
      prop5: 1,
    })
  })
})
