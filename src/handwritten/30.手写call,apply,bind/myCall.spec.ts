// @ts-nocheck
import { myCall } from './index'

Function.prototype.myCall = myCall

window.year = 2021

function test(month, day) {
  return this.year + '-' + month + '-' + day
}

describe('myCall', () => {
  it('myCall should return right', () => {
    expect(test.myCall(null, 3, 8)).toEqual("2021-3-8")
  })

  it('myCall should return right without params', () => {
    const obj = { year: 2022 }
    expect(test.myCall(obj)).toEqual("2022-undefined-undefined")
  })
})
