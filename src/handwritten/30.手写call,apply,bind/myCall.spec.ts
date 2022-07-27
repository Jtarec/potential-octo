// @ts-nocheck
import { myCall } from './index'

Function.prototype.myCall = myCall

window.year = 2021

function test(month, day) {
  console.log(month, day)
  return this.year + '-' + month + '-' + day
}

describe('myCall', () => {
  it('call should return right', () => {
    expect(test.myCall(null, 3, 8)).toEqual("2021-3-8")
  })
})
