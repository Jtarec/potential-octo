import { myUniq, myUniqBySet } from './index'

describe('myUniq', () => {
  it('uniq by set', () => {
    const obja = {}, objb = { b: 1 }
    const s = Symbol(), t = Symbol()
    const fn = function() {}, fn1 = function() {}
    const arr = [null, null, NaN, NaN, 666, 666, '123', '123', true, true, obja, obja, objb, objb, undefined, undefined, s, s, t, fn, fn, fn1, (function () {}), (function () {}), (function () {console.log(1)})]
    const res = myUniqBySet(arr) // [null, NaN, 666, '123', true, {…}, {…}, undefined, Symbol(), Symbol(), ƒ, ƒ, ƒ, ƒ, ƒ]
    expect(JSON.stringify(res)).toEqual('[null,null,666,"123",true,{},{"b":1},null,null,null,null,null,null,null,null]')
  });
  // 默认不要求掌握，如果需要的话 可以删除 .skip
  it.skip('uniq special', () => {
    const s = Symbol(), t = Symbol()
    const fn = function() {}, fn1 = function() {}
    const arr = [null, null, NaN, NaN, 666, 666, '123', '123', true, true, {}, {}, { a: 1 }, { a: 1 }, undefined, undefined, s, s, t, fn, fn, fn1, (function () {}), (function () {}), (function () {console.log(1)})]
    const res = myUniq(arr) // [null, NaN, 666, '123', true, {…}, {…}, undefined, Symbol(), Symbol(), ƒ, ƒ, ƒ, ƒ, ƒ]
    expect(JSON.stringify(res)).toEqual('[null,null,666,"123",true,{},{"a":1},null,null,null,null,null,null,null,null]')
  });
})
