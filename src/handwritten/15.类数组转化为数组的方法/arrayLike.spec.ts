import { arrayLikeWithApply, arrayLikeWithConcat, arrayLikeWithFrom, arrayLikeWithPrototype, arrayLikeWithSpread } from './index'

describe('arrayLikeWithSpread', () => {
  it('should return right', () => {
    const arrayLike = document.querySelectorAll('div')
    expect(arrayLikeWithSpread(arrayLike)).toEqual([])
  })
})

describe('arrayLikeWithFrom', () => {
  it('should return right', () => {
    const arrayLike = document.querySelectorAll('div')
    expect(arrayLikeWithFrom(arrayLike)).toEqual([])
  })
})

describe('arrayLikeWithPrototype', () => {
  it('should return right', () => {
    const arrayLike = document.querySelectorAll('div')
    expect(arrayLikeWithPrototype(arrayLike)).toEqual([])
  })
})

describe('arrayLikeWithApply', () => {
  it('should return right', () => {
    const arrayLike = document.querySelectorAll('div')
    expect(arrayLikeWithApply(arrayLike)).toEqual([])
  })
})

describe('arrayLikeWithConcat', () => {
  it('should return right', () => {
    const arrayLike = document.querySelectorAll('div')
    expect(arrayLikeWithConcat(arrayLike)).toEqual([])
  })
})
