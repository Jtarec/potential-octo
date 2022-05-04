import { deepClone } from './index'

describe('deepClone', () => {
  it('should deep clone the object', () => {
    const symbol = Symbol()
    const obj = {
      a: 1,
      b: 'bbb',
      c: Symbol(),
      d: undefined,
      e: NaN,
      f: { g: 123 },
      h: [2, 3, '4', '5', { i: 666 }, [7, 8, 9]],
      k: function l() {},
      symbol
    }
    const cloneObj = deepClone(obj)
    expect(obj).toEqual(cloneObj)
    // 修改原对象/克隆后的对象都不会对另一个造成影响
    obj.b = '777'
    expect(obj).not.toEqual(cloneObj)
  })
})
