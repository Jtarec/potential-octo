import { currying } from './index'

describe('currying', () => {
  it('separate the func', () => {
    const add = (a, b, c) => a + b + c
    const a = currying(add)
    expect(a(1)(2)(3)).toEqual(6)
    const b = currying(add)
    expect(b(1, 2, 4, 8)).toEqual(7)
    const c = currying(add)
    expect(c(1, 2,)(2)).toEqual(5)
    const d = currying(add, 5)
    expect(d(5, 4)).toEqual(14)
  })
})
