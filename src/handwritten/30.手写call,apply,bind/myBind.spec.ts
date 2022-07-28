// @ts-nocheck
import { myBind } from './index'

Function.prototype.myBind = myBind

window.year = 2021

function test(month, day) {
  return this.year + '-' + month + '-' + day
}

describe('myBind', () => {
  it('myBind should return right', () => {
    const obj = { year: 2022 }
    expect(test.myBind(obj, 3, 8)()).toEqual("2022-3-8")
  })

  it('myBind should return right without params', () => {
    const obj = { year: 2022 }
    expect(test.myBind(obj)()).toEqual("2022-undefined-undefined")
  })
})
