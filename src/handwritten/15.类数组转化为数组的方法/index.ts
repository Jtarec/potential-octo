export function arrayLikeWithSpread(arrayLike) {
  return [...arrayLike]
}

export function arrayLikeWithFrom(arrayLike) {
  return Array.from(arrayLike)
}

export function arrayLikeWithPrototype(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

export function arrayLikeWithApply(arrayLike) {
  return Array.apply(null, arrayLike)
}

export function arrayLikeWithConcat(arrayLike) {
  return Array.prototype.concat.apply([], arrayLike)
}
