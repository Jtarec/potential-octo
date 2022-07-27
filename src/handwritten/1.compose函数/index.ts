export function compose(...fns) {
  // 没有传任何参数函数，直接返回一个 给什么返回什么的 函数
  if (!fns.length) return v => v
  // 如果 参数函数的数量只有一个 那就返回这个函数
  if (fns.length === 1) return fns[0]
  // 利用 reduce 实现层层套用
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}