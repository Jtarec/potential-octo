import { myUniq } from './index'

describe('myUniq', () => {
  it('should uniq array', () => {
    const arr = myUniq([1, '1', NaN, undefined, {}, { a: 1 }, true, null, 1, '1', NaN, undefined, {}, { a: 1 }, true, null])
    expect(arr).toEqual([1, '1', NaN, undefined, {}, { a: 1 }, true, null ])
  });
})
