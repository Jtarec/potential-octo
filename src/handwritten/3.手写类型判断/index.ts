export function myTypeof(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}
