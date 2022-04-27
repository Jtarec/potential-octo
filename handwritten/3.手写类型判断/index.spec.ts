import { myTypeof } from './index'

describe('myTypeof', () => {
  it('typeof should return right', () => {
    expect(myTypeof(1)).toEqual('number')
    expect(myTypeof('11')).toEqual('string')
    expect(myTypeof(true)).toEqual('boolean')
    expect(myTypeof([])).toEqual('array')
    expect(myTypeof({})).toEqual('object')
    expect(myTypeof(/[0-9]/)).toEqual('regexp')
    expect(myTypeof(new Date())).toEqual('date')
    expect(myTypeof(Math)).toEqual('math')
    expect(myTypeof(() => {})).toEqual('function')
  });
})
