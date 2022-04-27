import { compose } from "./index"

describe("compose", () => {
  it("should compose function params", () => {
    // 传入多个函数作为参数时，应合并函数返回内容，以下相当于 compose(1, 2, 3, 4)(1) = 1 + 1 + 2 + 3 + 4 = 11
    function fn1(x) {
      return x + 1
    }
    function fn2(x) {
      return x + 2
    }
    function fn3(x) {
      return x + 3
    }
    function fn4(x) {
      return x + 4
    }
    const a = compose(fn1, fn2, fn3, fn4)(1)
    expect(a).toEqual(11)
    // 传入一个函数时，应返回该函数 这里应该等于 1 + 1 =2
    const b = compose(fn1)(1)
    expect(b).toEqual(2)
    // 不传任何函数作为参数时，应直接返回值
    const c = compose()(3)
    expect(c).toEqual(3)
  })

  it("more pure function compose", () => {
    const add1 = (x) => x + 1
    const mul3 = (x) => x * 3
    const div2 = (x) => x / 2
    const res = compose(add1, mul3, div2)(4) // add1(mul3(div2(4)))
    expect(res).toEqual(7)
  })
})
