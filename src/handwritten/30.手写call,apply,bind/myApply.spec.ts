// @ts-nocheck
import { myApply } from './index'

Function.prototype.myApply = myApply

window.year = 2021

function test(month, day) {
  console.log(month, day)
  return this.year + '-' + month + '-' + day
}

describe('myApply', () => {
  it('myApply should return right', () => {
    const obj = { year: 2022 }
    expect(test.myApply(obj, [3, 8])).toEqual("2022-3-8")
  })
})
